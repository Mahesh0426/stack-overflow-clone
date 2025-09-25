/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { IconX } from "@tabler/icons-react";
import { Models, ID } from "appwrite";

import RTE from "@/components/RTE";
import Meteors from "@/components/magicui/meteors";
import { Confetti } from "@/components/magicui/confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/Auth";
import { cn } from "@/lib/utils";
import slugify from "@/utils/slugify";
import { databases, storage } from "@/models/client/config";
import {
  db,
  questionAttachmentBucket,
  questionCollection,
} from "@/models/name";

// Custom type for your question collection
export interface QuestionDocument extends Models.Document {
  title: string;
  content: string;
  authorId: string;
  tags: string[];
  attachmentId?: string;
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      "relative flex w-full flex-col space-y-2 overflow-hidden rounded-xl border border-white/20 bg-slate-950 p-4",
      className
    )}
  >
    <Meteors number={30} />
    {children}
  </div>
);

const QuestionForm = ({ question }: { question?: QuestionDocument }) => {
  const { user } = useAuthStore();
  const router = useRouter();

  const [tag, setTag] = React.useState("");
  const [formData, setFormData] = React.useState({
    title: question?.title ?? "",
    content: question?.content ?? "",
    authorId: user?.$id ?? "",
    tags: new Set<string>(question?.tags ?? []),
    attachment: null as File | null,
  });

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadConfetti = (timeInMS = 3000) => {
    const end = Date.now() + timeInMS;
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      Confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });
      Confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  const create = async () => {
    if (!formData.attachment) throw new Error("Please upload an image");

    const storageResponse = await storage.createFile(
      questionAttachmentBucket,
      ID.unique(),
      formData.attachment
    );

    const response = await databases.createDocument<QuestionDocument>(
      db,
      questionCollection,
      ID.unique(),
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId: storageResponse.$id,
      }
    );

    loadConfetti();
    return response;
  };

  const update = async () => {
    if (!question) throw new Error("Please provide a question");

    const attachmentId = await (async () => {
      if (!formData.attachment) return question.attachmentId;

      await storage.deleteFile(
        questionAttachmentBucket,
        question.attachmentId!
      );

      const file = await storage.createFile(
        questionAttachmentBucket,
        ID.unique(),
        formData.attachment
      );

      return file.$id;
    })();

    return databases.updateDocument<QuestionDocument>(
      db,
      questionCollection,
      question.$id,
      {
        title: formData.title,
        content: formData.content,
        authorId: formData.authorId,
        tags: Array.from(formData.tags),
        attachmentId,
      }
    );
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.authorId) {
      setError("Please fill out all fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = question ? await update() : await create();
      router.push(`/questions/${response.$id}/${slugify(formData.title)}`);
    } catch (err: any) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={submit}>
      {error && (
        <LabelInputContainer>
          <div className="text-center">
            <span className="text-red-500">{error}</span>
          </div>
        </LabelInputContainer>
      )}

      {/* Title */}
      <LabelInputContainer>
        <Label htmlFor="title">
          Title
          <br />
          <small>
            Be specific and imagine you&apos;re asking another person.
          </small>
        </Label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="e.g. Is there an R function for finding the index of an element?"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </LabelInputContainer>

      {/* Content */}
      <LabelInputContainer>
        <Label htmlFor="content">
          Details
          <br />
          <small>Introduce the problem. Minimum 20 characters.</small>
        </Label>
        <RTE
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value ?? "" }))
          }
        />
      </LabelInputContainer>

      {/* Image */}
      <LabelInputContainer>
        <Label htmlFor="image">
          Image
          <br />
          <small>Add an image to clarify your question.</small>
        </Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setFormData((prev) => ({ ...prev, attachment: file }));
          }}
        />
      </LabelInputContainer>

      {/* Tags */}
      <LabelInputContainer>
        <Label htmlFor="tag">
          Tags
          <br />
          <small>Describe what your question is about.</small>
        </Label>
        <div className="flex w-full gap-4">
          <Input
            id="tag"
            name="tag"
            type="text"
            placeholder="e.g. (java c objective-c)"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <button
            type="button"
            className="relative shrink-0 rounded-full border border-slate-600 bg-slate-700 px-8 py-2 text-sm text-white transition duration-200 hover:shadow-2xl hover:shadow-white/[0.1]"
            onClick={() => {
              if (!tag) return;
              setFormData((prev) => ({
                ...prev,
                tags: new Set([...prev.tags, tag]),
              }));
              setTag("");
            }}
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from(formData.tags).map((tag, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="group relative inline-block rounded-full bg-slate-800 p-px text-xs font-semibold leading-6 text-white shadow-2xl shadow-zinc-900">
                <div className="relative z-10 flex items-center space-x-2 rounded-full bg-zinc-950 px-4 py-0.5 ring-1 ring-white/10">
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        tags: new Set([...prev.tags].filter((t) => t !== tag)),
                      }))
                    }
                  >
                    <IconX size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </LabelInputContainer>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
      >
        {question ? "Update" : "Publish"}
      </button>
    </form>
  );
};

export default QuestionForm;
