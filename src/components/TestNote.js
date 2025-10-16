import * as React from 'react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import {
  buildSlugFromTitle,
  pickNoteImageAsset,
  describeImageDebugInfo,
} from '../utils/noteImages';

const logNotePayload = (note) => {
  if (!note) return;

  const debugInfo = {
    id: note.id,
    title: note.title,
    slug: note.slug,
    description: note.description,
    featured: note.featured,
    imageDebug: describeImageDebugInfo(note),
  };

  console.groupCollapsed(
    `[TestNote] Loaded Contentful note: ${note.title || note.id || 'unknown'}`,
  );
  console.log(debugInfo);
  console.groupEnd();
};

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
          contentful_id
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 800)
          title
          url
        }
        contentBody {
          raw
          references {
            __typename
            ... on ContentfulAsset {
              contentful_id
              title
              description
              url
              gatsbyImageData(
                placeholder: BLURRED
                layout: CONSTRAINED
                width: 800
              )
            }
          }
        }
        featuredImage {
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, width: 800)
          title
        }
      }
    }
  `);

  const note = data?.contentfulNote;

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
