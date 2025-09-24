import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

export default function Cards({ title, cards = [] }) {
  return (
    <section>
      <h3>{title}</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
        {cards.map((c, i) => {
          const img = getImage(c.image);
          return (
            <article key={i} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
              {img && <GatsbyImage image={img} alt={c.image?.title || c.title} />}
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
