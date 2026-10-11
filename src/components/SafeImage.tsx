'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

const DEFAULT_FALLBACK = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80';

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function SafeImage({
  src,
  fallbackSrc = DEFAULT_FALLBACK,
  alt,
  className = '',
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || 'Jammu Heritage Landmark'}
      unoptimized
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      className={className}
    />
  );
}
