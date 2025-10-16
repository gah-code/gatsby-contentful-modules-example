import * as React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import {
  buildSlugFromTitle,
  pickNoteImageAsset,
  describeImageDebugInfo,
} from '../utils/noteImages';

const parseRichText = (note) => {
  if (!note?.contentBody?.raw) return null;

  try {
    return JSON.parse(note.contentBody.raw);
  } catch (error) {
    console.warn('[NoteTemplate] Failed to parse rich text JSON', error);
    return null;
  }
};

const logNote = (note) => {
  if (!note) return;

  const debug = {
    id: note.id,
    slug: note.slug || buildSlugFromTitle(note.title),
    title: note.title,
    description: note.description,
    featured: note.featured,
    seoTitle: note.seoTitle,
    seoDescription: note.seoDescription,
    updatedAt: note.updatedAt,
    imageDebug: describeImageDebugInfo(note),
    referenceCount: Array.isArray(note?.contentBody?.references)
      ? note.contentBody.references.length
      : 0,
  };

  console.groupCollapsed(
    `[NoteTemplate] Loaded note ${debug.slug || debug.id || 'unknown'}`,
  );
  console.log(debug);
  console.groupEnd();
};

export default function NoteTemplate({ data }) {
  const note = data?.contentfulNote;

  React.useEffect(() => {
    logNote(note);
  }, [note]);

  if (!note) {
    return (
      <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
        <p style={{ color: '#b91c1c' }}>
          ⚠️ No Contentful note was returned for this page.
        </p>
      </main>
    );
  }

  const imageAsset = pickNoteImageAsset(note);
  const image = imageAsset ? getImage(imageAsset) : null;
  const doc = parseRichText(note);

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', padding: 24 }}>
      {image ? (
        <GatsbyImage
          image={image}
          alt={imageAsset?.title || note.title}
          style={{ borderRadius: 12, marginBottom: 24 }}
        />
      ) : (
        <div style={{ marginBottom: 24 }}>
          <p style={{ color: '#888' }}>
            ⚠️ Image missing or not returned by GraphQL.
          </p>
          <pre
            style={{
              background: '#111827',
              color: 'white',
              padding: 16,
              borderRadius: 12,
              overflowX: 'auto',
            }}
          >
            {JSON.stringify(describeImageDebugInfo(note), null, 2)}
          </pre>
        </div>
      )}

      <h1 style={{ marginBottom: 12 }}>{note.title || 'Untitled Note'}</h1>
      {note.description && (
        <p style={{ opacity: 0.8, marginBottom: 24 }}>{note.description}</p>
      )}
      {note.featured && (
        <div style={{ marginBottom: 16, color: 'limegreen' }}>★ Featured</div>
      )}

      {doc ? (
        <div style={{ lineHeight: 1.6 }}>{documentToReactComponents(doc)}</div>
      ) : (
        <p style={{ color: '#888' }}>⚠️ No Rich Text content available.</p>
      )}

      <footer style={{ marginTop: 40, fontSize: 14, opacity: 0.7 }}>
        <strong>SEO Title:</strong> {note.seoTitle || '—'}
        <br />
        <strong>SEO Description:</strong> {note.seoDescription || '—'}
        <br />
        <strong>Updated:</strong> {note.updatedAt || '—'}
      </footer>
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
      seoTitle
      seoDescription
      updatedAt(formatString: "YYYY-MM-DD")
      image {
        contentful_id
        gatsbyImageData(width: 1200, placeholder: BLURRED)
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
            gatsbyImageData(width: 1200, placeholder: BLURRED)
          }
        }
      }
    }
  }
`;
