import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h2>Public Folder Image</h2>
      <Image
        src="/phones/i14-beige.png"
        alt="Image from public folder"
        width={400}
        height={300}
      />
    </div>
  );
}
