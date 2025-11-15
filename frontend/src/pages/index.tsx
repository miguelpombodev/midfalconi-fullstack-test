import { useState, useEffect, useMemo } from "react";
import * as api from "../services/api";
import { User, Profile, CreateUserDto, UpdateUserDto } from "../types";

import { UserList } from "../components/UserList";
import { UserFormModal } from "../components/UserFormModal";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { UserListSkeleton } from "@/components/UserListSkeleton";
import toast from "react-hot-toast";

const Spinner = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filterProfileId, setFilterProfileId] = useState<string | null>(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [deletingUser, setDeletingUser] = useState<User | null>(null);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const [usersData, profilesData] = await Promise.all([
        api.getUsers(filterProfileId),
        api.getProfiles(),
      ]);
      setUsers(usersData);
      setProfiles(profilesData);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery) {
      return users;
    }
    const lowerQuery = searchQuery.toLowerCase();
    return users.filter(
      (user) =>
        user.firstName.toLowerCase().includes(lowerQuery) ||
        user.lastName.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery)
    );
  }, [users, searchQuery]);

  useEffect(() => {
    loadData();
  }, [filterProfileId]);

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (user: User) => {
    setEditingUser(user);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (data: CreateUserDto | UpdateUserDto) => {
    setIsSubmitting(true);
    setError(null);
    try {
      if (editingUser) {
        await api.updateUser(editingUser.id, data);
        toast.success("Usuário atualizado com sucesso!");
      } else {
        await api.createUser(data as CreateUserDto);
        toast.success("Usuário criado com sucesso!");
      }
      setIsFormModalOpen(false);
      await loadData();
    } catch (err) {
      setError((err as Error).message);
      toast.error((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingUser) return;
    setIsSubmitting(true);
    setError(null);
    try {
      await api.deleteUser(deletingUser.id);
      setDeletingUser(null);
      await loadData();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (user: User) => {
    try {
      if (user.isActive) {
        await api.inactivateUser(user.id);
      } else {
        await api.activateUser(user.id);
      }
      await loadData();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
      <h1 className="text-4xl text-center font-bold tracking-tight text-gray-900">
        Gerenciador de Usuários
      </h1>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
        <select
          value={filterProfileId || ""}
          onChange={(e) => setFilterProfileId(e.target.value || null)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-auto"
        >
          <option value="">Todos os Perfis</option>
          {profiles.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="search"
          placeholder="Pesquisar por nome ou email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:w-auto"
        />

        <button
          type="button"
          onClick={handleOpenCreateModal}
          className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
        >
          Criar Novo Usuário
        </button>
      </div>

      <div className="mt-4">
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <h3 className="text-sm font-medium text-red-800">Erro</h3>
            <p className="mt-2 text-sm text-red-700">{error}</p>
          </div>
        )}

        {isLoading && <UserListSkeleton />}
      </div>

      {!isLoading && !error && (
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <UserList
                users={filteredUsers}
                onEdit={handleOpenEditModal}
                onDelete={setDeletingUser}
                onToggleActive={handleToggleActive}
              />
            </div>
          </div>
        </div>
      )}

      <UserFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingUser}
        profiles={profiles}
        isSubmitting={isSubmitting}
      />

      <ConfirmationModal
        isOpen={!!deletingUser}
        onClose={() => setDeletingUser(null)}
        onConfirm={handleDelete}
        title="Confirmar Exclusão"
        message={`Tem certeza que deseja excluir ${deletingUser?.firstName} ${deletingUser?.lastName}? Esta ação não pode ser desfeita.`}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
