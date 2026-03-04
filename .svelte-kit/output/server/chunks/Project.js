import { c as create_ssr_component, f as escape, d as add_attribute } from "./ssr.js";
import { b as base } from "./paths.js";
const projects = [
  {
    title: "Dorm Survival Dashboard",
    year: 2018,
    image: "/image/1.jpg",
    description: "A first attempt at tracking sleep, deadlines, and meal timing during my first year.",
    story: "I built this when I realized my calendar and my actual life were not the same thing. Seeing weekly patterns made it obvious why some weeks felt impossible. It was my first project where data directly changed how I planned my days."
  },
  {
    title: "Campus Event Explorer",
    year: 2019,
    image: "/image/2.jpg",
    description: "An interactive map of talks, workshops, and student events around campus.",
    story: "I wanted to stop hearing about great events after they were over. This project taught me how to clean messy location and time fields and make them searchable. The result was simple, but classmates actually used it."
  },
  {
    title: "Transit Delay Notebook",
    year: 2020,
    image: "/image/3.jpg",
    description: "A small analysis of recurring delay patterns on my most common commute routes.",
    story: "After too many missed connections, I started logging when and where trips failed. The patterns were frustratingly consistent in bad weather and late evenings. This project pushed me to connect personal annoyance with quantitative evidence."
  },
  {
    title: "Neighborhood Rent Watch",
    year: 2021,
    image: "/image/4.jpg",
    description: "A visual timeline of rent increases across neighborhoods I considered living in.",
    story: "Housing searches felt random until I graphed asking prices over time. The chart made tradeoffs clear and helped me compare neighborhoods beyond one-off listings. It also made affordability feel like a structural issue, not a personal failure."
  },
  {
    title: "A1: Data, Visualization, and Housing",
    year: 2022,
    image: "/image/5.jpg",
    description: "Course project exploring relationships between housing indicators and community outcomes.",
    story: "This assignment was where I started writing with data instead of just plotting it. I learned that selecting a visual form is an argument, not decoration. The feedback on this work changed how I think about audience and clarity."
  },
  {
    title: "A2: Exploratory Visual Analysis",
    year: 2023,
    image: "/image/6.jpg",
    description: "A broad exploratory workflow to identify promising hypotheses before narrowing scope.",
    story: "I generated many more views than I could ever show in a final piece. Most were dead ends, but a few revealed patterns I would have missed otherwise. This project taught me to treat exploration as real work, not just a warm-up."
  },
  {
    title: "A3: Visualization Critique and Redesign",
    year: 2024,
    image: "/image/7.jpg",
    description: "A management simulation where I had to act as the boss and run a chaotic team.",
    story: "This was the semester I discovered that being in charge is mostly solving tiny disasters all day. I handled deadlines, delegated tasks, and kept morale from collapsing before demos. By the end, I stopped trying to control everything and focused on making clear decisions fast."
  },
  {
    title: "A4: Persuasive and Deceptive Visualization",
    year: 2025,
    image: "/image/8.jpg",
    description: "A game-focused project analyzing strategy, reaction time, and player decision patterns.",
    story: "I used my favorite video games as the dataset and tracked where players hesitated, rushed, and improvised. Watching repeated runs made strategy look less like luck and more like pattern recognition under pressure. It ended up being one of the most fun projects because every chart felt like replay analysis."
  },
  {
    title: "Final Project Prototype",
    year: 2026,
    image: "/image/9.jpg",
    description: "A fictional scenario project about planning a coordinated shopping mall invasion with an army.",
    story: "The narrative framed the mall as contested territory and mapped how different squads moved through entrances, escalators, and food court chokepoints. I built timelines for each phase so the reader could follow the operation from first breach to full control. It was absurd on purpose, but it let me practice large-scale sequencing and spatial storytelling."
  }
];
const Project_svelte_svelte_type_style_lang = "";
const css = {
  code: "article.svelte-q4wzog.svelte-q4wzog{display:grid;grid-template-rows:subgrid;grid-row:span 4}article.svelte-q4wzog img.svelte-q4wzog{grid-row:1;width:100%;height:220px;object-fit:cover;display:block}article.svelte-q4wzog h3.svelte-q4wzog{grid-row:2;margin:0}article.svelte-q4wzog .year.svelte-q4wzog{grid-row:3;margin:0;font-weight:600;opacity:0.85}article.svelte-q4wzog p.svelte-q4wzog:last-child{grid-row:4}",
  map: null
};
const Project = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data = {} } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  $$result.css.add(css);
  return `<article class="svelte-q4wzog"><img src="${escape(base, true) + escape(data.image, true)}"${add_attribute("alt", data.title, 0)} class="svelte-q4wzog"> <h3 class="svelte-q4wzog">${escape(data.title)}</h3> ${data.year ? `<p class="year svelte-q4wzog">${escape(data.year)}</p>` : ``} <p class="svelte-q4wzog">${escape(data.description)}</p> </article>`;
});
export {
  Project as P,
  projects as p
};
