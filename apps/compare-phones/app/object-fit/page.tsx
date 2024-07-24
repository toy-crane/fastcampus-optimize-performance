import Image from "next/image";

function Page() {
  return (
    <div className="flex flex-col items-center">
      <h1>Object Fit</h1>
      <div className="relative w-[400px] h-[400px]">
        <Image
          fill
          src="/phones/i14-beige.png"
          alt="i14 beige"
          objectFit="contain"
        />
      </div>
    </div>
  );
}

export default Page;
