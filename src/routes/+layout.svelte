<script>
  import { base } from "$app/paths";
  import { page } from "$app/stores";

  let pages = [
    { url: "/", title: "Home" },
    { url: "/projects", title: "Projects" },
    { url: "/meta", title: "Meta" },
    { url: "/contact", title: "Contact" },
    { url: "/resume", title: "Resume" },
    { url: "https://github.com/wesleyshe", title: "GitHub" }
  ];

  let localStorage = globalThis.localStorage ?? {};
  let colorScheme = localStorage.colorScheme ?? "light dark";
  let root = globalThis.document?.documentElement;
  let currentPath = "/";

  const isExternal = (url) => url.startsWith("http");
  const linkHref = (url) => (isExternal(url) ? url : base + url);
  const normalizePath = (path) => {
    if (!path) return "/";

    let normalized = path.startsWith("/") ? path : `/${path}`;
    normalized = normalized.replace(/\/index\.html$/, "/");
    normalized = normalized.replace(/\.html$/, "");
    normalized = normalized.replace(/\/{2,}/g, "/");

    if (normalized.length > 1) {
      normalized = normalized.replace(/\/+$/, "");
    }

    return normalized || "/";
  };

  const stripBase = (pathname) => {
    const normalizedBase = normalizePath(base);
    const normalizedPath = normalizePath(pathname);

    if (normalizedBase !== "/" && normalizedPath.startsWith(normalizedBase)) {
      return normalizePath(normalizedPath.slice(normalizedBase.length) || "/");
    }

    return normalizedPath;
  };

  const isCurrentPath = (targetPath, currentPath) => {
    return targetPath === "/"
      ? currentPath === "/"
      : currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  $: currentPath = stripBase($page.url.pathname);

  $: root?.style.setProperty("color-scheme", colorScheme);
  $: localStorage.colorScheme = colorScheme;
</script>

<label class="color-scheme-switch">
  Theme:
  <select bind:value={colorScheme}>
    <option value="light dark">Automatic</option>
    <option value="light">Light</option>
    <option value="dark">Dark</option>
  </select>
</label>

<nav>
  {#each pages as p}
    <a
      href={linkHref(p.url)}
      class:current={
        !isExternal(p.url) &&
        isCurrentPath(normalizePath(p.url), currentPath)
      }
      target={isExternal(p.url) ? "_blank" : null}
      rel={isExternal(p.url) ? "noopener noreferrer" : null}
    >
      {p.title}
    </a>
  {/each}
</nav>

<slot />

<style>
  .color-scheme-switch {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 80%;
  }

  .color-scheme-switch select {
    font: inherit;
  }

  nav {
    --border-color: oklch(50% 10% 200 / 40%);
    display: flex;
    margin-bottom: 1.5em;
    border-bottom: 2px solid var(--border-color);
  }

  nav a {
    flex: 1;
    text-decoration: none;
    color: inherit;
    text-align: center;
    padding: 0.5em;
    border-bottom: 0.4em solid transparent;
  }

  nav a.current {
    border-bottom-color: var(--border-color);
  }

  nav a:hover {
    border-bottom-color: var(--color-accent);
    background: color-mix(in oklch, var(--color-accent), canvas 85%);
  }
</style>
