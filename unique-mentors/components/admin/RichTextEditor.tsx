"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

type TinyEditorProps = {
  apiKey?: string;
  tinymceScriptSrc?: string;
  value: string;
  onEditorChange: (value: string) => void;
  init: Record<string, unknown>;
};

const Editor = dynamic<TinyEditorProps>(
  async () => {
    const tinyMceReact = await import("@tinymce/tinymce-react");
    return tinyMceReact.Editor as unknown as ComponentType<TinyEditorProps>;
  },
  {
  ssr: false,
  loading: () => <LoadingSpinner variant="page" />
  }
);

type RichTextEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;

  if (apiKey && apiKey !== "no-api-key") {
    return (
      <Editor
        apiKey={apiKey}
        value={value}
        onEditorChange={onChange}
        init={{
          height: 520,
          menubar: false,
          plugins: "lists link image table code autoresize",
          toolbar:
            "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image table | code",
          content_style: "body { font-family: Inter, Arial, sans-serif; font-size: 16px; line-height: 1.7; }",
          promotion: false,
          branding: false
        }}
      />
    );
  }

  return (
    <Editor
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      value={value}
      onEditorChange={onChange}
      init={{
        height: 520,
        menubar: false,
        plugins: "lists link image table code autoresize",
        toolbar:
          "undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist | link image table | code",
        content_style: "body { font-family: Inter, Arial, sans-serif; font-size: 16px; line-height: 1.7; }",
        promotion: false,
        branding: false
      }}
    />
  );
}
