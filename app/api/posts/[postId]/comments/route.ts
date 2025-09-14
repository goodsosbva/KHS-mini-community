import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/db";
import { userPostCommentTable } from "@/database/schema";
import authOptions from "@/lib/authOptions";

interface RequestPayload {
  params: Promise<{ postId: string }>;
}

export async function POST(request: NextRequest, payload: RequestPayload) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return Response.json({ error: "An error occurred" }, { status: 400 });
  }

  const { postId } = await payload.params;
  const { content } = await request.json();

  try {
    const newComment = await db
      .insert(userPostCommentTable)
      .values({ userId, postId, content })
      .returning();

    return Response.json(newComment, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred" }, { status: 400 });
  }
}
