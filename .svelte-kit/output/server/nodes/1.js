

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.126323e9.js","_app/immutable/chunks/scheduler.1c1a1096.js","_app/immutable/chunks/index.8296ea29.js","_app/immutable/chunks/stores.af1a3e8b.js","_app/immutable/chunks/singletons.2b2a7af6.js","_app/immutable/chunks/paths.5afa8260.js"];
export const stylesheets = [];
export const fonts = [];
