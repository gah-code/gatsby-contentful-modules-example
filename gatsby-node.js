const path = require('path');

// --- Schema customization
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    interface Module {
      id: ID!
      order: Int
    }

    type ContentfulPage implements Node {
      id: ID!
      title: String
      slug: String
      description: String
      modules: [Module] @link
    }

    type ContentfulHero implements Node & Module @dontInfer {
      id: ID!
      order: Int
      heading: String
      subheading: String
      description: String
      backgroundImage: ContentfulAsset @link
    }

    type ContentfulCards implements Node & Module {
      id: ID!
      order: Int
      title: String
      cards: [ContentfulCard]
    }

    type ContentfulCard {
      title: String
      body: String
      image: ContentfulAsset @link
    }

    type ContentfulGallery implements Node & Module {
      id: ID!
      order: Int
      images: [ContentfulAsset] @link
    }

    # Unified ContentfulNote type
  type ContentfulNote implements Node {
  slug: String
  title: String
  description: String
  featured: Boolean
  image: ContentfulAsset @link
  seoTitle: String @proxy(from: "SEO Title")
  seoDescription: String @proxy(from: "SEO Description")
}


  `);
};

// --- Create dynamic pages for Notes
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allContentfulNote {
        nodes {
          id
          title
          slug
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const notes = result.data.allContentfulNote.nodes;

  notes.forEach((note) => {
    const slug =
      note.slug ||
      note.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

    createPage({
      path: `/notes/${slug}/`,
      component: path.resolve('./src/templates/note.js'),
      context: { id: note.id, slug },
    });
  });
};
