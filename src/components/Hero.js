import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function Hero({
  heading,
  subheading,
  backgroundImage,
  description,
}) {
  const img = getImage(backgroundImage);
  return (
    <section
      style={{
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
      }}
    >
      {img && (
        <GatsbyImage
          image={img}
          alt={backgroundImage?.title || 'hero'}
          style={{ height: 280 }}
        />
      )}
      <div style={{ padding: 16 }}>
        {heading && <h2>{heading}</h2>}
        {subheading && <p>{subheading}</p>}
        {description && <p>{description}</p>}
      </div>
    </section>
  );
}
