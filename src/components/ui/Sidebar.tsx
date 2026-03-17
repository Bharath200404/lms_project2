'use client';

import { Section, Video } from '@/lib/courses';

interface SidebarProps {
  sections: Section[];
  className?: string;
  selectedVideo: Video | null;
  onVideoSelect: (video: Video) => void;
}

export default function Sidebar({ sections, className, selectedVideo, onVideoSelect }: SidebarProps) {
  return (
    <div className={`lg:w-80 bg-white border-r border-gray-200 h-screen overflow-y-auto glass-effect ${className || ''}`}>
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Course Content
        </h2>
        {sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-900">{section.title}</h3>
            <div className="space-y-2">
              {section.videos.map((video, vIndex) => (
                <button
                  key={vIndex}
                  onClick={() => onVideoSelect(video)}
                  className={`w-full text-left p-3 rounded-lg transition-colors font-medium ${
                    selectedVideo?.youtubeId === video.youtubeId
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate">{video.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

