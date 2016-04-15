interface IImageLoaderConfig {
    images: components.IImageObject[];
    text: string;
    success?: (images: HTMLImageElement[]) => void;
    timeout?: number;
}

interface ICallback {
    (...data: any[]): void;
}

interface IHandlers {
    [name: string]: ICallback[]
}

function loadImages(config: IImageLoaderConfig) {
    var images = config.images.map(imgData => imgData.thumbnail) || [];
    var success = config.success;
    var text = translator.getTranslation(config.text);
    var timeout = config.timeout || 100;

    var $progressBar = $('.load-overlay .progress .progress-bar');

    $('.load-overlay').show();
    $('.progres s-txt').html(text);
    $progressBar.css('width', 0).html('0%');

    var loader = new ImageLoader(images, success);

    loader.on('success', imageArray => {
        setTimeout(() => {
            $('.load-overlay').fadeOut(100);
            success && success(imageArray);
        }, timeout);
    });

    loader.on('progress', progress => {
        var percentage = (progress * 100).toFixed(0) + '%';
        $progressBar.css('width', percentage).html(percentage);
    });
}

class EventEmitter {
    private __handlers: IHandlers = {}

    on(eventName: string, fn: ICallback) {
        this.__handlers[eventName] ?
            this.__handlers[eventName].push(fn) :
            this.__handlers[eventName] = [fn];
    }

    emit(eventName: string, ...data: any[]) {
        if (this.__handlers[eventName])
            this.__handlers[eventName].forEach(e => e(...data));
    }
}

class ImageLoader extends EventEmitter {
    private images: HTMLImageElement[];
    private counter: number;

    constructor(
        private sources: string[],
        private callback: (images?: HTMLImageElement[]) => void
    ) {
        super();
        this.counter = sources.length;
        this.images = [];
        this.createHTMLImages();
        this.handleEmptyArray();
    }

    public getProgress() {
        if(this.sources.length == 0)
            return 1;
            
        return 1 - this.counter / this.images.length;
    }

    private createHTMLImages() {
        for (var src of this.sources)
            this.createHTMLImage(src);
    }

    private createHTMLImage(src: string) {
        var image = new Image();
        this.images.push(image);

        image.onload = () => this.onload();
        image.onerror = e => this.onerror(e);
        image.onabort = e => this.onerror(e);
        image.src = src;

        this.handleLoadedImage(image);
    }

    private handleLoadedImage(img: HTMLImageElement) {
        if (!img.complete && !img.naturalWidth)
            return;

        // Removed hazard and made all functions async.
        setTimeout(() => {
            this.onload();
            img.onload = function () { };;
            img.onerror = function () { };;
        }, 0);
    }

    private handleEmptyArray() {
        if(this.sources.length == 0) {
            setTimeout(() => this.emit('success', []), 0);
        }
    }
    
    private onerror(e: Event) {
        console.error(e);
        this.emit('error', e);
        this.onload();
    }

    private onload() {
        if (--this.counter == 0) {
            this.emit('success', this.images);
            this.callback && this.callback(this.images);
        }
        this.emit('progress', this.getProgress());
    }
}
