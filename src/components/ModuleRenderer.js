import React from 'react';
import Hero from './Hero';
import Cards from './Cards';
import Gallery from './Gallery';

export default function ModuleRenderer({ module }) {
  switch (module.__typename) {
    case 'ContentfulHero':
      return <Hero {...module} />;
    case 'ContentfulCards':
      return <Cards {...module} />;
    case 'ContentfulGallery':
      return <Gallery {...module} />;
    default:
      return null;
  }
}
