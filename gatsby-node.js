exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    interface Module {
      id: ID!
      order: Int
    }

    """
    Flatten Contentful Note fields so they query as simple scalars.
    """
    type ContentfulNote implements Node {
      description: String
      content: JSON
    }


    type ContentfulPage implements Node {
      id: ID!
      title: String
      slug: String
      description: String
      # Declare the modules field as an array of Module and link to nodes
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
  `);
};
