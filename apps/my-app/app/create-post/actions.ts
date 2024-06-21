// actions.ts
"use server";

export async function saveDraft(content: string) {
  // 드래프트 저장 로직 (예: 로컬 스토리지, 데이터베이스 등에 저장)
  console.log("Draft saved:", content);
}

export async function handleSubmit(formData: FormData) {
  "use server";

  const rawFormData = {
    title: formData.get("title"),
    body: formData.get("body"),
    userId: formData.get("userId"),
  };

  // 데이터 처리 로직
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    body: JSON.stringify(rawFormData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  const json = await response.json();
  console.log(json);
}
