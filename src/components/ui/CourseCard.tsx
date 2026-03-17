'use client';

import Link from 'next/link';
import { Course } from '@/lib/courses';
import { useAuth } from '@/components/ui/AuthContext';
import { enrollCourse } from '@/lib/auth';
import { isEnrolled } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [localIsEnrolled, setLocalIsEnrolled] = useState(false);

  useEffect(() => {
    if (user) {
      setLocalIsEnrolled(isEnrolled(user.email, course.id));
    } else {
      setLocalIsEnrolled(false);
    }
  }, [user, course.id]);

  const handleEnroll = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    enrollCourse(user.email, course.id);
    setLocalIsEnrolled(true);
  };

  return (
    <div className="course-card max-w-sm flex-shrink-0">
      <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl mb-6 flex items-center justify-center">
        <span className="text-white text-3xl font-bold">📚</span>
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{course.title}</h3>
      <p className="text-gray-600 mb-6 line-clamp-3">{course.description}</p>
      {localIsEnrolled ? (
        <Link href={`/learn/${course.id}`} className="btn-enroll">
          Start Learning →
        </Link>
      ) : (
        <button onClick={handleEnroll} className="btn-enroll">
          Enroll Now
        </button>
      )}
    </div>
  );
}

