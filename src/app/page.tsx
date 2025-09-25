import Link from "next/link";
import Image from "next/image";
import LatestQuestions from "./components/LatestQuestions";
import Search from "./questions/Search";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      {/* Header */}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-4 sm:mb-0">
          StackOverflow Clone
        </h1>
        <Link
          href="/questions"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ask Question
        </Link>
      </header>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-4">
          {["JavaScript", "React", "Node.js", "TypeScript", "Next.js"].map(
            (cat) => (
              <span
                key={cat}
                className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition"
              >
                {cat}
              </span>
            )
          )}
        </div>
      </section>

      {/* Recent Questions */}
      <section>
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Latest Questions</h1>
          <LatestQuestions />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
        <p>StackOverflow Clone &copy; 2025</p>
      </footer>
    </main>
  );
}
