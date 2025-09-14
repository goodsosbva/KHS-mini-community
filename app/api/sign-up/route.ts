import { eq } from "drizzle-orm";
import { db } from "@/database/db";
import { userTable } from "@/database/schema";

export async function POST(req: Request) {
    const { email, password, name } = await req.json();

    try {
        const result = await db.transaction(async (tx) => {
            const [existingUser] = await db
                .select()
                .from(userTable)
                .where(eq(userTable.email, email));

            if (existingUser) {
                throw new Error("이미 존재하는 이메일입니다.");
            }

            const newUser = await tx
                .insert(userTable)
                .values({ email, password, name })
                .returning();

            if (!newUser) {
                throw new Error("회원 가입에 실패했습니다.");
            }

            return newUser;
    });

    if (!result) {
        throw new Error("회원 가입에 실패했습니다.");
    }

    return Response.json(result, { status: 200 });
    } catch (error: any) {
        return Response.json(error.message, { status: 500 });
    }
}