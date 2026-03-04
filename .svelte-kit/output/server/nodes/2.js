

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.1fc9ba3a.js","_app/immutable/chunks/scheduler.1c1a1096.js","_app/immutable/chunks/index.8296ea29.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/paths.7e2d43e8.js","_app/immutable/chunks/Project.2a0bf6f4.js"];
export const stylesheets = ["_app/immutable/assets/2.0f51b5f7.css","_app/immutable/assets/Project.8757cbd1.css"];
export const fonts = [];
