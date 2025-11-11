import { useEffect } from 'react';

interface AdBannerProps {
  slotId: string;
  format?: 'horizontal' | 'vertical' | 'square';
}

export function AdBanner({ slotId, format = 'horizontal' }: AdBannerProps) {
  useEffect(() => {
    // Cargar los anuncios de AdSense
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, [slotId]);

  const getDimensions = () => {
    switch (format) {
      case 'horizontal':
        return { width: '100%', minHeight: '90px' };
      case 'vertical':
        return { width: '100%', minHeight: '600px' };
      case 'square':
        return { width: '100%', minHeight: '300px' };
      default:
        return { width: '100%', minHeight: '90px' };
    }
  };

  return (
    <div style={getDimensions()}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-5441830338464595"
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

// Declarar el tipo global para adsbygoogle
declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}
