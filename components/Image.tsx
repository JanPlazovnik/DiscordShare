/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

export interface ImageProps {
    src: string;
    alt: string;
    className?: string,
    fallback?: string
}

export default function Image({ src, alt, className, fallback }: ImageProps) {
    const [image, setImage] = useState(src);

    function onError() {
        if (fallback) setImage(fallback);
    }

    return (
        <img
            src={image || fallback}
            alt={alt}
            className={className}
            onError={onError}
        />
    );
}