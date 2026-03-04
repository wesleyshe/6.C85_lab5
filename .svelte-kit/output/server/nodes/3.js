

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/contact/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.8406a98f.js","_app/immutable/chunks/scheduler.1c1a1096.js","_app/immutable/chunks/index.8296ea29.js"];
export const stylesheets = [];
export const fonts = [];
