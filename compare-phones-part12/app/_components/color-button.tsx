"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const ColorStyles = [
  { name: "beige", class: "bg-[#f5f5dc] hover:bg-[#f5f5dc]/70" },
  { name: "grey", class: "bg-[#e5e7eb] hover:bg-[#e5e7eb]/70" },
  { name: "black", class: "bg-[#1e1e1e] hover:bg-[#1e1e1e]/70" },
];

function ColorButton({
  colorName,
  order,
  className,
}: {
  colorName: string;
  order: "primary" | "secondary";
  className?: string;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  return (
    <button
      className={cn(
        "w-8 h-8 rounded-full hover:border-blue-500 hover:border-2",
        ColorStyles.find((style) => style.name === colorName)?.class,
        className
      )}
      onClick={() => {
        const newUrlSearchParams = new URLSearchParams(searchParams);
        newUrlSearchParams.set(`${order}Color`, colorName);
        router.push(`?${newUrlSearchParams.toString()}`);
      }}
    />
  );
}

export default ColorButton;
