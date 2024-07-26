import Image from "next/image";
import localImage from "../../public/phones/I-14-black.png";

export default function Page() {
  return (
    <div className="flex flex-col items-center">
      <h2>Static Image Import</h2>
      <Image src={localImage} alt="Locally imported image" />
    </div>
  );
}
