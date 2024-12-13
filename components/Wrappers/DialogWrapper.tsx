"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";
import { iconService } from "../Icons/Icons";

interface Props {
  children: React.ReactNode;
}

export default function DialogWrapper({ children }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog) {
        dialog.close();
      }
    };
  }, []);

  const handleClose = () => {
    router.back(); // Navigate back on close
  };

  return (
    <dialog
      ref={dialogRef}
      className="rounded-lg w-fit h-fit  bg-white z-50  shadow-model"
      onClick={handleClose}
    >
      <div
        className="  min-w-[50rem] max-w-screen w-[50vw]  flex gap-2 p-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className=" bg-dark-btn text-dark-text rounded-full w-6 h-6  rotate-45 mt-1"
        >
          {iconService.PlusSvg()}
        </button>
        {children}
      </div>
    </dialog>
  );
}
