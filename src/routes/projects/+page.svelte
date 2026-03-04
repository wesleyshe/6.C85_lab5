<script>
  import projects from "$lib/projects.json";
  import Project from "$lib/Project.svelte";
  import ProjectNarrative from "$lib/ProjectNarrative.svelte";

  let years = projects.map((proj) => proj.year);
  let range = Math.max(...years) - Math.min(...years);
</script>

<section>
  <h1>{projects.length} Projects over {range} Years</h1>
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
