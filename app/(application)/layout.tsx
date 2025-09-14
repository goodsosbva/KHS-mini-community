import { type PropsWithChildren } from "react";
import { getServerSession } from "next-auth";
import Header from "@/components/base/Header";
import SessionProviderWrapper from "@/components/base/SessionProviderWrapper";
import authOptions from "@/lib/authOptions";

async function ApplicationLayout(props: PropsWithChildren) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProviderWrapper session={session}>
      <Header session={session} />
      {props.children}
    </SessionProviderWrapper>
  );
}

export default ApplicationLayout;
