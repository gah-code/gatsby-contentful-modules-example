// // import * as React from 'react';
// // import { graphql } from 'gatsby';
// // import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// // export default function NoteTemplate({ data }) {
// //   const note = data.contentfulNote;
// //   const image = getImage(note.image);

// //   return (
// //     <main
// //       style={{
// //         fontFamily: 'system-ui, sans-serif',
// //         padding: 24,
// //         maxWidth: 900,
// //         margin: '0 auto',
// //       }}
// //     >
// //       {image && (
// //         <GatsbyImage
// //           image={image}
// //           alt={note.image?.title || note.title}
// //           style={{ borderRadius: 12, marginBottom: 24 }}
// //         />
// //       )}
// //       <h1 style={{ marginBottom: 12 }}>{note.title}</h1>
// //       {note.description && (
// //         <p style={{ opacity: 0.85, marginBottom: 24 }}>{note.description}</p>
// //       )}

// //       {note.content && (
// //         <pre
// //           style={{
// //             background: '#0f172a',
// //             color: 'white',
// //             padding: 16,
// //             borderRadius: 12,
// //             overflowX: 'auto',
// //           }}
// //         >
// //           {JSON.stringify(note.content, null, 2)}
// //         </pre>
// //       )}
// //     </main>
// //   );
// // }

// // export const query = graphql`
// //   query NoteById($id: String!) {
// //     contentfulNote(id: { eq: $id }) {
// //       id
// //       title
// //       description
// //       content
// //       image {
// //         gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 800)
// //         title
// //       }
// //     }
// //   }
// // `;

// import * as React from 'react';
// import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// export default function NoteTemplate({ data }) {
//   const note = data.contentfulNote;
//   const img = getImage(note.image);

//   const metaTitle = note.seoTitle || note.title;
//   const metaDesc = note.seoDescription || note.description;

//   return (
//     <main
//       style={{
//         fontFamily: 'system-ui, sans-serif',
//         padding: '2rem',
//         maxWidth: 900,
//         margin: '0 auto',
//       }}
//     >
//       {img && (
//         <GatsbyImage
//           image={img}
//           alt={note.image?.title || note.title}
//           style={{ borderRadius: 12, marginBottom: 24 }}
//         />
//       )}
//       <h1 style={{ marginBottom: 8 }}>{note.title}</h1>
//       {note.description && (
//         <p style={{ opacity: 0.8, marginBottom: 24 }}>{note.description}</p>
//       )}

//       {note.featured && (
//         <div style={{ marginBottom: 16, color: 'limegreen' }}>★ Featured</div>
//       )}

//       <section>
//         {note.content ? (
//           <pre
//             style={{
//               background: '#0f172a',
//               color: 'white',
//               padding: 16,
//               borderRadius: 12,
//               overflowX: 'auto',
//             }}
//           >
//             {JSON.stringify(note.content, null, 2)}
//           </pre>
//         ) : (
//           <em>No content provided.</em>
//         )}
//       </section>

//       {/* SEO metadata can later be passed into a <Seo /> component */}
//       <footer style={{ marginTop: 40, fontSize: 14, opacity: 0.6 }}>
//         SEO Title: {metaTitle} <br />
//         SEO Description: {metaDesc}
//       </footer>
//     </main>
//   );
// }

// export const query = graphql`
//   query NoteById($id: String!) {
//     contentfulNote(id: { eq: $id }) {
//       id
//       title
//       description
//       featured
//       content
//       seoTitle
//       seoDescription
//       image {
//         gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 1200)
//         title
//         url
//       }
//     }
//   }
// // `;
// import * as React from 'react';
// import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// export default function NoteTemplate({ data }) {
//   const note = data.contentfulNote;
//   // const image = getImage(note.image);
//   const image = getImage(note.featuredImage);

//   const doc = note.body ? JSON.parse(note.body.raw) : null;

//   return (
//     <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
//       {image && (
//         <GatsbyImage
//           image={image}
//           alt={note.featuredImage?.title || note.title}
//         />
//       )}
//       <h1>{note.title}</h1>

//       {note.description && (
//         <p style={{ opacity: 0.8, marginBottom: 24 }}>{note.description}</p>
//       )}

//       {doc && (
//         <div style={{ lineHeight: 1.6 }}>{documentToReactComponents(doc)}</div>
//       )}
//     </main>
//   );
// }

// export const query = graphql`
//   query NoteById($id: String!) {
//     contentfulNote(id: { eq: $id }) {
//       id
//       title
//       slug
//       description
//       featured
//       featuredImage: image {
//         gatsbyImageData(width: 1000, placeholder: BLURRED)
//         title
//       }

//       contentBody {
//         raw
//         references {
//           ... on ContentfulAsset {
//             contentful_id
//             __typename
//             title
//             gatsbyImageData(width: 800)
//           }
//         }
//       }
//     }
//   }
// `;

// import * as React from 'react';
// import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// export default function NoteTemplate({ data }) {
//   const note = data.contentfulNote;
//   // const image = getImage(note.featuredImage);
//   const image = getImage(note.image);

//   const doc = note.contentBody ? JSON.parse(note.contentBody.raw) : null;

//   return (
//     <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
//       {image && (
//         <GatsbyImage
//           image={image}
//           alt={note.image?.title || note.title}
//           style={{ borderRadius: 12, marginBottom: 24 }}
//         />
//       )}

//       <h1>{note.title}</h1>

//       {note.description && (
//         <p style={{ opacity: 0.8, marginBottom: 24 }}>{note.description}</p>
//       )}

//       {doc && (
//         <div style={{ lineHeight: 1.6 }}>{documentToReactComponents(doc)}</div>
//       )}
//     </main>
//   );
// }

// export const query = graphql`
//   query NoteById($id: String!) {
//     contentfulNote(id: { eq: $id }) {
//       id
//       title
//       slug
//       description
//       image
//       featured
//       featuredImage {
//         gatsbyImageData(width: 1000, placeholder: BLURRED)
//         title
//       }
//       contentBody {
//         raw
//         featuredImage
//       }
//     }
//   }
// // `;

// import * as React from 'react';
// import { graphql } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

// export default function NoteTemplate({ data }) {
//   const note = data?.contentfulNote;

//   // Debug log
//   React.useEffect(() => {
//     console.log('🧩 Note data:', note);
//   }, [note]);

//   // Extract image safely
//   const image = note?.image ? getImage(note.image) : null;

//   // Parse rich text
//   const doc =
//     note?.contentBody && note.contentBody.raw
//       ? JSON.parse(note.contentBody.raw)
//       : null;

//   return (
//     <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
//       {/* Image section */}
//       {image ? (
//         <GatsbyImage
//           image={image}
//           alt={note.image?.title || note.title}
//           style={{ borderRadius: 12, marginBottom: 24 }}
//         />
//       ) : (
//         <p style={{ color: '#888' }}>
//           ⚠️ No image found or image not published.
//         </p>
//       )}

//       <h1>{note?.title || 'Untitled Note'}</h1>

//       {note?.description && (
//         <p style={{ opacity: 0.8, marginBottom: 24 }}>{note.description}</p>
//       )}

//       {doc ? (
//         <div style={{ lineHeight: 1.6 }}>{documentToReactComponents(doc)}</div>
//       ) : (
//         <p style={{ color: '#888' }}>⚠️ No content available.</p>
//       )}
//     </main>
//   );
// }
import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function NoteTemplate({ data }) {
  const note = data?.contentfulNote;

  React.useEffect(() => {
    console.log('🧩 Full note data:', note);
  }, [note]);

  // Safely get image data
  const image = note?.image ? getImage(note.image) : null;

  // Parse rich text
  const doc =
    note?.contentBody && note.contentBody.raw
      ? JSON.parse(note.contentBody.raw)
      : null;

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      {image ? (
        <GatsbyImage
          image={image}
          alt={note.image?.title || note.title}
          style={{ borderRadius: 12, marginBottom: 24 }}
        />
      ) : (
        <p style={{ color: '#888' }}>
          ⚠️ Image missing or not returned by GraphQL.
        </p>
      )}

      {!image && (
        <pre style={{ background: '#222', color: 'white', padding: 16 }}>
          {JSON.stringify(note.image, null, 2)}
        </pre>
      )}

      <h1>{note?.title || 'Untitled Note'}</h1>

      {note?.description && (
        <p style={{ opacity: 0.8, marginBottom: 24 }}>{note.description}</p>
      )}

      {doc ? (
        <div style={{ lineHeight: 1.6 }}>{documentToReactComponents(doc)}</div>
      ) : (
        <p style={{ color: '#888' }}>⚠️ No Rich Text content available.</p>
      )}
    </main>
  );
}

export const query = graphql`
  query NoteById($id: String!) {
    contentfulNote(id: { eq: $id }) {
      id
      title
      slug
      description
      featured
      image {
        gatsbyImageData(width: 1000, placeholder: BLURRED)
        title
        url
      }
      contentBody {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            gatsbyImageData(width: 800)
            gatsbyImage
            gatsbyImageData
            id
          }
        }
      }
    }
  }
`;
