import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1
        className="mb-2 font-mono text-6xl font-bold"
        style={{ color: "var(--gold)" }}
      >
        404
      </h1>
      <h2 className="mb-4 font-display text-2xl font-bold">Page Not Found</h2>
      <p className="mb-8" style={{ color: "var(--text-muted)" }}>
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="rounded-full px-6 py-2 font-bold text-black"
        style={{ backgroundColor: "var(--gold)" }}
      >
        Go Home
      </Link>
    </div>
  );
}
