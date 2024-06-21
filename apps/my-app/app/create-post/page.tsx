"use client";
// app/create-post/page.tsx
import React from "react";
import { handleSubmit, saveDraft } from "./actions";

export default function Page() {
  return (
    <div>
      <h1>Create Post</h1>
      <form action={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" required />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            name="body"
            required
            onChange={async (e) => {
              await saveDraft(e.target.value);
            }}
          ></textarea>
        </div>
        <div>
          <label htmlFor="userId">User ID:</label>
          <input type="number" id="userId" name="userId" required />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}
