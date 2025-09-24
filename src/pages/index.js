import React from 'react';
import { graphql } from 'gatsby';
import ModuleRenderer from '../components/ModuleRenderer';

export default function HomePage({ data }) {
  const page = data?.contentfulPage;
  if (!page)
    return (
      <div>
        No page found — create a Contentful Page with slug "home" and modules.
      </div>
    );

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      <h1>{page.title}</h1>
      {page.modules?.map((module) => (
        <div key={module.id} style={{ margin: '24px 0' }}>
          <ModuleRenderer module={module} />
        </div>
      ))}
    </main>
  );
}

export const query = graphql`
  query PageModules {
    contentfulPage(slug: { eq: "home" }) {
      title
      modules {
        __typename
        ... on ContentfulHero {
          id
          heading
          subheading
          backgroundImage {
            title
            gatsbyImageData(width: 1200)
          }
        }
        ... on ContentfulCards {
          id
          title
          cards {
            title
            body
            image {
              title
              gatsbyImageData(width: 600)
            }
          }
        }
        ... on ContentfulGallery {
          id
          images {
            title
            gatsbyImageData(width: 800)
          }
        }
      }
    }
  }
`;

// src/pages/index.js
// import React from 'react';
// import { graphql } from 'gatsby';
// import ModuleRenderer from '../components/ModuleRenderer';

// /**
//  * Toggle this to true to force local mock data for testing without Contentful.
//  * You can also set via env var or remove after you finish testing.
//  */
// const USE_MOCK = true;

// const mockPage = {
//   title: 'Mock Home',
//   modules: [
//     {
//       __typename: 'ContentfulHero',
//       id: 'mock-hero-1',
//       heading: 'Welcome, traveler (mock)',
//       subheading: 'This is mock content to test the Hero component.',
//       // backgroundImage: null -> component handles missing image
//       backgroundImage: null,
//     },
//     {
//       __typename: 'ContentfulCards',
//       id: 'mock-cards-1',
//       title: 'Featured (mock)',
//       cards: [
//         {
//           title: 'Card Alpha',
//           body: 'Short body for card alpha.',
//           image: null,
//         },
//         { title: 'Card Beta', body: 'Short body for card beta.', image: null },
//       ],
//     },
//     {
//       __typename: 'ContentfulGallery',
//       id: 'mock-gallery-1',
//       // images can be empty or contain asset-like objects if you wire images later
//       images: [],
//     },
//   ],
// };

// export default function HomePage({ data }) {
//   // prefer real data when present, otherwise fallback to mockPage (if enabled)
//   const page =
//     !USE_MOCK && data?.contentfulPage ? data.contentfulPage : mockPage;

//   if (!page)
//     return (
//       <div>
//         No page found — create a Contentful Page with slug "home" and modules.
//       </div>
//     );

//   return (
//     <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
//       <h1>{page.title}</h1>
//       {page.modules?.map((module) => (
//         <div key={module.id} style={{ margin: '24px 0' }}>
//           <ModuleRenderer module={module} />
//         </div>
//       ))}
//     </main>
//   );
// }

// export const query = graphql`
//   query PageModules {
//     contentfulPage(slug: { eq: "home" }) {
//       title
//       modules {
//         __typename
//         ... on ContentfulHero {
//           id
//           heading
//           subheading
//           backgroundImage {
//             title
//             gatsbyImageData(width: 1200)
//           }
//         }
//         ... on ContentfulCards {
//           id
//           title
//           cards {
//             title
//             body
//             image {
//               title
//               gatsbyImageData(width: 600)
//             }
//           }
//         }
//         ... on ContentfulGallery {
//           id
//           images {
//             title
//             gatsbyImageData(width: 800)
//           }
//         }
//       }
//     }
//   }
// `;
