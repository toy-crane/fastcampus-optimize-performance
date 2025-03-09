"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function ShareButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { toast } = useToast();

  return (
    <Button
      className={className}
      onClick={async () => {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "주소가 복사되었습니다.",
          description:
            "복사한 주소를 사용하여 다른 사람이 이 페이지를 방문할 수 있습니다.",
        });
      }}
    >
      {children}
    </Button>
  );
}

export default ShareButton;
