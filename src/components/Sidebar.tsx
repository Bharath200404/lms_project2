import React from 'react';
import { Course, Section, Video } from '@/lib/courses';

interface SidebarProps {
  course: Course;
  selectedVideo: Video;
  onVideoSelect: (video: Video) => void;
}

export default function Sidebar({ course, selectedVideo, onVideoSelect }: SidebarProps) {
  return (
    <div className="h-full overflow-y-auto bg-white border-r border-gray-200 p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-900">{course.title}</h2>
      {course.sections.map((section: Section, sectionIndex: number) => (
        <div key={sectionIndex} className="mb-6">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">{section.title}</h3>
          <div className="space-y-2">
            {section.videos.map((video: Video, videoIndex: number) => (
              <button
                key={videoIndex}
                onClick={() => onVideoSelect(video)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  selectedVideo.youtubeId === video.youtubeId
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium">{video.title}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
