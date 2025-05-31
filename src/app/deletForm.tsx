'use client';
import React from 'react';

type DeleteFormProps = {
  todoId: number;
};

export default function DeleteForm({ todoId }: DeleteFormProps) {
  function handleSubmit(e: React.FormEvent) {
    if (!confirm('本当に削除しますか？')) {
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
        削除
      </button>
    </form>
  );
}
