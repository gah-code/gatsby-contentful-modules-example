// import * as React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';

// export default function TestNote() {
//   const data = useStaticQuery(graphql`
//     query GetAtomicDesignNoteFlat {
//       contentfulNote(title: { eq: "Atomic Design" }) {
//         id
//         title
//         description # now a String (flattened)
//         featured
//         content # now JSON (flattened)
//         image {
//           gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 800)
//           title
//         }
//         updatedAt(formatString: "YYYY-MM-DD")
//       }
//     }
//   `);

//   const note = data?.contentfulNote;
//   if (!note) {
//     return (
//       <div style={{ padding: 20, border: '1px dashed gray', borderRadius: 12 }}>
//         <strong>Note not found:</strong> Create/publish a Note titled "Atomic
//         Design".
//       </div>
//     );
//   }

//   const img = getImage(note.image);
//   const prettyJSON =
//     note.content != null ? JSON.stringify(note.content, null, 2) : null;

//   return (
//     <article
//       style={{
//         padding: '2rem',
//         borderRadius: 16,
//         background: '#0f172a',
//         color: 'white',
//         maxWidth: 900,
//         margin: '2rem auto',
//       }}
//     >
//       {img && (
//         <GatsbyImage
//           image={img}
//           alt={note.image?.title || note.title}
//           style={{ borderRadius: 12, marginBottom: 24 }}
//         />
//       )}
//       <header style={{ marginBottom: 12 }}>
//         <h2 style={{ margin: 0 }}>{note.title}</h2>
//         {note.description && (
//           <p style={{ opacity: 0.85, marginTop: 8 }}>{note.description}</p>
//         )}
//         {note.updatedAt && (
//           <small style={{ opacity: 0.7 }}>Updated {note.updatedAt}</small>
//         )}
//         {note.featured && (
//           <div style={{ marginTop: 8, fontWeight: 700, color: 'limegreen' }}>
//             ✅ Featured
//           </div>
//         )}
//       </header>

//       {prettyJSON && (
//         <section style={{ marginTop: 16 }}>
//           <h3 style={{ fontSize: 16, opacity: 0.9 }}>Content JSON</h3>
//           <pre
//             style={{
//               background: '#111827',
//               padding: 16,
//               borderRadius: 12,
//               overflowX: 'auto',
//             }}
//           >
//             {prettyJSON}
//           </pre>
//         </section>
//       )}
//     </article>
//   );
// }
import * as React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function TestNote() {
  const data = useStaticQuery(graphql`
    query GetAtomicDesignNote {
      contentfulNote(title: { eq: "Atomic Design" }) {
        id
        title
        slug
        description
        featured
        image {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 800)
          title
        }
        featuredImage {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 800)
          title
        }
      }
    }
  `);

  const note = data?.contentfulNote;
  if (!note) return null;

  const imageAsset = note.image || note.featuredImage;
  const image = imageAsset ? getImage(imageAsset) : null;
  const slug = note.slug
    ? note.slug
    : note.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

  return (
    <article
      style={{
        padding: '2rem',
        borderRadius: 16,
        background: '#0f172a',
        color: 'white',
        maxWidth: 900,
        margin: '2rem auto',
      }}
    >
      <Link
        to={`/notes/${slug}/`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        {image && (
          <GatsbyImage
            image={image}
            alt={imageAsset?.title || note.title}
            style={{ borderRadius: 12, marginBottom: 24 }}
          />
        )}
        <h2 style={{ marginBottom: 8 }}>{note.title}</h2>
        {note.description && (
          <p style={{ opacity: 0.85 }}>{note.description}</p>
        )}
        <p
          style={{
            marginTop: 12,
            fontWeight: 'bold',
            color: 'lightgreen',
          }}
        >
          View full note →
        </p>
      </Link>
    </article>
  );
}
