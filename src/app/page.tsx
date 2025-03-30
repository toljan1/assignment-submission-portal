'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { IAssignmentsDataResponse, IAssignmentsErrorResponse } from '@/types/Assignments';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Email must be a valid email address'),
  assignment_description: z.string().min(10, 'Assignment description must be at least 10 characters'),
  github_repo_url: z.string().url('GitHub repository URL must be a valid URL'),
  candidate_level: z.string().min(1, 'Candidate level is required'),
});

export default function Home() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const router = useRouter();
  const [levels, setLevels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    axios.get('https://tools.qa.ale.ai/api/tools/candidates/levels')
      .then(response => setLevels(response.data.levels))
      .catch(() => setLevels([]))
      .finally(() => setLoading(false));
  }, []);
  
  const onSubmit = async (data: IAssignmentsDataResponse) => {
    try {
      await axios.post('https://tools.qa.ale.ai/api/tools/candidates/assignments', data);
      router.push(`/thank-you?name=${encodeURIComponent(data.name)}&email=${encodeURIComponent(data.email)}&level=${encodeURIComponent(data.candidate_level)}`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.errors) {
        const errors: IAssignmentsErrorResponse = error.response.data.errors;
        Object.entries(errors).forEach(([key, message]) => {
          setError(key as keyof typeof data, { message: message as string });
        });
      }
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-slate-900">Assignment Submission</h1>
        <input {...register('name')} placeholder="Name" className="w-full p-2 border rounded mb-2 text-slate-900" />
        <p className="text-red-500 text-sm">{errors.name?.message}</p>
        
        <input {...register('email')} placeholder="Email" className="w-full p-2 border rounded mb-2 text-slate-900" />
        <p className="text-red-500 text-sm">{errors.email?.message}</p>
        
        <textarea {...register('assignment_description')} placeholder="Assignment Description" className="w-full p-2 border rounded mb-2 text-slate-900" />
        <p className="text-red-500 text-sm">{errors.assignment_description?.message}</p>
        
        <input {...register('github_repo_url')} placeholder="GitHub Repository URL" className="w-full p-2 border rounded mb-2 text-slate-900" />
        <p className="text-red-500 text-sm">{errors.github_repo_url?.message}</p>
        
        <select {...register('candidate_level')} className="w-full p-2 border rounded mb-2 text-slate-700">
          <option value="">Select Candidate Level</option>
          {loading 
            ? <option disabled>Loading...</option> 
            : levels.length > 0 && levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))
          }
          {
            levels.length < 0 && <option disabled>Error loading levels</option>
          }
        </select>
        <p className="text-red-500 text-sm">{errors.candidate_level?.message}</p>
        
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}