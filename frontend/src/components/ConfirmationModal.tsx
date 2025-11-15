import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

const ButtonSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  isSubmitting?: boolean;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isSubmitting = false,
}: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50 flex items-center justify-center
        bg-black/50 backdrop-blur-sm
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-md rounded-xl bg-white p-6 shadow-2xl
          sm:p-8
        "
      >
        <div className="flex flex-col items-center text-center">
          <div
            className="
              flex h-12 w-12 items-center justify-center
              rounded-full bg-red-100
            "
          >
            <ExclamationTriangleIcon
              className="h-6 w-6 text-red-600"
              aria-hidden="true"
            />
          </div>

          {/* Título */}
          <h2 className="mt-4 text-lg font-semibold text-gray-900">{title}</h2>

          <p className="mt-2 text-sm text-gray-600">{message}</p>

          <div className="mt-6 flex w-full flex-col-reverse gap-3 sm:flex-row sm:justify-center">
            <button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="
                inline-flex w-full items-center justify-center rounded-md
                bg-red-600 px-4 py-2 text-sm font-semibold text-white
                shadow-sm transition-all
                hover:bg-red-700
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-red-600
                disabled:cursor-not-allowed disabled:opacity-50
                sm:w-auto
              "
            >
              {isSubmitting && <ButtonSpinner />}
              Confirmar
            </button>

            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="
                inline-flex w-full items-center justify-center rounded-md
                bg-white px-4 py-2 text-sm font-semibold text-gray-900
                shadow-sm ring-1 ring-inset ring-gray-300
                transition-colors hover:bg-gray-50
                disabled:cursor-not-allowed disabled:opacity-50
                sm:w-auto
              "
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
