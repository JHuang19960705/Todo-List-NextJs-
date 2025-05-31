'use client';
import React from 'react';

type DeleteFormProps = {
  todoId: number;
};

export default function DeleteForm({ todoId }: DeleteFormProps) {
  function handleSubmit(e: React.FormEvent) {
    if (!confirm('確定要刪除嗎？')) {
      e.preventDefault();
    }
  }

  return (
    <form
      method="POST"
      action={`/api/todoList/${todoId}/delete`}
      style={{ display: 'inline' }}
      onSubmit={handleSubmit}
    >
      <button type="submit" style={{ color: 'red', cursor: 'pointer' }}>
        刪除
      </button>
    </form>
  );
}
