<script>
  import * as d3 from "d3";

  // data: array of { label, value }
  export let data = [];
  export let title = "";
  export let xLabel = "";
  export let yLabel = "";
  export let horizontal = false;

  const uid = Math.random().toString(36).slice(2, 8);

  const margin = { top: 30, right: 20, bottom: 50, left: 70 };
  const width = 600;
  const height = 300;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  let selectedIndex = -1;
  let liveText = "";
  let showChart = true;

  // Color scale — one color per label, stable domain from initial data
  let stableLabels = [];
  $: if (data.length > 0 && stableLabels.length === 0) {
    stableLabels = data.map(d => d.label);
  }

  $: labelDomain = stableLabels.length > 0 ? stableLabels : data.map(d => d.label);

  $: colorScale = d3.scaleOrdinal()
    .domain(labelDomain)
    .range(d3.quantize(
      t => d3.interpolateBlues(0.35 + 0.55 * t),
      Math.max(labelDomain.length, 2)
    ));

  // Stable band scale domain (always show all labels in same order)
  $: bandScale = d3.scaleBand()
    .domain(labelDomain)
    .range(horizontal ? [0, innerH] : [0, innerW])
    .padding(0.2);

  $: valueScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.value) ?? 0])
    .range(horizontal ? [0, innerW] : [innerH, 0])
    .nice();

  // Annotation: find item with max value
  $: maxItem = data.reduce((best, d) => (!best || d.value > best.value ? d : best), null);

  // Reactive, human-readable description for screen readers
  $: description = data.length === 0
    ? "Empty bar chart."
    : `Bar chart showing ${yLabel || "values"} by ${xLabel || "category"}. ${data.map(d => `${d.label}: ${d.value}`).join(", ")}.`;

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

  function toggleBar(index, event) {
    if (!event.key || event.key === "Enter" || event.key === " ") {
      selectedIndex = selectedIndex === index ? -1 : index;
      if (selectedIndex === -1) {
        liveText = "Selection cleared.";
      } else {
        const d = data[index];
        liveText = `${d.label}: ${d.value} selected.`;
      }
    }
  }

  function toggleView() {
    showChart = !showChart;
    liveText = showChart ? "Bar chart view shown." : "Table view shown.";
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

  <button
    type="button"
    class="toggle-button"
    on:click={toggleView}
    aria-pressed={!showChart}
    aria-label="Toggle between bar chart and table view"
  >
    {showChart ? "Show Table" : "Show Chart"}
  </button>

  {#if showChart}
    <div class="chart-with-legend container">
      <svg
        viewBox="0 0 {width} {height}"
        {width}
        {height}
        role="img"
        aria-labelledby="bar-title-{uid} bar-desc-{uid}"
      >
        <title id="bar-title-{uid}">{title || "Bar chart"}</title>
        <desc id="bar-desc-{uid}">{description}</desc>
        <g transform="translate({margin.left},{margin.top})">
          <!-- Bars -->
          {#each data as d, index}
            <rect
              x={barX(d)}
              y={barY(d)}
              width={barW(d)}
              height={barH(d)}
              fill={colorScale(d.label)}
              stroke="black"
              tabindex="0"
              role="button"
              aria-label="{d.label}: {d.value}"
              aria-pressed={selectedIndex === index}
              opacity={selectedIndex === -1 || selectedIndex === index ? 1 : 0.45}
              on:click={(e) => toggleBar(index, e)}
              on:keyup={(e) => toggleBar(index, e)}
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
        {#each labelDomain as label}
          <li>
            <span class="swatch" style="background:{colorScale(label)}"></span>
            {label}
          </li>
        {/each}
      </ul>
    </div>
  {:else}
    <table class="data-table" aria-label="Table showing {title || 'chart'} data">
      <caption>{title || "Chart data"}</caption>
      <thead>
        <tr>
          <th id="label-header-{uid}" scope="col">{xLabel || "Label"}</th>
          <th id="value-header-{uid}" scope="col">{yLabel || "Value"}</th>
        </tr>
      </thead>
      <tbody>
        {#each data as d, i}
          <tr>
            <th id="row-{uid}-{i}" scope="row">{d.label}</th>
            <td aria-labelledby="row-{uid}-{i} value-header-{uid}">{d.value}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  {/if}

  <p aria-live="polite" class="sr-only">{liveText}</p>
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

  rect {
    transition: opacity 300ms, stroke-width 150ms;
    stroke: black;
    stroke-width: 1;
    outline: none;
    cursor: pointer;
  }

  svg:hover rect:not(:hover),
  .container:focus-within rect:not(:focus):not(:hover) {
    opacity: 0.5;
  }

  rect:focus-visible {
    stroke: white;
    stroke-width: 2px;
    stroke-dasharray: 4;
  }

  :global(.axis-label) {
    font-size: 0.75rem;
    fill: currentColor;
  }

  :global(.annotation-text) {
    font-size: 0.7rem;
    fill: currentColor;
    font-weight: 600;
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
    border: 1px solid #333;
  }

  .toggle-button {
    display: inline-block;
    margin-bottom: 0.75rem;
    padding: 0.4rem 0.9rem;
    font: inherit;
    font-size: 0.85rem;
    background: #f5f5f5;
    border: 1px solid #888;
    border-radius: 4px;
    cursor: pointer;
  }

  .toggle-button:hover {
    background: #e8e8e8;
  }

  .toggle-button:focus-visible {
    outline: 2px solid #1f6feb;
    outline-offset: 2px;
  }

  .data-table {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border-collapse: collapse;
    width: 100%;
    max-width: 30em;
  }

  .data-table caption {
    font-weight: bold;
    margin-bottom: 0.5em;
    text-align: left;
  }

  .data-table th,
  .data-table td {
    border: 1px solid #ccc;
    padding: 0.5em;
    text-align: left;
  }

  .data-table th {
    background-color: #f0f0f0;
  }

  .sr-only {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
</style>
