import React from 'react';

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="w-full h-full">
      <div className="aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          className="w-full h-full rounded-lg shadow-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h2 className="mt-4 text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}
