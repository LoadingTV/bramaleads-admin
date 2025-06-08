// src/app/projects/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { api } from '@/lib/api';

interface ProjectData {
  name: string;
  identifier: string;
}

interface Project {
  id: string;
  name: string;
  identifier: string;
  created_at: string;
}

interface ProjectError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

const inputClass =
  'w-full px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-gray-700 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition';

export default function ProjectsPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<ProjectData>();
  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    try {
      const { data } = await api.get<Project[]>('/projects');
      setProjects(data);
    } catch (error) {
      console.error('Failed to load projects:', error);
      alert('Failed to load projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const onSubmit = async (data: ProjectData) => {
    try {
      await api.post('/projects', data);
      alert('Project created successfully');
      reset();
      fetchProjects();
    } catch (error: unknown) {
      const err = error as ProjectError;
      alert(err.response?.data?.message || 'Failed to create project');
    }
  };

  return (
    <main className="max-w-xl mx-auto mt-16 px-6 py-10 bg-white shadow-sm rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-semibold text-gray-900 mb-8 tracking-tight">
        Create Project
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mb-10">
        <input
          placeholder="Project Name"
          {...register('name', { required: 'Project name is required' })}
          className={inputClass}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          placeholder="Identifier"
          {...register('identifier', { required: 'Identifier is required' })}
          className={inputClass}
        />
        {errors.identifier && <p className="text-red-500 text-sm">{errors.identifier.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-4 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-100 hover:text-black border border-transparent hover:border-black transition text-sm font-medium"
        >
          {isSubmitting ? 'Creating…' : 'Create Project'}
        </button>
      </form>

      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        Existing Projects
      </h2>
      <ul className="space-y-2">
        {projects.map(project => (
          <li key={project.id} className="p-4 bg-gray-50 rounded-xl border border-gray-200">
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