import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';

// Type definitions
interface Post {
  properties?: {
    Nombre?: {
      title?: { plain_text?: string }[];
    };
  };
  icon?: { type?: string; emoji?: string };
  cover?: { type?: string; external?: { url: string }; file?: { url: string } };
}

interface CoverImageProps {
  post: Post;
  className?: string;
}

const CoverImage = ({ post, className = "" }: CoverImageProps) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const title = post.properties?.Nombre?.title?.[0]?.plain_text || 'Untitled';
  const icon = post.icon;

  // Get cover image URL
  const getCoverImage = (): string | null => {
    if (post.cover?.type === 'external') {
      return post.cover.external?.url || null;
    } else if (post.cover?.type === 'file') {
      return post.cover.file?.url || null;
    }
    return null;
  };

  const coverImage = getCoverImage();

  // Generate gradient based on title
  const generateGradient = (text: string): string => {
    const colors = [
      'from-blue-500 to-purple-600',
      'from-green-400 to-blue-500',
      'from-purple-500 to-pink-500',
      'from-orange-400 to-red-500',
      'from-teal-400 to-blue-500',
      'from-indigo-500 to-purple-600',
      'from-pink-400 to-red-500',
      'from-yellow-400 to-orange-500'
    ];
    
    const hash = text.split('').reduce((a: number, b: string) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
    
    return colors[Math.abs(hash) % colors.length];
  };

  const gradientClass = generateGradient(title);

  return (
    <div className={`relative h-48 overflow-hidden rounded-t-2xl ${className}`}>
      {/* Cover Image */}
      {coverImage && !imageError ? (
        <>
          <img
            src={coverImage}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? 'scale-100 opacity-100' : 'scale-110 opacity-0'
            } group-hover:scale-105`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      ) : (
        /* Fallback Gradient Background */
        <div className={`w-full h-full bg-gradient-to-br ${gradientClass} flex items-center justify-center`}>
          <div className="text-center text-white">
            {icon?.type === 'emoji' ? (
              <div className="text-4xl mb-2">{icon.emoji}</div>
            ) : (
              <PhotoIcon className="w-12 h-12 mx-auto mb-2 opacity-80" />
            )}
            <div className="text-sm font-medium opacity-90">{title}</div>
          </div>
        </div>
      )}

      {/* Icon overlay */}
      {icon?.type === 'emoji' && (
        <div className="absolute top-4 right-4 text-2xl bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
          {icon.emoji}
        </div>
      )}

      {/* Loading skeleton */}
      {coverImage && !imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        </div>
      )}

      {/* Hover overlay with title */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-end">
        <div className="w-full p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-lg line-clamp-2">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default CoverImage; 