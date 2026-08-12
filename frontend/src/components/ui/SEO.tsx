import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  type?: string;
  image?: string;
  url?: string;
}

export const SEO: React.FC<SEOProps> = ({ 
  title = 'NilePixel Technologies | Software Development & AI Solutions', 
  description = 'NilePixel Technologies is a leading software development agency in Ethiopia specializing in enterprise web applications, AI solutions, Telegram bots, and mobile engineering.', 
  type = 'website', 
  image = 'https://i.imgur.com/0Oq81dm.jpeg', 
  url = 'https://nilepixel.et' 
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "NilePixel Technologies",
    "url": "https://nilepixel.et",
    "logo": "https://nilepixel.et/image.png",
    "sameAs": [
      "https://www.linkedin.com/company/nilepixel-technologies",
      "https://t.me/NilePixelTech",
      "https://web.facebook.com/share/p/1CqWyP3rUF/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "email": "contact@nilepixel.et",
      "availableLanguage": ["English", "Amharic"]
    }
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};
