// app/suspense/page.tsx
import { Suspense } from "react";
import Content from "./components/content";
import Loading from "./components/loading";
import Avatar from "./components/avatar";

export default async function Page() {
  return (
    <div>
      dashboard
      <Suspense fallback={<Loading />}>
        <Content />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Avatar />
      </Suspense>
    </div>
  );
}
