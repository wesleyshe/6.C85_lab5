import { c as create_ssr_component, b as subscribe, e as each, d as add_attribute, f as escape } from "../../chunks/ssr.js";
import { b as base } from "../../chunks/paths.js";
import { p as page } from "../../chunks/stores.js";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".color-scheme-switch.svelte-kcekg2.svelte-kcekg2{position:absolute;top:1rem;right:1rem;display:inline-flex;align-items:center;gap:0.25rem;font-size:80%}.color-scheme-switch.svelte-kcekg2 select.svelte-kcekg2{font:inherit}nav.svelte-kcekg2.svelte-kcekg2{--border-color:oklch(50% 10% 200 / 40%);display:flex;margin-bottom:1.5em;border-bottom:2px solid var(--border-color)}nav.svelte-kcekg2 a.svelte-kcekg2{flex:1;text-decoration:none;color:inherit;text-align:center;padding:0.5em;border-bottom:0.4em solid transparent}nav.svelte-kcekg2 a.current.svelte-kcekg2{border-bottom-color:var(--border-color)}nav.svelte-kcekg2 a.svelte-kcekg2:hover{border-bottom-color:var(--color-accent);background:color-mix(in oklch, var(--color-accent), canvas 85%)}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let pages = [
    { url: "/", title: "Home" },
    { url: "/projects", title: "Projects" },
    { url: "/contact", title: "Contact" },
    { url: "/resume", title: "Resume" },
    {
      url: "https://github.com/wesleyshe",
      title: "GitHub"
    }
  ];
  let localStorage = globalThis.localStorage ?? {};
  let colorScheme = localStorage.colorScheme ?? "light dark";
  let root = globalThis.document?.documentElement;
  const isExternal = (url) => url.startsWith("http");
  const linkHref = (url) => isExternal(url) ? url : base + url;
  const isCurrent = (url) => !isExternal(url) && (url === "/" ? $page.url.pathname === `${base}/` || $page.url.pathname === base : $page.url.pathname.startsWith(base + url));
  $$result.css.add(css);
  {
    root?.style.setProperty("color-scheme", colorScheme);
  }
  localStorage.colorScheme = colorScheme;
  $$unsubscribe_page();
  return `<label class="color-scheme-switch svelte-kcekg2">Theme:
  <select class="svelte-kcekg2"><option value="light dark" data-svelte-h="svelte-9nlqsf">Automatic</option><option value="light" data-svelte-h="svelte-yop7ea">Light</option><option value="dark" data-svelte-h="svelte-6c4gk6">Dark</option></select></label> <nav class="svelte-kcekg2">${each(pages, (p) => {
    return `<a${add_attribute("href", linkHref(p.url), 0)}${add_attribute("target", isExternal(p.url) ? "_blank" : null, 0)}${add_attribute("rel", isExternal(p.url) ? "noopener noreferrer" : null, 0)} class="${["svelte-kcekg2", isCurrent(p.url) ? "current" : ""].join(" ").trim()}">${escape(p.title)} </a>`;
  })}</nav> ${slots.default ? slots.default({}) : ``}`;
});
export {
  Layout as default
};
