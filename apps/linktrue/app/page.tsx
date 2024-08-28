import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkTrue",
  description: "LinkTrue로 링크 모음을 만들고 공유하세요.",
};

async function Page() {
  return <div className="container"></div>;
}

export default Page;
