

export const index = 4;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/projects/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/4.d0c11052.js","_app/immutable/chunks/scheduler.1c1a1096.js","_app/immutable/chunks/index.8296ea29.js","_app/immutable/chunks/each.e59479a4.js","_app/immutable/chunks/Project.2a0bf6f4.js","_app/immutable/chunks/paths.7e2d43e8.js"];
export const stylesheets = ["_app/immutable/assets/4.84db592b.css","_app/immutable/assets/Project.8757cbd1.css"];
export const fonts = [];
