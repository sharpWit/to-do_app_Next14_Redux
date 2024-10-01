import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <Link href="/todos">
        GO to <span className="text-yellow-500 font-semibold">TODOS PAGE</span>
      </Link>
    </div>
  );
}
