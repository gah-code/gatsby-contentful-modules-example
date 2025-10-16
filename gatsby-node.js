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

    type ContentfulNoteContentBody {
      raw: String
    }

    type ContentfulNote implements Node {
      slug: String
      title: String
      description: String
      featured: Boolean
      image: ContentfulAsset @link
      seoTitle: String @proxy(from: "SEO Title")
      seoDescription: String @proxy(from: "SEO Description")
      contentBody: ContentfulNoteContentBody
    }
  `);
};

// --- Create dynamic pages for Notes
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allContentfulNote {
        nodes {
          id
          title
          slug
          updatedAt(formatString: "YYYY-MM-DD HH:mm")
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('Error loading Contentful notes', result.errors);
    return;
  }

  const notes = result.data.allContentfulNote.nodes;

  reporter.info(`Creating ${notes.length} Contentful note pages`);

  notes.forEach((note) => {
    const slug =
      note.slug ||
      (note.title
        ? note.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '')
        : '');

    reporter.verbose(
      `• Note ${note.id} (${note.title || 'Untitled'}) → /notes/${slug}/ (updated ${
        note.updatedAt || 'unknown'
      })`,
    );

    createPage({
      path: `/notes/${slug}/`,
      component: path.resolve('./src/templates/note.js'),
      context: { id: note.id, slug },
    });
  });
};
