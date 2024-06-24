// `app/page.tsx` is the UI for the `/` URL

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Page Title is fastcampus",
  description: "Description of my page",
};

export default function Page() {
  return <h1>It`s Home</h1>;
}
