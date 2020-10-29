export const addQueryArgs = (path, args) => `${ path }?${ new URLSearchParams(args) }`;
