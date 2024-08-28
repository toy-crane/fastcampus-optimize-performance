import LinkList, { LinkListSkeleton } from "@/components/link-list";
import { UserInfo, UserInfoSkeleton } from "@/components/user-info";
import { Suspense } from "react";

const Page = async ({ params }: { params: { username: string } }) => {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center pt-10 pb-6">
          <Suspense fallback={<UserInfoSkeleton />}>
            <UserInfo username={params.username} />
          </Suspense>
          <Suspense fallback={<LinkListSkeleton />}>
            <LinkList username={params.username} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default Page;
