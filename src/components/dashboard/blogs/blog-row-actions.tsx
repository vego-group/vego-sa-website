"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { BlogEditorPopup } from "./blog-editor-popup";
import { DeleteBlogConfirmationPopup } from "./delete-blog-confirmation-popup";

type RowActionsProps = {
  blogId: number;
  blogTitle: string | undefined;
};

function RowActions({ blogId, blogTitle }: RowActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsEditOpen(true)}
        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
        title="Edit"
      >
        <Pencil className="size-5" />
      </button>
      <button
        type="button"
        onClick={() => setIsDeleteOpen(true)}
        className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-white/60 hover:text-red-400"
        title="Delete"
      >
        <Trash2 className="size-5" />
      </button>

      <BlogEditorPopup
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        id={blogId}
      />

      <DeleteBlogConfirmationPopup
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        id={blogId}
        blogTitle={blogTitle ?? ""}
      />
    </>
  );
}

export { RowActions };
