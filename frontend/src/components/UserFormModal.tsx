import React, { useState, useEffect } from "react";
import { User, Profile, CreateUserDto, UpdateUserDto } from "../types";

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

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateUserDto | UpdateUserDto) => void;
  initialData: User | null;
  profiles: Profile[];
  isSubmitting?: boolean;
}

export function UserFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  profiles,
  isSubmitting = false,
}: UserFormModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileId, setProfileId] = useState("");

  useEffect(() => {
    if (initialData) {
      setFirstName(initialData.firstName);
      setLastName(initialData.lastName);
      setEmail(initialData.email);
      setProfileId(initialData.profileId);
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setProfileId("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    onSubmit({ firstName, lastName, email, profileId });
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="
        fixed inset-0 z-50 flex items-center justify-center
        overflow-y-auto bg-black/50 p-4 backdrop-blur-sm
      "
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-lg rounded-xl bg-white
          shadow-2xl
        "
      >
        <form onSubmit={handleSubmit}>
          <div className="border-b border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-primary">
              {initialData ? "Editar Usuário" : "Criar Novo Usuário"}
            </h2>
          </div>

          <div className="space-y-4 p-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Ex: João"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Ex: Silva"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ex: joao.silva@email.com"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="profileId"
                className="block text-sm font-medium text-gray-700"
              >
                Perfil
              </label>
              <select
                id="profileId"
                value={profileId}
                onChange={(e) => setProfileId(e.target.value)}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Selecione um perfil...
                </option>
                {profiles.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 rounded-b-xl bg-gray-50 p-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="
                rounded-md bg-white px-4 py-2 text-sm font-semibold
                text-gray-900 shadow-sm ring-1 ring-inset
                ring-gray-300 transition-colors hover:bg-gray-50
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="
                inline-flex items-center justify-center rounded-md bg-primary
                px-4 py-2 text-sm font-semibold text-white
                shadow-sm transition-all hover:bg-primary-700
                focus-visible:outline focus-visible:outline-2
                focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                disabled:cursor-not-allowed disabled:opacity-50
              "
            >
              {isSubmitting && <ButtonSpinner />}
              {initialData ? "Salvar Alterações" : "Criar Usuário"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
