import { useEffect } from 'react';

export type User = {
  name: string;
  email: string;
  password: string; // In real app, hash this
};

export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User) => {
  if (typeof window === 'undefined') return;
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null) => {
  if (typeof window === 'undefined') return;
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  } else {
    localStorage.removeItem('currentUser');
  }
};

export const validateLogin = (email: string, password: string): User | null => {
  const users = getUsers();
  return users.find((u: User) => u.email === email && u.password === password) || null;
};

export const getEnrollments = (email: string): string[] => {
  if (typeof window === 'undefined') return [];
  const enrollmentsStr = localStorage.getItem('enrollments');
  const enrollments = enrollmentsStr ? JSON.parse(enrollmentsStr) : {};
  return enrollments[email] || [];
};

export const enrollCourse = (email: string, courseId: string) => {
  if (typeof window === 'undefined') return;
  const enrollmentsStr = localStorage.getItem('enrollments');
  const enrollments = enrollmentsStr ? JSON.parse(enrollmentsStr) : {};
  if (!enrollments[email]) enrollments[email] = [];
  if (!enrollments[email].includes(courseId)) {
    enrollments[email].push(courseId);
    localStorage.setItem('enrollments', JSON.stringify(enrollments));
  }
};

export const isEnrolled = (email: string, courseId: string): boolean => {
  return getEnrollments(email).includes(courseId);
};
