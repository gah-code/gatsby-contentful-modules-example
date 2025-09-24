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
      # Declare the modules field as an array of Module and link to nodes
      modules: [Module] @link
    }

    type ContentfulHero implements Node & Module {
      id: ID!
      order: Int
      heading: String
      subheading: String
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
