'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let step = 0;
    const colors = [
      ['#0f0c29', '#302b63', '#24243e'],
      ['#1a1a2e', '#16213e', '#0f3460'],
      ['#0d0d2b', '#1b1464', '#2e0249'],
      ['#0f2027', '#203a43', '#2c5364'],
      ['#0f0c29', '#302b63', '#24243e'],
    ];
    const interval = setInterval(() => {
      step = (step + 1) % (colors.length - 1);
      const [a, b, c] = colors[step];
      el.style.background = `linear-gradient(135deg, ${a}, ${b}, ${c})`;
      el.style.transition = 'background 3s ease';
    }, 3000);
    const [a, b, c] = colors[0];
    el.style.background = `linear-gradient(135deg, ${a}, ${b}, ${c})`;
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="relative h-screen overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 space-y-8 lg:pr-12">
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-white via-blue-100 to-indigo-100 bg-clip-text text-transparent">
              Master Data Science & Tech Skills
              <span className="block text-4xl lg:text-6xl bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mt-4">
                Launch Your Career Today
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-300 max-w-2xl leading-relaxed">
              Comprehensive courses in AI/ML, Python, Cloud Computing, DevOps, AWS & more from industry experts. Transform your future with cutting-edge skills.
            </p>

            <Link 
              href="/courses"
              className="group inline-flex items-center bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-6 px-12 rounded-2xl text-xl shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500"
            >
              <span>Get Started</span>
              <svg className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-white/20">
              <div className="group p-4 hover:scale-105 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-white mb-1">10K+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Students</div>
              </div>
              <div className="group p-4 hover:scale-105 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-white mb-1">50+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Courses</div>
              </div>
              <div className="group p-4 hover:scale-105 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-white mb-1">20+</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Mentors</div>
              </div>
              <div className="group p-4 hover:scale-105 transition-all duration-300">
                <div className="text-4xl lg:text-5xl font-black text-white mb-1">95%</div>
                <div className="text-gray-300 text-sm uppercase tracking-wider">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 flex justify-end opacity-50">
            <div className="w-80 h-80 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

