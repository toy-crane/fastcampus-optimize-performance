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
import ColorButton from "./_components/color-button";

type PhoneWithColors = Tables<"phones"> & {
  phone_colors: Tables<"phone_colors">[];
};

const PhoneCard = ({
  order,
  phones,
  selectedPhoneName,
  selectedColor,
}: {
  order: "primary" | "secondary";
  phones: PhoneWithColors[];
  selectedPhoneName: string;
  selectedColor: string;
}) => {
  const options = phones.map((phone) => ({
    value: phone.name,
    label: `${phone.name} Phone`,
  }));

  const selectedPhone = phones.find(
    (phone) => phone.name === selectedPhoneName
  );

  if (!selectedPhone) throw new Error("No selected phone");

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
        {selectedPhone.phone_colors.map((color, index) => (
          <ColorButton
            key={color.id}
            colorName={color.name}
            order={order}
            className={cn(
              color.name === selectedColor && "border-2 border-blue-500"
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
    primaryColor?: string;
    secondaryColor?: string;
  };
}) {
  const supabase = createClient();
  const { data } = await supabase.from("phones").select("*, phone_colors(*)");
  if (!data) throw new Error("No data");

  const primaryPhone =
    data.find((phone) => phone.name === searchParams.primary) || data[0];
  const secondaryPhone =
    data.find((phone) => phone.name === searchParams.secondary) || data[0];

  const primaryColor =
    searchParams.primaryColor || primaryPhone.phone_colors[0].name;
  const secondaryColor =
    searchParams.secondaryColor || secondaryPhone.phone_colors[0].name;

  return (
    <div className="container flex flex-col md:items-center md:w-[720px]">
      <div className="grid grid-cols-2 w-full gap-4 md:gap-24 mt-4 mb-12">
        <PhoneCard
          order="primary"
          phones={data}
          selectedPhoneName={primaryPhone.name}
          selectedColor={primaryColor}
        />
        <PhoneCard
          order="secondary"
          phones={data}
          selectedPhoneName={secondaryPhone.name}
          selectedColor={secondaryColor}
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
