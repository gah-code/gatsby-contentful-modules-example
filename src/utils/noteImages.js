export const buildSlugFromTitle = (title) =>
  typeof title === 'string'
    ? title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
    : '';

export const pickNoteImageAsset = (note) => {
  if (!note) return null;
  if (note.image && note.image.gatsbyImageData) {
    return note.image;
  }

  const references = note?.contentBody?.references;
  if (!Array.isArray(references)) return null;

  return (
    references.find(
      (ref) =>
        ref?.__typename === 'ContentfulAsset' && ref?.gatsbyImageData != null,
    ) || null
  );
};

export const describeImageDebugInfo = (note) => ({
  directImage: note?.image
    ? { id: note.image.contentful_id || note.image.id, hasImageData: Boolean(note.image.gatsbyImageData) }
    : null,
  referencedAssets: Array.isArray(note?.contentBody?.references)
    ? note.contentBody.references
        .filter((ref) => ref?.__typename === 'ContentfulAsset')
        .map((asset) => ({
          id: asset.contentful_id || asset.id,
          hasImageData: Boolean(asset?.gatsbyImageData),
        }))
    : [],
});
