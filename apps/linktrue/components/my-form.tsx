"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// Zod 스키마 정의 (한글 메시지)
const schema = z.object({
  username: z
    .string()
    .min(3, { message: "사용자 이름은 최소 3글자 이상이어야 합니다" })
    .max(20, { message: "사용자 이름은 최대 20글자까지 가능합니다" }),
  email: z.string().email({ message: "올바른 이메일 주소를 입력해주세요" }),
  links: z.array(
    z.object({
      url: z.string().url({ message: "올바른 URL을 입력해주세요" }),
    })
  ),
});

type FormData = z.infer<typeof schema>;

function MyForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("폼이 제출되었습니다!");
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          {...register("username", { required: true })}
          placeholder="사용자 이름"
        />
        {errors.username && <span>{errors.username.message}</span>}
      </div>
      <div>
        <input
          {...register("email", { required: true })}
          placeholder="이메일"
          type="email"
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <button
        type="button"
        onClick={() => append({ url: "" })}
        className="flex"
      >
        링크 추가
      </button>
      <div>
        {fields.map((field, index) => (
          <div key={field.id}>
            <input {...register(`links.${index}.url`)} placeholder="URL" />
            <button type="button" onClick={() => remove(index)}>
              Remove
            </button>
            <span>{errors.links?.[index]?.url?.message}</span>
          </div>
        ))}
      </div>
      <button type="submit">제출</button>
    </form>
  );
}

export default MyForm;
