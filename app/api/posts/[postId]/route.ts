import { NextRequest } from "next/server";
import { preparedPostQuery } from "@/database/prepareQueries/post";

interface RequestPayload {
  params: Promise<{ postId: string }>;
}

export async function GET(request: NextRequest, payload: RequestPayload) {
  const { postId } = await payload.params;

  try {
    const [post] = await preparedPostQuery.execute({ postId });

    if (!post) {
      throw new Error("No Post");
    }

    return Response.json(post, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "An error occurred" }, { status: 400 });
  }
}
