import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h2>External Image</h2>
      <Image
        src="https://picsum.photos/400/300"
        alt="Random image from Lorem Picsum"
        width={400}
        height={300}
      />
    </div>
  );
}
