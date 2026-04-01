<script>
  import { onMount } from "svelte";
  import * as d3 from "d3";
  import { base } from "$app/paths";
  import { computePosition, autoPlacement, offset } from '@floating-ui/dom';
  import BarChart from "$lib/BarChart.svelte";

  let locData = [];
  let commits = [];

  // Scatter plot dimensions
  let width = 1000, height = 600;
  let margin = { top: 10, right: 10, bottom: 30, left: 50 };
  let usableArea = {};
  $: usableArea = {
    top: margin.top,
    right: width - margin.right,
    bottom: height - margin.bottom,
    left: margin.left,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom
  };

  // Axis DOM refs
  let xAxis, yAxis, yAxisGridlines;

  // Scales
  $: xScale = d3.scaleTime()
    .domain(d3.extent(commits, d => d.datetime) || [new Date(), new Date()])
    .range([usableArea.left, usableArea.right])
    .nice();

  $: yScale = d3.scaleLinear()
    .domain([0, 24])
    .range([usableArea.top, usableArea.bottom]);

  $: rScale = d3.scaleSqrt()
    .domain(d3.extent(commits, d => d.totalLines) || [0, 1])
    .range([5, 30]);

  // Render axes reactively
  $: {
    if (xAxis) d3.select(xAxis).call(d3.axisBottom(xScale));
    if (yAxis) d3.select(yAxis).call(
      d3.axisLeft(yScale).tickFormat(d => String(d % 24).padStart(2, "0") + ":00")
    );
    if (yAxisGridlines) d3.select(yAxisGridlines).call(
      d3.axisLeft(yScale).tickFormat("").tickSize(-usableArea.width)
    );
  }

  // Tooltip state
  let hoveredIndex = -1;
  $: hoveredCommit = commits[hoveredIndex] ?? hoveredCommit ?? {};
  let commitTooltip;
  let tooltipPosition = { x: 0, y: 0 };

  // Click selection
  let clickedCommits = [];

  async function dotInteraction(index, evt) {
    let hoveredDot = evt.target;
    if (evt.type === "mouseenter") {
      hoveredIndex = index;
      if (commitTooltip) {
        tooltipPosition = await computePosition(hoveredDot, commitTooltip, {
          strategy: "fixed",
          middleware: [
            offset(5),
            autoPlacement()
          ],
        });
      }
    } else if (evt.type === "mouseleave") {
      hoveredIndex = -1;
    } else if (evt.type === "click") {
      let commit = commits[index];
      if (!clickedCommits.includes(commit)) {
        clickedCommits = [...clickedCommits, commit];
      } else {
        clickedCommits = clickedCommits.filter(c => c !== commit);
      }
    }
  }

  // Bar chart data: filter by selected commits
  $: selectedLines = clickedCommits.length > 0
    ? clickedCommits.flatMap(d => d.lines)
    : locData;
  $: selectedCounts = d3.rollup(selectedLines, v => v.length, d => d.type);
  $: allTypes = Array.from(new Set(locData.map(d => d.type)));
  $: barData = allTypes.map(type => ({
    label: String(type),
    value: selectedCounts.get(type) || 0
  }));
  $: barTitle = clickedCommits.length > 0
    ? `Language breakdown for ${clickedCommits.length} selected commit${clickedCommits.length > 1 ? 's' : ''}`
    : "Language breakdown for all commits";

  // Stats
  $: totalLOC = locData.length;
  $: totalCommits = commits.length;
  $: totalFiles = d3.group(locData, d => d.file).size;
  $: fileLengths = d3.rollups(locData, v => d3.max(v, v => v.line), d => d.file);
  $: averageFileLength = d3.mean(fileLengths, d => d[1]);
  $: maxDepth = d3.max(locData, d => d.depth);

  onMount(async () => {
    locData = await d3.csv(`${base}/loc.csv`, row => ({
      ...row,
      line: Number(row.line),
      depth: Number(row.depth),
      length: Number(row.length),
      date: new Date(row.date + "T00:00" + row.timezone),
      datetime: new Date(row.datetime)
    }));

    commits = d3.groups(locData, d => d.commit).map(([commit, lines]) => {
      let first = lines[0];
      let { author, date, time, timezone, datetime } = first;
      let ret = {
        id: commit,
        url: "https://github.com/wesleyshe/6.C85_lab/commit/" + commit,
        author, date, time, timezone, datetime,
        hourFrac: datetime.getHours() + datetime.getMinutes() / 60,
        totalLines: lines.length,
        lines: lines
      };
      return ret;
    });

    // Sort largest first so small dots paint on top
    commits = d3.sort(commits, d => -d.totalLines);
  });
</script>

<section>
  <h1>Meta: About This Codebase</h1>
  <p>A meta-analysis of the code that powers this site.</p>

  <dl class="stats">
    <dt>Total <abbr title="Lines of code">LOC</abbr></dt>
    <dd>{totalLOC}</dd>

    <dt>Commits</dt>
    <dd>{totalCommits}</dd>

    <dt>Files</dt>
    <dd>{totalFiles}</dd>

    <dt>Max depth</dt>
    <dd>{maxDepth}</dd>

    <dt>Avg file length</dt>
    <dd>{averageFileLength ? Math.round(averageFileLength) : 0} lines</dd>
  </dl>

  <h2>Commits by time of day</h2>

  <svg viewBox="0 0 {width} {height}">
    <g class="gridlines" transform="translate({usableArea.left}, 0)" bind:this={yAxisGridlines} />
    <g class="dots">
      {#each commits as commit, index}
        <circle
          cx={xScale(commit.datetime)}
          cy={yScale(commit.hourFrac)}
          r={rScale(commit.totalLines)}
          fill="steelblue"
          fill-opacity="0.6"
          class:selected={clickedCommits.includes(commit)}
          on:mouseenter={evt => dotInteraction(index, evt)}
          on:mouseleave={evt => dotInteraction(index, evt)}
          on:click={evt => dotInteraction(index, evt)}
          on:keyup={evt => evt.key === 'Enter' && dotInteraction(index, evt)}
          tabindex="0"
          role="button"
          aria-label="Commit {commit.id}"
        />
      {/each}
    </g>
    <g transform="translate(0, {usableArea.bottom})" bind:this={xAxis} />
    <g transform="translate({usableArea.left}, 0)" bind:this={yAxis} />
  </svg>

  <dl class="info tooltip" hidden={hoveredIndex === -1} bind:this={commitTooltip}
      style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px">
    <dt>Commit</dt>
    <dd><a href="{hoveredCommit.url}" target="_blank">{hoveredCommit.id}</a></dd>
    <dt>Date</dt>
    <dd>{hoveredCommit.datetime?.toLocaleString("en", { dateStyle: "full" })}</dd>
    <dt>Time</dt>
    <dd>{hoveredCommit.datetime?.toLocaleString("en", { timeStyle: "short" })}</dd>
    <dt>Author</dt>
    <dd>{hoveredCommit.author}</dd>
    <dt>Lines edited</dt>
    <dd>{hoveredCommit.totalLines}</dd>
  </dl>

  <h2>Language breakdown</h2>
  {#if barData.length > 0}
    <BarChart
      data={barData}
      title={barTitle}
      xLabel="Lines of Code"
      yLabel="Language"
      horizontal={true}
    />
  {:else}
    <p>Loading code stats...</p>
  {/if}
</section>

<style>
  section {
    max-width: 1000px;
  }

  svg {
    overflow: visible;
  }

  .gridlines {
    stroke-opacity: 0.2;
  }

  circle {
    transition: 200ms;
    cursor: pointer;
  }

  circle:hover {
    fill: orange;
  }

  circle.selected {
    fill: var(--color-accent, #e45);
  }

  .stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 0.5em 1em;
    margin: 1em 0 2em;
  }

  .stats dt {
    font-size: 0.8rem;
    text-transform: uppercase;
    color: gray;
    grid-row: 1;
  }

  .stats dd {
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
    grid-row: 2;
  }

  dl.info {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.25em 0.75em;
    transition-duration: 500ms;
    transition-property: opacity, visibility;
  }

  dl.info[hidden]:not(:hover, :focus-within) {
    opacity: 0;
    visibility: hidden;
  }

  dl.info dt {
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    color: gray;
  }

  dl.info dd {
    margin: 0;
  }

  .tooltip {
    position: fixed;
    top: 1em;
    left: 1em;
    background-color: oklch(95% 0 0 / 90%);
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    padding: 0.75em 1em;
    backdrop-filter: blur(4px);
    z-index: 10;
  }

  @media (prefers-color-scheme: dark) {
    .tooltip {
      background-color: oklch(25% 0 0 / 90%);
    }
  }
</style>
