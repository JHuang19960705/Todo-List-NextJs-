"use client";

import React, { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import LinkExtension from "@tiptap/extension-link";

export default function EditorWithPreview({ initialContent }: { initialContent: string }) {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit, LinkExtension],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  const setLink = () => {
    const url = prompt("請輸入連結網址");
    if (url && editor) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  };

  const unsetLink = () => {
    if (editor) {
      editor.chain().focus().unsetLink().run();
    }
  };

  return (
    <div>
      {/* 工具列 */}
      <div style={{ marginBottom: 10 }}>
        <button type="button" onClick={() => editor?.chain().focus().toggleBold().run()}>
          粗體
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}>
          H4
        </button>
        <button type="button" onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          清單
        </button>
        <button type="button" onClick={setLink}>
          插入連結
        </button>
        <button type="button" onClick={unsetLink}>
          移除連結
        </button>
      </div>

      {/* 編輯器本體 */}
      <div
        style={{
          border: "1px solid #ccc",
          padding: 10,
          marginBottom: 8,
          minHeight: 150,
        }}
      >
        <EditorContent editor={editor} />
      </div>

      {/* 隱藏欄位，提交 HTML */}
      <input type="hidden" name="content" value={content} />

      {/* HTML 預覽 */}
      <div style={{ marginTop: 16 }}>
        <strong>HTML 預覽：</strong>
        <div
          style={{
            whiteSpace: "pre-wrap",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ccc",
            padding: 12,
            minHeight: 100,
            fontFamily: "monospace",
            fontSize: 14,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
}
