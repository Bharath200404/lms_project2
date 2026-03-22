'use client';

import { getCourseById, Video } from '@/lib/courses';
import { useAuth } from '@/components/ui/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/ui/Sidebar';
import VideoPlayer from '@/components/ui/VideoPlayer';
import { isEnrolled } from '@/lib/auth';
import Link from 'next/link';

type LearnPageProps = {
  params: Promise<{ courseId: string }>;
};

export default function LearnPage({ params }: LearnPageProps) {
  const { user } = useAuth();
  const router = useRouter();

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [courseId, setCourseId] = useState<string>('');

  useEffect(() => {
    params.then(({ courseId }) => {
      setCourseId(courseId);

      if (!user) {
        router.push('/login');
        return;
      }

      if (!isEnrolled(user.email, courseId)) {
        router.push('/courses');
        return;
      }

      const courseData = getCourseById(courseId);

      if (!courseData) {
        router.push('/courses');
        return;
      }

      setCourse(courseData);

      if (courseData.sections[0]?.videos[0]) {
        setSelectedVideo(courseData.sections[0].videos[0]);
      }
    });
  }, [params, user, router]);

  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  if (!course)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-4 bg-gray-50">

      <Sidebar
        sections={course.sections}
        selectedVideo={selectedVideo}
        onVideoSelect={handleVideoSelect}
        className="col-span-1"
      />

      <div className="lg:col-span-3 p-12 max-w-6xl mx-auto">

        <Link
          href="/courses"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          ← Back to Courses
        </Link>

        <div className="glass-effect rounded-3xl p-12 shadow-2xl">

          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {course.title}
          </h1>

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