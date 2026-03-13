<script>
  import * as d3 from "d3";

  // data: array of { label, value }
  export let data = [];
  export let title = "";
  export let xLabel = "";
  export let yLabel = "";
  export let horizontal = false;

  const margin = { top: 40, right: 20, bottom: 60, left: 60 };
  const width = 600;
  const height = 360;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  // Color scale — one color per label
  $: colorScale = d3.scaleOrdinal()
    .domain(data.map(d => d.label))
    .range(d3.schemeTableau10);

  // Scales
  $: bandScale = d3.scaleBand()
    .domain(data.map(d => d.label))
    .range(horizontal ? [0, innerH] : [0, innerW])
    .padding(0.2);

  $: valueScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) ?? 0])
    .range(horizontal ? [0, innerW] : [innerH, 0])
    .nice();

  // Axes
  $: xAxis = horizontal
    ? d3.axisBottom(valueScale).tickFormat(d3.format("d"))
    : d3.axisBottom(bandScale);

  $: yAxis = horizontal
    ? d3.axisLeft(bandScale)
    : d3.axisLeft(valueScale).tickFormat(d3.format("d"));

  // Annotation: find item with max value
  $: maxItem = data.reduce((best, d) => (!best || d.value > best.value ? d : best), null);

  // Bar geometry helpers
  function barX(d) {
    if (horizontal) return 0;
    return bandScale(d.label);
  }
  function barY(d) {
    if (horizontal) return bandScale(d.label);
    return valueScale(d.value);
  }
  function barW(d) {
    if (horizontal) return valueScale(d.value);
    return bandScale.bandwidth();
  }
  function barH(d) {
    if (horizontal) return bandScale.bandwidth();
    return innerH - valueScale(d.value);
  }

  // Annotation leader line & label position
  function annotationX() {
    if (!maxItem) return 0;
    if (horizontal) return valueScale(maxItem.value);
    return (bandScale(maxItem.label) ?? 0) + bandScale.bandwidth() / 2;
  }
  function annotationY() {
    if (!maxItem) return 0;
    if (horizontal) return (bandScale(maxItem.label) ?? 0) + bandScale.bandwidth() / 2;
    return valueScale(maxItem.value);
  }

  // Axis DOM rendering via use:action
  function axisBottom(node, scale) {
    d3.select(node).call(d3.axisBottom(scale).tickFormat(d3.format("d")));
    return { update(s) { d3.select(node).call(d3.axisBottom(s).tickFormat(d3.format("d"))); }};
  }
  function axisLeft(node, scale) {
    d3.select(node).call(d3.axisLeft(scale).tickFormat(d3.format("d")));
    return { update(s) { d3.select(node).call(d3.axisLeft(s).tickFormat(d3.format("d"))); }};
  }
  function axisBandBottom(node, scale) {
    d3.select(node).call(d3.axisBottom(scale));
    return { update(s) { d3.select(node).call(d3.axisBottom(s)); }};
  }
  function axisBandLeft(node, scale) {
    d3.select(node).call(d3.axisLeft(scale));
    return { update(s) { d3.select(node).call(d3.axisLeft(s)); }};
  }
</script>

<figure>
  {#if title}
    <figcaption class="chart-title">{title}</figcaption>
  {/if}

  <div class="chart-with-legend">
    <svg viewBox="0 0 {width} {height}" {width} {height}>
      <g transform="translate({margin.left},{margin.top})">
        <!-- Bars -->
        {#each data as d}
          <rect
            x={barX(d)}
            y={barY(d)}
            width={barW(d)}
            height={barH(d)}
            fill={colorScale(d.label)}
          />
        {/each}

        <!-- X axis -->
        {#if horizontal}
          <g use:axisBottom={valueScale} transform="translate(0,{innerH})" />
        {:else}
          <g use:axisBandBottom={bandScale} transform="translate(0,{innerH})" />
        {/if}

        <!-- Y axis -->
        {#if horizontal}
          <g use:axisBandLeft={bandScale} />
        {:else}
          <g use:axisLeft={valueScale} />
        {/if}

        <!-- X axis label -->
        <text
          class="axis-label"
          x={innerW / 2}
          y={innerH + 45}
          text-anchor="middle"
        >{xLabel}</text>

        <!-- Y axis label -->
        <text
          class="axis-label"
          transform="rotate(-90)"
          x={-innerH / 2}
          y={-48}
          text-anchor="middle"
        >{yLabel}</text>

        <!-- Annotation: leader line + label -->
        {#if maxItem}
          {#if horizontal}
            <!-- Vertical leader line from bar tip -->
            <line
              class="annotation-line"
              x1={annotationX()}
              y1={annotationY() - bandScale.bandwidth() / 2 - 4}
              x2={annotationX() + 30}
              y2={annotationY() - bandScale.bandwidth() / 2 - 22}
            />
            <text
              class="annotation-text"
              x={annotationX() + 33}
              y={annotationY() - bandScale.bandwidth() / 2 - 22}
              dominant-baseline="middle"
            >{maxItem.value} lines</text>
          {:else}
            <!-- Leader line from bar top -->
            <line
              class="annotation-line"
              x1={annotationX()}
              y1={annotationY()}
              x2={annotationX() + 30}
              y2={annotationY() - 28}
            />
            <text
              class="annotation-text"
              x={annotationX() + 34}
              y={annotationY() - 28}
              dominant-baseline="middle"
            >{maxItem.value} project{maxItem.value !== 1 ? "s" : ""}</text>
          {/if}
        {/if}
      </g>
    </svg>

    <!-- Legend -->
    <ul class="legend">
      {#each data as d}
        <li>
          <span class="swatch" style="background:{colorScale(d.label)}"></span>
          {d.label}
        </li>
      {/each}
    </ul>
  </div>
</figure>

<style>
  figure {
    margin: 0;
  }

  .chart-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .chart-with-legend {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    flex-wrap: wrap;
  }

  svg {
    flex-shrink: 0;
    max-width: 100%;
    height: auto;
    overflow: visible;
  }

  :global(.axis-label) {
    font-size: 0.8rem;
    fill: currentColor;
  }

  :global(.annotation-line) {
    stroke: currentColor;
    stroke-width: 1.5;
    marker-end: url(#arrow);
  }

  :global(.annotation-text) {
    font-size: 0.75rem;
    fill: currentColor;
  }

  .legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-size: 0.85rem;
    padding-top: 0.5rem;
  }

  .legend li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .swatch {
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 2px;
    flex-shrink: 0;
  }
</style>
