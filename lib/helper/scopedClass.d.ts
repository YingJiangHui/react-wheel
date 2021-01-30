interface ClassToggles {
    [key: string]: boolean;
}
interface Options {
    prefixIsClass?: boolean;
    extra?: string[];
}
declare const scopedClass: (prefix: string) => (cn?: string | ClassToggles | undefined, options?: Options | undefined) => string;
export { scopedClass };
