# Gatsby + Contentful — Modules Practice

This mini side-project exists for one clear purpose:

**Practice querying Contentful using the custom schema defined in `gatsby-node.js` to understand how GraphQL fragments and interfaces map to the actual data returned at runtime.**

Think of this as your little GraphQL lab: you’ll toggle between real Contentful data and local mock data, inspect `__typename`, experiment with inline fragments, and see exactly how the shape of your queries becomes the shape of your JSON.

---

## What’s included (quick map)

* `gatsby-config.js` — loads `.env` (via `dotenv`) and configures `gatsby-source-contentful`.
* `gatsby-node.js` — contains `createSchemaCustomization` that declares:

  * `interface Module` and the `ContentfulPage` type with `modules: [Module] @link`
  * concrete module types: `ContentfulHero`, `ContentfulCards`, `ContentfulGallery`
* `src/pages/index.js` — page with GraphQL query using inline fragments + fallback mock mode for offline testing.
* `src/components/ModuleRenderer.js`, `Hero.js`, `Cards.js`, `Gallery.js` — tiny renderers that switch on `module.__typename`.
* `.env.example` — sample env vars file.
* `README.md` — this file.

---

## Primary learning goals (repeat after me)

1. Declare interfaces and concrete types in `gatsby-node.js` so Gatsby exposes fields predictably.
2. Use `__typename` and inline fragments in queries to discriminate union/interface item shapes.
3. Inspect GraphiQL (`/___graphql`) to verify what the schema exposes and what data is returned.
4. Practice debugging common issues (missing env vars, unpublished entries, wrong API IDs).

---

## Getting started (minimal commands)

```bash
# unzip/download the project
cd gatsby-contentful-modules-example

# copy .env and fill with your Contentful credentials (or export env vars)
cp .env.example .env
# edit .env -> set CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN

# install deps
npm install

# start dev server
npm run develop
# GraphiQL: http://localhost:8000/___graphql
```

If you prefer not to use a `.env` file, export the environment variables in your shell instead.

---

## Toggle mock data (fast offline testing)

Open `src/pages/index.js` and find:

```js
const USE_MOCK = true; // set to false to use real Contentful data
```

With `USE_MOCK = true` the page will render a small set of mock modules (`ContentfulHero`, `ContentfulCards`, `ContentfulGallery`) so you can test the renderer without Contentful.

---

## Important GraphiQL queries to run (copy/paste)

1. **Inspect the `ContentfulPage` type fields**

```graphql
{
  __type(name: "ContentfulPage") {
    name
    fields { name type { kind name ofType { kind name } } }
  }
}
```

2. **See a page node list (confirm connectivity)**

```graphql
{
  allContentfulPage(limit: 5) {
    nodes { id slug title }
  }
}
```

3. **Check modules on the `home` page (after creating entries)**

```graphql
{
  contentfulPage(slug: { eq: "home" }) {
    title
    modules {
      __typename
      ... on ContentfulHero { id heading subheading }
      ... on ContentfulCards { id title cards { title body } }
      ... on ContentfulGallery { id images { title } }
    }
  }
}
```

Expected: `modules` is an array of objects where each object has `__typename` telling you the concrete type and only the fields requested for that type appear.

---

## If `modules` is missing — the usual suspects & fixes

* **Field API ID mismatch**: In Contentful the References field might not be called `modules`. Either rename the Contentful field to the API ID `modules` or change the declaration in `gatsby-node.js` to match your API ID.
* **Unpublished references**: If referenced module entries (Hero, Cards, Gallery) are unpublished, Gatsby won't create node links. Publish them in Contentful.
* **Schema inference omission**: If your Page entries don’t have `modules` filled at bootstrap, Gatsby may not infer the field. That’s why `gatsby-node.js` in this repo explicitly declares `ContentfulPage` with `modules: [Module] @link`.
* **Env vars missing**: `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` must be present when Gatsby boots.

When in doubt:

```bash
npx gatsby clean
npm run develop
```

---

## Quick Contentful entry creation (manual)

1. Create content types (API IDs used in this repo):

   * `page` — fields: `title` (Short text), `slug` (Short text), `modules` (References, allow multiple).
   * `hero` — fields: `heading`, `subheading`, `backgroundImage` (Asset).
   * `card` — fields: `title`, `body`, `image` (Asset).
   * `cards` — fields: `title`, `cards` (References to `card`, multiple).
   * `gallery` — fields: `images` (References to Assets, multiple).
2. Create and **publish** sample entries:

   * A `hero` entry; a couple `card` entries; a `cards` entry referencing those cards; a `gallery` entry with image refs.
3. Create a `page` entry with `slug: home` and add the module entries to the `modules` reference list (publish).

After publishing, run Gatsby and use the GraphiQL queries above to inspect results.

---

## Files you will likely edit for your real models

* `gatsby-node.js` — change the `ContentfulPage` declaration if your Page's modules field has a different API ID (e.g. `pageModules: [Module] @link`).
* `src/pages/index.js` — adjust fragments to include fields your real content types expose.
* `src/components/*` — tweak rendering to match real fields.

---

## Troubleshooting checklist (fast)

* Ensure `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` are set and loaded (`dotenv` is included).
* Confirm content types and field API IDs match the schema.
* Publish referenced entries in Contentful.
* Run `npx gatsby clean` after schema or Contentful changes, then restart.

---

## Small reference: why `__typename` and fragments

* `__typename` tells you the concrete runtime GraphQL type (e.g., `ContentfulHero`).
* Inline fragments (`... on ContentfulHero { ... }`) let you request fields that only exist on that concrete type. GraphQL returns those fields only for nodes of that type — perfect for rendering heterogeneous module lists.

---

## Final nerdy note

This project is intentionally minimal so you can *learn by changing things*. Add fields, rename a field in Contentful, re-declare types in `gatsby-node.js`, and watch how GraphiQL and your page output respond. The magic (and the debugging practice) lives in the small differences between what your schema *declares* and what the content actually contains.

Happy fragment-hunting — may your `__typename` always be honest and your queries return exactly what you expect. 🧪✨

## Contentful

Create a `Page` content type with a `slug` field and a `modules` (multiple references) field that includes entries of types matching: `Hero`, `Cards`, `Gallery`. Publish entries.

This example is intentionally minimal for learning purposes.
