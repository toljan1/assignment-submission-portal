"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const params = useSearchParams();
  const [submittedData, setSubmittedData] = useState({ name: "", email: "", level: "" });

  useEffect(() => {
    setSubmittedData({
      name: params.get("name") || "",
      email: params.get("email") || "",
      level: params.get("level") || "",
    });
  }, [params]);
  
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-slate-900">Thank You!</h1>
        <p className='text-slate-900'>Your assignment has been submitted successfully.</p>
        <p className='text-slate-900'><strong>Name:</strong> {submittedData.name}</p>
        <p className='text-slate-900'><strong>Email:</strong> {submittedData.email}</p>
        <p className='text-slate-900 mb-4'><strong>Candidate Level:</strong> {submittedData.level}</p>
        <Link href={'/'} className="bg-blue-500 text-white p-2 rounded">Go Back</Link>
      </div>
    </div>
  );
}