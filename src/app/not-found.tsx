import Link from "next/link";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

export default function notFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center p-6">
      <WorkOutlineIcon style={{ fontSize: 64, color: "#9CA3AF" }} />
      <h1 className="text-4xl font-bold mt-4">404 - Page Not Found</h1>
      <p className="text-gray-600 mt-2 max-w-md">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block bg-[var(--primary)] text-white px-6 py-2 rounded hover:bg-red-300"
      >
        Back to Home
      </Link>
    </div>
  );
}
