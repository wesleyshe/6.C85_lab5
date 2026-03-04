

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.ffaad376.js","_app/immutable/chunks/scheduler.1c1a1096.js","_app/immutable/chunks/index.8296ea29.js","_app/immutable/chunks/stores.c8fff508.js","_app/immutable/chunks/singletons.9ac4506d.js","_app/immutable/chunks/paths.b9fa19d0.js"];
export const stylesheets = [];
export const fonts = [];
