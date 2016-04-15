interface IDictionary {
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

export default {
    extend
};