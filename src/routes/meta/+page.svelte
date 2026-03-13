<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { base } from "$app/paths";
  import BarChart from "$lib/BarChart.svelte";

  let locData = [];

  onMount(async () => {
    const raw = await d3.csv(`${base}/loc.csv`);
    // Roll up: count lines per language type
    const rolled = d3.rollups(
      raw,
      v => v.length,
      d => d.type
    );
    locData = rolled
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  });
</script>

<section>
  <h1>Meta: About This Codebase</h1>
  <p>
    A meta-analysis of the code that powers this site. The chart below breaks
    down lines of code by programming language.
  </p>

  {#if locData.length > 0}
    <BarChart
      data={locData}
      title="Lines of Code by Language"
      xLabel="Lines of Code"
      yLabel="Language"
      horizontal={true}
    />
  {:else}
    <p>Loading code stats…</p>
  {/if}
</section>

<style>
  section {
    max-width: 800px;
  }
</style>
