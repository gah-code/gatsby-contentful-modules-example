import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function Gallery({ images = [] }) {
  return (
    <section>
      <h3>Gallery</h3>
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
        {images.map((imgNode, i) => {
          const img = getImage(imgNode);
          return (
            <div key={i} style={{ minWidth: 240, borderRadius: 8, overflow: 'hidden' }}>
              {img && <GatsbyImage image={img} alt={imgNode?.title || `img-${i}`} />}
            </div>
          );
        })}
      </div>
    </section>
  );
}
