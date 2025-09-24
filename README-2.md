# Gatsby + Contentful — Modules Practice (Contentful-focused)

**Primary purpose:** Practice querying Contentful using the custom schema defined in `gatsby-node.js` to understand how GraphQL fragments and interfaces map to the actual data returned at runtime.

This repository is a tiny, focused lab for learning how `__typename`, inline fragments, and Gatsby's schema customization behave when rendering heterogeneous module lists from Contentful.

---

## What's included (important files)

* `gatsby-node.js` — declares the `Module` interface and `ContentfulPage` with `modules: [Module] @link`, plus concrete types (`ContentfulHero`, `ContentfulCards`, `ContentfulGallery`).
* `gatsby-config.js` — loads `.env` and configures `gatsby-source-contentful`.
* `src/pages/index.js` — real-data focused page that queries a `page` with `slug: "home"` and uses fragments to request module-specific fields.
* `src/components/*` — tiny presentational components (`ModuleRenderer`, `Hero`, `Cards`, `Gallery`) that switch on `module.__typename`.
* `.env.example` — template for Contentful credentials.

---

## Quick start (3–5 minutes)

```bash
# 1. Copy the project locally and cd into it
cp .env.example .env
# edit .env -> set your Contentful credentials:
# CONTENTFUL_SPACE_ID=your_space_id
# CONTENTFUL_ACCESS_TOKEN=your_delivery_access_token

# 2. Install dependencies
npm install

# 3. Clean and run Gatsby
npx gatsby clean
npm run develop

# 4. Open GraphiQL for inspection:
# http://localhost:8000/___graphql
```

Use the **Content Delivery API (CDA)** token for local dev read access. If you run scripts that create entries, use the Management API token for those scripts (noted separately).

---

## Contentful content model — create & publish these

API IDs used in this example (adapt if your models differ):

* `page` (Page)

  * `title` (Short text)
  * `slug` (Short text)
  * `modules` (References — allow multiple — references entries)
* `hero` (Hero)

  * `heading`, `subheading` (Short text)
  * `backgroundImage` (Media/Asset)
* `card` (Card)

  * `title` (Short text)
  * `body` (Long text)
  * `image` (Asset, optional)
* `cards` (Cards)

  * `title` (Short text)
  * `cards` (References to `card`, allow multiple)
* `gallery` (Gallery)

  * `images` (References to Assets, allow multiple)

**Steps**

1. Create the content types (or adapt your existing ones).
2. Create and **publish**:

   * one `hero` entry,
   * two `card` entries,
   * one `cards` entry referencing those cards,
   * one `gallery` entry with assets (optional),
   * one `page` entry with `slug: home` and add the module entries to `modules` in the desired order.
3. Publish the `page` entry.

---

## Core GraphiQL queries to run (copy/paste)

1. Inspect `ContentfulPage` fields:

```graphql
{
  __type(name: "ContentfulPage") {
    name
    fields {
      name
      type { kind name ofType { kind name } }
    }
  }
}
```

2. Confirm pages exist:

```graphql
{
  allContentfulPage(limit: 5) {
    nodes { id slug title }
  }
}
```

3. Query `home` page modules (this matches `src/pages/index.js`):

```graphql
{
  contentfulPage(slug: { eq: "home" }) {
    title
    modules {
      __typename
      ... on ContentfulHero {
        id
        heading
        subheading
        backgroundImage { title url }
      }
      ... on ContentfulCards {
        id
        title
        cards { title body }
      }
      ... on ContentfulGallery {
        id
        images { title url }
      }
    }
  }
}
```

Expected: `modules` is an array; each item shows `__typename` and only the fields requested for that concrete type.

---

## Troubleshooting (fast)

* **`modules` missing from schema**

  * Confirm the Page content type has a references field with API ID `modules` (or update `gatsby-node.js` to match your field name).
  * Ensure referenced entries (hero/cards/gallery) are **published**; unpublished entries do not become Gatsby nodes.
  * After any Contentful or `gatsby-node.js` change run: `npx gatsby clean && npm run develop`.

* **Env vars errors**

  * Ensure `.env` exists and `CONTENTFUL_SPACE_ID` / `CONTENTFUL_ACCESS_TOKEN` are set. `gatsby-config.js` in this repo loads `.env` with `dotenv`.

* **Images not showing**

  * Confirm asset fields are populated and assets published in Contentful. In GraphiQL request `backgroundImage { title url }` to validate assets exist.

---

## Learning checklist (do these)

1. Create/publish entries in Contentful, then run the `home` query and inspect `__typename` values.
2. Modify `gatsby-node.js` types (add/remove fields); run `npx gatsby clean` and see how GraphiQL changes.
3. Rename the modules field in Contentful (or change the API ID) and observe how a schema mismatch breaks queries — then fix it by updating `gatsby-node.js`.
4. Try adding a new module type (e.g., `Callout`), declare it in `gatsby-node.js`, publish an entry, and update fragments — watch the result.

---

## Notes & philosophy

This repo is a tiny laboratory: change things, break things, and learn the mapping between declared schema + fragments and the real runtime JSON that Gatsby returns. The best way to grok GraphQL with Contentful is iterative: tweak a type, publish an entry, run `gatsby clean`, and watch GraphiQL.

Happy fragment-hunting — precision beats guesswork.

## Contentful

Create a `Page` content type with a `slug` field and a `modules` (multiple references) field that includes entries of types matching: `Hero`, `Cards`, `Gallery`. Publish entries.

This example is intentionally minimal for learning purposes.
