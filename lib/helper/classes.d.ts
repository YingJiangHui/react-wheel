declare function classes(...names: (string | undefined | {
    [key: string]: boolean;
})[]): string;
export default classes;
