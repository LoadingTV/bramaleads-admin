// src/app/projects/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Project {
  id: string;
  name: string;
  identifier: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get<Project[]>('/projects');
      setProjects(data);
    } catch (err) {
      alert('Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <main className="max-w-3xl mx-auto mt-16 px-6 py-10 bg-white shadow-sm rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">
          Projects
        </h1>
        <Link
          href="/projects/create"
          className="px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-100 hover:text-black border border-transparent hover:border-black transition font-medium"
        >
          Add Project
        </Link>
      </div>

      <div className="mb-6 text-lg text-gray-700">
        Total Projects: <span className="font-semibold">{projects.length}</span>
      </div>

      <ul className="space-y-4">
        {projects.map(project => (
          <li key={project.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition">
            <div className="font-medium text-gray-800">{project.name}</div>
            <div className="text-sm text-gray-600">Identifier: {project.identifier}</div>
            <div className="text-xs text-gray-500">Created: {new Date(project.created_at).toLocaleString()}</div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-center text-sm text-gray-600">
        <Link href="/" className="underline hover:text-black transition">
          Back to Home
        </Link>
      </p>
    </main>
  );
}
