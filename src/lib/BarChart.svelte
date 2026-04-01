<script>
  import * as d3 from "d3";

  // data: array of { label, value }
  export let data = [];
  export let title = "";
  export let xLabel = "";
  export let yLabel = "";
  export let horizontal = false;

  const margin = { top: 30, right: 20, bottom: 50, left: 70 };
  const width = 600;
  const height = 300;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  // Color scale — one color per label, stable domain from initial data
  let stableLabels = [];
  $: if (data.length > 0 && stableLabels.length === 0) {
    stableLabels = data.map(d => d.label);
  }

  $: colorScale = d3.scaleOrdinal()
    .domain(stableLabels.length > 0 ? stableLabels : data.map(d => d.label))
    .range(d3.schemeTableau10);

  // Stable band scale domain (always show all labels in same order)
  $: bandScale = d3.scaleBand()
    .domain(stableLabels.length > 0 ? stableLabels : data.map(d => d.label))
    .range(horizontal ? [0, innerH] : [0, innerW])
    .padding(0.2);

  $: valueScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) ?? 0])
    .range(horizontal ? [0, innerW] : [innerH, 0])
    .nice();

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

  // Axis DOM rendering via use:action
  let xAxisEl, yAxisEl;

  $: if (xAxisEl && yAxisEl) {
    if (horizontal) {
      const maxVal = d3.max(data, d => d.value) || 1;
      d3.select(xAxisEl).call(
        d3.axisBottom(valueScale)
          .ticks(Math.min(maxVal, 10))
          .tickFormat(d3.format("d"))
      );
      d3.select(yAxisEl).call(d3.axisLeft(bandScale));
    } else {
      d3.select(xAxisEl).call(d3.axisBottom(bandScale));
      const maxVal = d3.max(data, d => d.value) || 1;
      d3.select(yAxisEl).call(
        d3.axisLeft(valueScale)
          .ticks(Math.min(maxVal, 10))
          .tickFormat(d3.format("d"))
      );
    }
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
        <g bind:this={xAxisEl} transform="translate(0,{innerH})" />

        <!-- Y axis -->
        <g bind:this={yAxisEl} />

        <!-- X axis label -->
        <text
          class="axis-label"
          x={innerW / 2}
          y={innerH + 40}
          text-anchor="middle"
        >{xLabel}</text>

        <!-- Y axis label -->
        <text
          class="axis-label"
          transform="rotate(-90)"
          x={-innerH / 2}
          y={-55}
          text-anchor="middle"
        >{yLabel}</text>

        <!-- Annotation -->
        {#if maxItem && maxItem.value > 0}
          {#if horizontal}
            <text
              class="annotation-text"
              x={valueScale(maxItem.value) + 5}
              y={(bandScale(maxItem.label) ?? 0) + bandScale.bandwidth() / 2}
              dominant-baseline="middle"
              text-anchor="start"
            >{maxItem.value} lines</text>
          {:else}
            <text
              class="annotation-text"
              x={(bandScale(maxItem.label) ?? 0) + bandScale.bandwidth() / 2}
              y={valueScale(maxItem.value) - 5}
              text-anchor="middle"
            >{maxItem.value}</text>
          {/if}
        {/if}
      </g>
    </svg>

    <!-- Legend -->
    <ul class="legend">
      {#each (stableLabels.length > 0 ? stableLabels : data.map(d => d.label)) as label}
        <li>
          <span class="swatch" style="background:{colorScale(label)}"></span>
          {label}
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
    font-size: 1rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    text-align: center;
  }

  .chart-with-legend {
    display: flex;
    align-items: center;
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
    font-size: 0.75rem;
    fill: currentColor;
  }

  :global(.annotation-text) {
    font-size: 0.7rem;
    fill: currentColor;
  }

  .legend {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    font-size: 0.8rem;
    padding-top: 0.5rem;
  }

  .legend li {
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .swatch {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    flex-shrink: 0;
  }
</style>
