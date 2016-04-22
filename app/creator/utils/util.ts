export interface IDictionary {
    [name: string]: any;
    [name: number]: any;
}

export function extend(dest: any, ...sources: IDictionary[]) {
    for (let src of sources) {
        for (let propName in src) {
            if (src.hasOwnProperty(propName)) {
                dest[propName] = src[propName];
            }
        }
    }
};

export interface IImageCallback {
    (img: HTMLImageElement): any;
}

export function createImage(src: string, callback: IImageCallback) {
    var img = new Image();
    img.onload = () => callback(img)
    img.onerror = () => {
        console.error('cannot load image: ', src);
        callback(img);
    }
    img.src = src;    
    return img;
}

export default {
    extend,
    createImage
};