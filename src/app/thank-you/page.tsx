import Link from "next/link";

interface PageProps {
  searchParams?: Promise<{
    name?: string;
    email?: string;
    level?: string;
  }>;
}

export default async function ThankYouPage({
  searchParams,
}: PageProps) {
  const data = await searchParams;

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-slate-900">Thank You!</h1>
        <p className="text-slate-900">Your assignment has been submitted successfully.</p>
        <p className="text-slate-900">
          <strong>Name:</strong> {data?.name}
        </p>
        <p className="text-slate-900">
          <strong>Email:</strong> {data?.email}
        </p>
        <p className="text-slate-900 mb-4">
          <strong>Candidate Level:</strong> {data?.level}
        </p>
        <Link href="/" className="bg-blue-500 text-white p-2 rounded">
          Go Back
        </Link>
      </div>
    </div>
  );
}