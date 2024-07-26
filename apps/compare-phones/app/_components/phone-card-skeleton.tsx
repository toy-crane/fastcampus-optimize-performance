import { Skeleton } from "@/components/ui/skeleton";

const PhoneCardSkeleton = () => {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="h-10 w-full bg-gray-200 rounded-xl mb-4" />
      <Skeleton className="relative aspect-[6/10] md:aspect-square w-full mb-4 bg-gray-200 rounded-xl" />
      <div className="flex gap-3 mb-2">
        {[...Array(3)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-8 h-8 rounded-full bg-gray-200"
          ></Skeleton>
        ))}
      </div>
      <Skeleton className="h-7 w-24 bg-gray-200 rounded-xl" />
    </div>
  );
};

export default PhoneCardSkeleton;
