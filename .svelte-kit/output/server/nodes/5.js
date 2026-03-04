

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/resume/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.efc0d087.js","_app/immutable/chunks/scheduler.1c1a1096.js","_app/immutable/chunks/index.8296ea29.js"];
export const stylesheets = [];
export const fonts = [];
