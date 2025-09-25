"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import RTE from "@/components/RTE";
import { useAuthStore } from "@/store/Auth";
import toast from "react-hot-toast";

const AskPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return router.push("/login");

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()),
          authorId: user.$id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (!response.ok) throw data;
      toast.success("Question created successfully");

      // Navigate to the newly created question
      router.push(
        `/questions/${data.$id}/${data.title
          .toLowerCase()
          .replace(/\s+/g, "-")}`
      );
    } catch (error: any) {
      alert(error?.message || "Failed to create question");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your question title"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500 text-black"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <RTE value={content} onChange={(val) => setContent(val || "")} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tags</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Comma separated, e.g., react,nextjs,tailwind"
            className="w-full border rounded px-3 py-2 outline-none focus:ring-2 focus:ring-orange-500  text-black"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 font-bold"
        >
          Post Question
        </button>
      </form>
    </div>
  );
};

export default AskPage;
