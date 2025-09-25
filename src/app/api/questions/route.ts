import { NextResponse } from "next/server";
import { databases } from "@/models/server/config";
import { questionCollection, db } from "@/models/name";
import { ID } from "node-appwrite";

export async function POST(req: Request) {
  try {
    const { title, content, tags, authorId } = await req.json();

    const newQuestion = await databases.createDocument(
      db,
      questionCollection,
      ID.unique(),
      {
        title,
        content,
        tags,
        authorId,
      }
    );

    return NextResponse.json(newQuestion);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
