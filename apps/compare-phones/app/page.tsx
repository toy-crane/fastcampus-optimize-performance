import { Tables } from "@/database.types";
import { PhoneCombobox } from "./_components/combobox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";

const Colors = [
  { name: "beige", class: "bg-[#f5f5dc] hover:bg-[#f5f5dc]/70" },
  { name: "grey", class: "bg-[#e5e7eb] hover:bg-[#e5e7eb]/70" },
  { name: "black", class: "bg-[#1e1e1e] hover:bg-[#1e1e1e]/70" },
];

const PhoneCard = ({
  order,
  phones,
  selectedPhoneName,
}: {
  order: "primary" | "secondary";
  phones: Tables<"phones">[];
  selectedPhoneName: string;
}) => {
  const options = phones.map((phone) => ({
    value: phone.name,
    label: `${phone.name} Phone`,
  }));

  return (
    <div className="flex flex-col items-center">
      <PhoneCombobox
        className="mb-4"
        order={order}
        options={options}
        selectedValue={selectedPhoneName}
      />
      <div className="relative aspect-[6/10] md:aspect-squre w-full mb-4">
        <Image
          src="/phones/i14-beige.png"
          alt="i14 beige"
          fill={true}
          sizes={"50vw"}
          objectFit="contain"
        />
      </div>
      <div className="flex gap-3 mb-2">
        {Colors.map((color, index) => (
          <button
            key={index}
            className={cn(
              "w-8 h-8 rounded-full hover:border-blue-500 hover:border-2",
              color.class
            )}
          />
        ))}
      </div>
      <div className="text-xl font-semibold">베이지</div>
    </div>
  );
};

async function Page({
  searchParams,
}: {
  searchParams: {
    primary?: string;
    secondary?: string;
  };
}) {
  const supabase = createClient();
  const { data } = await supabase.from("phones").select("*");
  if (!data) throw new Error("No data");

  const selectedPrimaryName = searchParams.primary || data[0].name;
  const selectedSecondaryName = searchParams.secondary || data[0].name;

  return (
    <div className="container flex flex-col md:items-center md:w-[720px]">
      <div className="grid grid-cols-2 w-full gap-4 md:gap-24 mt-4 mb-12">
        <PhoneCard
          order="primary"
          phones={data}
          selectedPhoneName={selectedPrimaryName}
        />
        <PhoneCard
          order="secondary"
          phones={data}
          selectedPhoneName={selectedSecondaryName}
        />
      </div>
      <Accordion
        type="single"
        collapsible
        className="w-full md:w-[480px] mb-24"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>요약</AccordionTrigger>
          <AccordionContent>스마트폰 정보를 요약 합니다</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>저장 용량</AccordionTrigger>
          <AccordionContent>
            스마트폰 정보를 저장하는 방법을 요약 합니다
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>칩</AccordionTrigger>
          <AccordionContent>
            스마트폰 정보를 저장하는 방법을 요약 합니다
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default Page;
