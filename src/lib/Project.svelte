<script>
    import { base } from "$app/paths";
    export let data = {};
</script>

<article>
    <img src="{base}{data.image}" alt={data.title} />
    <h3>{data.title}</h3>
    {#if data.year}
        <p class="year">{data.year}</p>
    {/if}
    <p>{data.description}</p>
</article>

<style>
    article {
        display: grid;
        grid-template-rows: subgrid;
        grid-row: span 4;
    }
    article img {
        grid-row: 1;
        width: 100%;
        height: 220px;
        object-fit: cover;
        display: block;
    }
    article h3 {
        grid-row: 2;
        margin: 0;
    }
    article .year {
        grid-row: 3;
        margin: 0;
        font-weight: 600;
        opacity: 0.85;
    }
    article p:last-child {
        grid-row: 4;
    }
</style>
