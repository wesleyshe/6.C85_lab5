import { c as create_ssr_component, f as escape, d as add_attribute, v as validate_component, e as each } from "../../../chunks/ssr.js";
import { p as projects, P as Project } from "../../../chunks/Project.js";
import { b as base } from "../../../chunks/paths.js";
const Scrolly_svelte_svelte_type_style_lang = "";
const css$2 = {
  code: ".scrolly.svelte-14jsymd{position:relative;display:grid;grid-template-columns:var(--scrolly-story-width, 1fr) var(--scrolly-viz-width, 1fr);grid-auto-flow:row dense;gap:var(--scrolly-gap, 4rem)}.viz.svelte-14jsymd,.story.svelte-14jsymd{grid-row:1}.viz.svelte-14jsymd{position:sticky;top:max(var(--scrolly-margin, 0) * 1px, var(--scrolly-viz-top, 2em));max-height:100vh}@container style(--scrolly-layout: viz-first){.scrolly.svelte-14jsymd{grid-template-columns:var(--scrolly-viz-width, 1fr) var(--scrolly-story-width, 1fr)}.viz.svelte-14jsymd{grid-column:1}.story.svelte-14jsymd{grid-column:2}}@container style(--scrolly-layout: overlap){.scrolly.svelte-14jsymd{grid-template-columns:1fr}.viz.svelte-14jsymd,.story.svelte-14jsymd{grid-column:1}}",
  map: null
};
const Scrolly = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { progress = 0 } = $$props;
  let { progressRaw = 0 } = $$props;
  let { threshold = 0.5 } = $$props;
  let { margin = 30 } = $$props;
  let { debounce = false } = $$props;
  let { throttle = false } = $$props;
  let container, vizContainer;
  if ($$props.progress === void 0 && $$bindings.progress && progress !== void 0)
    $$bindings.progress(progress);
  if ($$props.progressRaw === void 0 && $$bindings.progressRaw && progressRaw !== void 0)
    $$bindings.progressRaw(progressRaw);
  if ($$props.threshold === void 0 && $$bindings.threshold && threshold !== void 0)
    $$bindings.threshold(threshold);
  if ($$props.margin === void 0 && $$bindings.margin && margin !== void 0)
    $$bindings.margin(margin);
  if ($$props.debounce === void 0 && $$bindings.debounce && debounce !== void 0)
    $$bindings.debounce(debounce);
  if ($$props.throttle === void 0 && $$bindings.throttle && throttle !== void 0)
    $$bindings.throttle(throttle);
  $$result.css.add(css$2);
  return `<section class="scrolly svelte-14jsymd" style="${"--scrolly-margin: " + escape(margin, true)}"${add_attribute("this", container, 0)}><section class="story svelte-14jsymd">${slots.default ? slots.default({}) : ``}</section> <section class="viz svelte-14jsymd"${add_attribute("this", vizContainer, 0)}>${slots.viz ? slots.viz({}) : ``}</section> </section>`;
});
const ProjectNarrative_svelte_svelte_type_style_lang = "";
const css$1 = {
  code: ".scrolly-wrapper.svelte-fog6ys.svelte-fog6ys{width:min(1000ch, 60vw);position:relative;left:50%;transform:translateX(-50%)}.step.svelte-fog6ys.svelte-fog6ys{min-height:80vh;padding:2rem}.step-content.svelte-fog6ys.svelte-fog6ys{border-left:0.35rem solid var(--color-accent);padding:1.5rem 2rem;background:color-mix(in oklch, var(--color-accent), canvas 95%);border-radius:0 0.5rem 0.5rem 0}.step-content.svelte-fog6ys h3.svelte-fog6ys{margin:0 0 0.5rem}.step-content.svelte-fog6ys p.svelte-fog6ys{margin:0}.project-detail.svelte-fog6ys.svelte-fog6ys{padding:2rem;width:100%}.project-detail.svelte-fog6ys h3.svelte-fog6ys{margin:0 0 0.75rem}.project-detail.svelte-fog6ys p.svelte-fog6ys{margin:0.75rem 0 0;font-weight:600}.project-detail.svelte-fog6ys img.svelte-fog6ys{width:100%;max-width:560px;height:auto;display:block;border-radius:0.5rem;box-shadow:0 8px 30px oklch(0% 0 0 / 25%)}@media(max-width: 900px){.scrolly-wrapper.svelte-fog6ys.svelte-fog6ys{width:100%;left:0;transform:none}}",
  map: null
};
const ProjectNarrative = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let progressPerProject;
  let scrollyProgress = 0;
  let sorted_projects = [...projects].sort((a, b) => a.year - b.year);
  let activeProjectIdx = 0;
  $$result.css.add(css$1);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    progressPerProject = sorted_projects.length ? 100 / sorted_projects.length : 100;
    activeProjectIdx = sorted_projects.length ? Math.min(sorted_projects.length - 1, Math.floor(scrollyProgress / progressPerProject)) : 0;
    $$rendered = `<div class="scrolly-wrapper svelte-fog6ys">${validate_component(Scrolly, "Scrolly").$$render(
      $$result,
      { progress: scrollyProgress },
      {
        progress: ($$value) => {
          scrollyProgress = $$value;
          $$settled = false;
        }
      },
      {
        viz: () => {
          return `${sorted_projects.length ? `<div class="project-detail svelte-fog6ys"><h3 class="svelte-fog6ys">${escape(sorted_projects[activeProjectIdx].year)}</h3> <img src="${escape(base, true) + escape(sorted_projects[activeProjectIdx].image, true)}"${add_attribute("alt", sorted_projects[activeProjectIdx].title, 0)} class="svelte-fog6ys"> <p class="svelte-fog6ys">${escape(sorted_projects[activeProjectIdx].title)}</p></div>` : ``} `;
        },
        default: () => {
          return `${each(sorted_projects, (project) => {
            return `<section class="step svelte-fog6ys"><div class="step-content svelte-fog6ys"><h3 class="svelte-fog6ys">${escape(project.year)}: ${escape(project.title)}</h3> <p class="svelte-fog6ys">${escape(project.story)}</p></div> </section>`;
          })}`;
        }
      }
    )} </div>`;
  } while (!$$settled);
  return $$rendered;
});
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: ".outro.svelte-msqe0u{margin-bottom:2.5rem}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let years = projects.map((proj) => proj.year);
  let range = Math.max(...years) - Math.min(...years);
  $$result.css.add(css);
  return `<section><h1>${escape(projects.length)} Projects over ${escape(range)} Years</h1> <p data-svelte-h="svelte-v2swnn">Scroll down to see a timeline of my projects and how they contributed to my
    technical and storytelling skills.</p> ${validate_component(ProjectNarrative, "ProjectNarrative").$$render($$result, {}, {}, {})} <p class="outro svelte-msqe0u" data-svelte-h="svelte-1k6zlbb">Thanks for scrolling through my project story. You can browse all project
    cards below.</p> <div class="projects">${each(projects, (p) => {
    return `${validate_component(Project, "Project").$$render($$result, { data: p }, {}, {})}`;
  })}</div> </section>`;
});
export {
  Page as default
};
