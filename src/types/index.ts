import { Models } from "appwrite";

// Comment type
export interface CommentDocument extends Models.Document {
  content: string;
  authorId: string;
  type: "question" | "answer";
  typeId: string;
  author?: {
    $id: string;
    name: string;
    reputation?: number;
  };
}

// Answer type
export interface AnswerDocument extends Models.Document {
  content: string;
  authorId: string;
  author?: {
    $id: string;
    name: string;
    reputation?: number;
  };
  upvotesDocuments: Models.DocumentList<Models.Document>;
  downvotesDocuments: Models.DocumentList<Models.Document>;
  comments: Models.DocumentList<CommentDocument>;
}
