<script>
  import * as d3 from "d3";
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";
  import ProjectNarrative from "$lib/ProjectNarrative.svelte";
  import BarChart from "$lib/BarChart.svelte";

  let years = projects.map((proj) => proj.year);
  let range = Math.max(...years) - Math.min(...years);

  // Roll up: count projects per year, sorted ascending
  const rolled = d3.rollups(
    projects,
    v => v.length,
    d => d.year
  );
  const projectsByYear = rolled
    .map(([label, value]) => ({ label: String(label), value }))
    .sort((a, b) => Number(a.label) - Number(b.label));
</script>

<section>
  <h1>{projects.length} Projects over {range} Years</h1>

  <BarChart
    data={projectsByYear}
    title="Projects per Year"
    xLabel="Year"
    yLabel="Number of Projects"
    horizontal={false}
  />

  <p>
    Scroll down to see a timeline of my projects and how they contributed to my
    technical and storytelling skills.
  </p>

  <ProjectNarrative />

  <p class="outro">
    Thanks for scrolling through my project story. You can browse all project
    cards below.
  </p>

  <div class="projects">
    {#each projects as p}
      <Project data={p} />
    {/each}
  </div>
</section>

<style>
  .outro {
    margin-bottom: 2.5rem;
  }
</style>
