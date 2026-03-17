'use client';

interface VideoPlayerProps {
  youtubeId: string;
  title: string;
}

export default function VideoPlayer({ youtubeId, title }: VideoPlayerProps) {
  return (
    <div className="glass-effect rounded-2xl p-6 mb-6">
      <h4 className="text-lg font-semibold mb-4 text-gray-900">{title}</h4>
      <div className="aspect-video rounded-xl overflow-hidden shadow-2xl">
        <iframe
          className="w-full h-full"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

