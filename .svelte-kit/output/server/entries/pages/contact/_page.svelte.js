import { c as create_ssr_component } from "../../../chunks/ssr.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1 data-svelte-h="svelte-tbczl2">Contact</h1> <form action="mailto:wesleys@mit.edu" method="GET" data-svelte-h="svelte-gtslbr"><label>Your email:
    <input name="email" type="email"></label> <label>Subject:
    <input name="subject"></label> <label>Message:
    <textarea name="body"></textarea></label> <button>Send</button></form>`;
});
export {
  Page as default
};
