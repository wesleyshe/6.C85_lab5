<script>
  import { onMount } from "svelte";
  import { base } from "$app/paths";
  import projects from "$lib/projects.json";
  import reading from "$lib/reading.json";
  import Project from "$lib/Project.svelte";
  import ReadingItem from "$lib/ReadingItem.svelte";

  let githubData = null;
  let loading = true;
  let error = null;

  onMount(async () => {
    try {
      const response = await fetch("https://api.github.com/users/wesleyshe");
      if (!response.ok) {
        throw new Error(`GitHub API request failed (${response.status})`);
      }
      githubData = await response.json();
    } catch (err) {
      error = err;
    }
    loading = false;
  });
</script>

<h1>Ikea Shark</h1>
<p>
  Born in the deep blue aisle and raised on flat pack dreams, this
  distinguished aquatic gentleman has dedicated his life to comfort, loyalty,
  and looking mildly concerned on your behalf. He possesses the quiet
  confidence of someone who knows he is both apex predator and premium pillow,
  a rare dual specialization that few dare attempt.
</p>
<p>
  He thrives in domestic waters such as beds, sofas, and any location that
  recently experienced emotional turbulence. His hobbies include supervising
  naps, participating in dramatic staring contests with the wall, and arriving
  instantly the moment someone says, "I just need a hug." He does not ask
  questions, he simply absorbs vibes and occasionally crumbs.
</p>
<p>
  Despite a fierce reputation, his daily schedule mostly involves heroic
  levels of loafing. He believes in work life balance, especially the life
  part, and has made it his mission to ensure no human within flopping
  distance ever feels unsupported. Scientists remain baffled by how he manages
  to be structured yet squishy, brave yet baby. If found adrift, please return
  to the nearest blanket. Payment can be made in head pats and being included
  in important conversations he will absolutely not repeat.
</p>
<img src="{base}/image/ikea%20shark.jpg" alt="my face" />

{#if loading}
  <p>Loading GitHub stats...</p>
{:else if error}
  <p>Something went wrong: {error.message}</p>
{:else}
  <section class="github-stats">
    <h2>GitHub Stats</h2>
    <dl>
      <dt>Followers</dt>
      <dd>{githubData.followers}</dd>
      <dt>Following</dt>
      <dd>{githubData.following}</dd>
      <dt>Public Repos</dt>
      <dd>{githubData.public_repos}</dd>
      <dt>Public Gists</dt>
      <dd>{githubData.public_gists}</dd>
    </dl>
  </section>
{/if}

<h2>Latest Projects</h2>
<div class="projects highlights">
  {#each projects.slice(0, 3) as p}
    <Project data={p} />
  {/each}
</div>

<h2>What I'm Reading</h2>
<div class="reading">
  {#each reading as item}
    <ReadingItem data={item} />
  {/each}
</div>

<style>
  img {
    display: block;
    width: 100%;
    height: auto;
    margin: 0 auto;
  }
  .reading {
    display: flex;
    flex-direction: column;
    gap: 1.25em;
  }
  .github-stats {
    margin: 2rem 0;
    padding: 1.25rem;
    border: 2px solid var(--color-accent);
    border-radius: 0.5rem;
    background: color-mix(in oklch, var(--color-accent), canvas 93%);
  }
  .github-stats h2 {
    margin: 0 0 1rem;
  }
  .github-stats dl {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(4, minmax(6rem, 1fr));
    gap: 0.25rem 1rem;
  }
  .github-stats dt {
    grid-row: 1;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    opacity: 0.8;
  }
  .github-stats dd {
    grid-row: 2;
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
    line-height: 1;
  }
</style>
