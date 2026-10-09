import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";

const repositoryOwner = "DiCeMan8400";
const repositoryName = "dezzie-crosses-the-road";
const title = "Dezzie Crosses The Road";

await rm("web", { force: true, recursive: true });
await mkdir("web", { recursive: true });
await cp("assets", "web/assets", { recursive: true });

const source = await readFile("index.html", "utf8");
const html = source
    .replace(/^---\r?\n# this is an empty front matter\r?\n---\r?\n/, "")
    .replaceAll("{{ site.github.project_title }}", title)
    .replaceAll("{{ site.github.project_tagline }}", "A road-crossing arcade game.")
    .replaceAll("{{ site.github.owner_name }}", repositoryOwner)
    .replaceAll("{{ site.github.repository_name }}", repositoryName)
    .replaceAll("{{ site.github.build_revision }}", "app");

await writeFile("web/index.html", html);
