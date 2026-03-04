import { c as create_ssr_component, d as add_attribute, f as escape, e as each, v as validate_component } from "../../chunks/ssr.js";
import { b as base } from "../../chunks/paths.js";
import { P as Project, p as projects } from "../../chunks/Project.js";
const reading = [
  {
    title: "Cybernetic Revolutionaries: Technology and Politics in Allende's Chile",
    author: "Eden Medina",
    year: 2011,
    image: "https://m.media-amazon.com/images/I/71JsI5jz5OL._SL1500_.jpg",
    description: "How Allende's Chile built a real-time cybernetic system to manage a socialist economy.",
    link: "https://www.amazon.com/Cybernetic-Revolutionaries-Technology-Politics-Allendes/dp/0262525968"
  },
  {
    title: "A Thousand Plateaus: Capitalism and Schizophrenia",
    author: "Gilles Deleuze & Félix Guattari",
    year: 1980,
    image: "https://m.media-amazon.com/images/I/51X8H91WWlL._SL1500_.jpg",
    description: "A post-structuralist exploration of desire, power, and multiplicity through the concept of the rhizome.",
    link: "https://www.amazon.com/Thousand-Plateaus-Capitalism-Schizophrenia/dp/0816614024"
  },
  {
    title: 'A Second Modernism: MIT, Architecture, and the "Techno-Social" Moment',
    author: "Arindam Dutta (ed.)",
    year: 2013,
    image: "https://m.media-amazon.com/images/I/71bPR3ohw1L._SL1500_.jpg",
    description: "Examines how MIT shaped postwar architecture through its fusion of technology, social science, and design.",
    link: "https://www.amazon.com/Second-Modernism-Architecture-Techno-Social-Moment/dp/026201985X"
  }
];
const ReadingItem_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: "article.svelte-1qp7ydw.svelte-1qp7ydw{display:flex;gap:1em;align-items:flex-start}article.svelte-1qp7ydw img.svelte-1qp7ydw{width:80px;height:110px;object-fit:cover;flex-shrink:0;border-radius:3px;box-shadow:2px 2px 6px oklch(0% 0 0 / 25%)}.details.svelte-1qp7ydw.svelte-1qp7ydw{display:flex;flex-direction:column;gap:0.25em}h3.svelte-1qp7ydw.svelte-1qp7ydw{margin:0;font-size:1rem;line-height:1.3}.author.svelte-1qp7ydw.svelte-1qp7ydw{margin:0;font-size:0.875rem;font-style:italic;opacity:0.7}.desc.svelte-1qp7ydw.svelte-1qp7ydw{margin:0;font-size:0.85rem;opacity:0.85}",
  map: null
};
const ReadingItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = {} } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css$1);
  return `<article class="svelte-1qp7ydw"><img${add_attribute("src", data.image, 0)} alt="${"Cover of " + escape(data.title, true)}" class="svelte-1qp7ydw"> <div class="details svelte-1qp7ydw"><h3 class="svelte-1qp7ydw">${data.link ? `<a${add_attribute("href", data.link, 0)} target="_blank">${escape(data.title)}</a>` : `${escape(data.title)}`}</h3> <p class="author svelte-1qp7ydw">${escape(data.author)}${data.year ? `
                · ${escape(data.year)}` : ``}</p> ${data.description ? `<p class="desc svelte-1qp7ydw">${escape(data.description)}</p>` : ``}</div> </article>`;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "img.svelte-h8o9ar.svelte-h8o9ar{display:block;width:100%;height:auto;margin:0 auto}.reading.svelte-h8o9ar.svelte-h8o9ar{display:flex;flex-direction:column;gap:1.25em}.github-stats.svelte-h8o9ar.svelte-h8o9ar{margin:2rem 0;padding:1.25rem;border:2px solid var(--color-accent);border-radius:0.5rem;background:color-mix(in oklch, var(--color-accent), canvas 93%)}.github-stats.svelte-h8o9ar h2.svelte-h8o9ar{margin:0 0 1rem}.github-stats.svelte-h8o9ar dl.svelte-h8o9ar{margin:0;display:grid;grid-template-columns:repeat(4, minmax(6rem, 1fr));gap:0.25rem 1rem}.github-stats.svelte-h8o9ar dt.svelte-h8o9ar{grid-row:1;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.03em;opacity:0.8}.github-stats.svelte-h8o9ar dd.svelte-h8o9ar{grid-row:2;margin:0;font-size:2rem;font-weight:700;line-height:1}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<h1 data-svelte-h="svelte-ws01i7">Ikea Shark</h1> <p data-svelte-h="svelte-17hqff">Born in the deep blue aisle and raised on flat pack dreams, this
  distinguished aquatic gentleman has dedicated his life to comfort, loyalty,
  and looking mildly concerned on your behalf. He possesses the quiet
  confidence of someone who knows he is both apex predator and premium pillow,
  a rare dual specialization that few dare attempt.</p> <p data-svelte-h="svelte-1lnys75">He thrives in domestic waters such as beds, sofas, and any location that
  recently experienced emotional turbulence. His hobbies include supervising
  naps, participating in dramatic staring contests with the wall, and arriving
  instantly the moment someone says, &quot;I just need a hug.&quot; He does not ask
  questions, he simply absorbs vibes and occasionally crumbs.</p> <p data-svelte-h="svelte-ok6mvj">Despite a fierce reputation, his daily schedule mostly involves heroic
  levels of loafing. He believes in work life balance, especially the life
  part, and has made it his mission to ensure no human within flopping
  distance ever feels unsupported. Scientists remain baffled by how he manages
  to be structured yet squishy, brave yet baby. If found adrift, please return
  to the nearest blanket. Payment can be made in head pats and being included
  in important conversations he will absolutely not repeat.</p> <img src="${escape(base, true) + "/image/ikea%20shark.jpg"}" alt="my face" class="svelte-h8o9ar"> ${`<p data-svelte-h="svelte-g6zmky">Loading GitHub stats...</p>`} <h2 data-svelte-h="svelte-oh8sfb">Latest Projects</h2> <div class="projects highlights">${each(projects.slice(0, 3), (p) => {
    return `${validate_component(Project, "Project").$$render($$result, { data: p }, {}, {})}`;
  })}</div> <h2 data-svelte-h="svelte-1gv99qj">What I&#39;m Reading</h2> <div class="reading svelte-h8o9ar">${each(reading, (item) => {
    return `${validate_component(ReadingItem, "ReadingItem").$$render($$result, { data: item }, {}, {})}`;
  })} </div>`;
});
export {
  Page as default
};
