/**
 * @param str The string you want to be converted to kebab case
 * @returns A kebab case string, ignoring all special symbols
 */
export function kebabize(str: string): string {
    return str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\s_]+/g, '-')
        .replace(/[^a-zA-Z0-9/-]*/g, '')
        .toLowerCase();
}
