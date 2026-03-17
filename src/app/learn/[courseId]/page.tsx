'use client';

import { getCourseById, Video } from '@/lib/courses';
import { useAuth } from '@/components/ui/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { isEnrolled } from '@/lib/auth';
import Link from 'next/link';

interface Params {
  params: {
    courseId: string;
  };
}

export default function LearnPage({ params }: Params) {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [course, setCourse] = useState<any>(null);

  useEffect(() => {
    const courseData = getCourseById(params.courseId);
    if (!courseData) {
      router.push('/courses');
      return;
    }
    setCourse(courseData);

    // Set default video to first video of first section
    if (courseData.sections[0]?.videos[0]) {
      setSelectedVideo(courseData.sections[0].videos[0]);
    }

    if (!user) {
      router.push('/login');
    } else if (!isEnrolled(user.email, params.courseId)) {
      router.push('/courses');
    }
  }, [params.courseId, user, router]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  if (!course) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4 gap-0 bg-gray-50">
      <Sidebar 
        sections={course.sections} 
        selectedVideo={selectedVideo}
        onVideoSelect={handleVideoSelect}
        className="col-span-1" 
      />
      
      <div className="col-span-1 lg:col-span-3 p-12 max-w-6xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Courses
        </Link>

        <div className="glass-effect rounded-3xl p-12 shadow-2xl">
          <div className="flex items-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mr-6 flex-shrink-0">
              <span className="text-2xl">🎓</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl font-bold text-gray-900 mb-2 truncate">{course.title}</h1>
              <p className="text-xl text-gray-600">Welcome to your learning journey</p>
            </div>
          </div>

          {selectedVideo && (
            <VideoPlayer 
              youtubeId={selectedVideo.youtubeId} 
              title={selectedVideo.title} 
            />
          )}
        </div>
      </div>
    </div>
  );
}

