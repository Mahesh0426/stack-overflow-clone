// import Link from "next/link";
// import Image from "next/image";
// import LatestQuestions from "./components/LatestQuestions";
// import Search from "./questions/Search";

// export default function Home() {
//   return (
//     <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
//       {/* Header */}
//       <header className="flex flex-col sm:flex-row items-center justify-between mb-8">
//         <h1 className="text-4xl font-bold text-blue-600 mb-4 sm:mb-0">
//           StackOverflow Clone
//         </h1>
//         <Link
//           href="/questions"
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//         >
//           Ask Question
//         </Link>
//       </header>

//       {/* Categories */}
//       <section className="mb-8">
//         <h2 className="text-2xl font-semibold mb-4">Categories</h2>
//         <div className="flex flex-wrap gap-4">
//           {["JavaScript", "React", "Node.js", "TypeScript", "Next.js"].map(
//             (cat) => (
//               <span
//                 key={cat}
//                 className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-700 transition"
//               >
//                 {cat}
//               </span>
//             )
//           )}
//         </div>
//       </section>

//       {/* Recent Questions */}
//       <section>
//         <div className="mb-10">
//           <h1 className="text-3xl font-bold mb-4">Latest Questions</h1>
//           <LatestQuestions />
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="mt-16 text-center text-gray-500 dark:text-gray-400">
//         <p>StackOverflow Clone &copy; 2025</p>
//       </footer>
//     </main>
//   );
// }

import Link from "next/link";
import Image from "next/image";
import LatestQuestions from "./components/LatestQuestions";

import { MessageCircle, Code, Users, Sparkles } from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "JavaScript",
      count: "2.5k",
      color: "from-yellow-500 to-orange-500",
    },
    { name: "React", count: "1.8k", color: "from-blue-500 to-cyan-500" },
    { name: "Node.js", count: "1.2k", color: "from-green-500 to-emerald-500" },
    { name: "TypeScript", count: "980", color: "from-blue-600 to-indigo-600" },
    { name: "Next.js", count: "750", color: "from-gray-700 to-gray-900" },
    { name: "Python", count: "3.1k", color: "from-blue-400 to-yellow-400" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className="relative z-10 container mx-auto px-8 py-20">
          {/* Header */}
          <header className="flex flex-col sm:flex-row items-center justify-between mb-16">
            <div className="flex items-center gap-3 mb-6 sm:mb-0">
              <div className="p-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl">
                <Code className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DevOverflow
              </h1>
            </div>
            <Link
              href="/questions"
              className="group px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30"
            >
              <span className="flex items-center gap-2">
                Ask Question
                <Sparkles className="h-4 w-4 group-hover:rotate-12 transition-transform" />
              </span>
            </Link>
          </header>
        </div>
      </section>

      {/* Recent Questions Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">
                  Latest Questions
                </h2>
                <p className="text-slate-400">
                  Fresh questions from the community
                </p>
              </div>
              <Link
                href="/questions"
                className="hidden sm:block px-4 py-2 bg-slate-800/50 backdrop-blur-sm text-white border border-white/10 rounded-lg hover:border-white/20 transition-all"
              >
                View All
              </Link>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <LatestQuestions />
            </div>
          </div>
        </div>
      </section>
      {/* Categories Section */}
      <section className="relative z-10 bg-slate-900/50 backdrop-blur-sm py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">
                Popular Categories
              </h2>
              <p className="text-slate-400 text-lg">
                Browse questions by technology
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  className="group relative overflow-hidden bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all hover:scale-105"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                  ></div>
                  <div className="relative space-y-2">
                    <div className="text-white font-semibold text-lg">
                      {cat.name}
                    </div>
                    <div className="text-slate-400 text-sm">
                      {cat.count} questions
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm rounded-3xl border border-white/10 p-12 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-10"></div>
              <div className="relative space-y-6">
                <h2 className="text-4xl font-bold text-white">
                  Ready to Get Your Answer?
                </h2>
                <p className="text-xl text-slate-300">
                  Ask your question and get help from expert developers
                </p>
                <Link
                  href="/questions"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:scale-105 transition-transform shadow-lg shadow-indigo-500/30 text-lg"
                >
                  Ask Your Question
                  <Sparkles className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-950/80 backdrop-blur-sm border-t border-white/10 py-8 mt-16">
        <div className="container mx-auto px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">DevOverflow</span>
          </div>
          <p className="text-slate-500">
            DevOverflow Clone &copy; 2025. Built with passion by developers, for
            developers.
          </p>
        </div>
      </footer>
    </main>
  );
}
