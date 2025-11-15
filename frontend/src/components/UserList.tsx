import { User } from "../types";
import {
  PencilSquareIcon,
  TrashIcon,
  NoSymbolIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

interface UserListProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggleActive: (user: User) => void;
}

const StatusBadge = ({ isActive }: { isActive: boolean }) => (
  <span
    className={`
      inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold
      ${isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
    `}
  >
    {isActive ? "Ativo" : "Inativo"}
  </span>
);

export function UserList({
  users,
  onEdit,
  onDelete,
  onToggleActive,
}: UserListProps) {
  return (
    <div className="flex flex-col">
      <div className="hidden text-center rounded-lg bg-gray-50 px-4 py-3 sm:flex">
        <div className="flex-1 text-sm font-semibold text-gray-600">Nome</div>
        <div className="flex-1 text-sm font-semibold text-gray-600">Email</div>
        <div className="flex-1 text-sm font-semibold text-gray-600">Status</div>
        <div className="w-32 text-right text-sm font-semibold text-gray-600">
          Ações
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {users.length === 0 && (
          <p className="py-4 text-center text-gray-500">
            Nenhum usuário encontrado.
          </p>
        )}

        {users.map((user) => (
          <div
            key={user.id}
            className="
              flex flex-col rounded-lg bg-white p-4 shadow-md text-center
              ring-1 ring-black ring-opacity-5
              sm:flex-row sm:items-center
            "
          >
            <div className="flex-1">
              <span className="text-xs font-medium text-gray-500 sm:hidden">
                Nome:
              </span>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
            </div>

            <div className="flex-1">
              <span className="text-xs font-medium text-gray-500 sm:hidden">
                Email:
              </span>
              <p className="text-gray-700">{user.email}</p>
            </div>

            <div className="flex-1 pt-2 sm:w-28 sm:pt-0">
              <span className="text-xs font-medium text-gray-500 sm:hidden">
                Status:
              </span>
              <div>
                <StatusBadge isActive={user.isActive} />
              </div>
            </div>

            <div className="mt-4 flex w-full justify-end gap-3 sm:mt-0 sm:w-32">
              <button
                onClick={() => onToggleActive(user)}
                title={user.isActive ? "Inativar" : "Ativar"}
                className={`
                  rounded-full p-2 text-gray-500 shadow-md transition-all 
                  hover:scale-110 hover:shadow-lg active:scale-95
                  ${
                    user.isActive
                      ? "hover:bg-yellow-100 hover:text-yellow-700"
                      : "hover:bg-green-100 hover:text-green-700"
                  }
                `}
              >
                {user.isActive ? (
                  <NoSymbolIcon className="h-5 w-5" />
                ) : (
                  <CheckCircleIcon className="h-5 w-5" />
                )}
              </button>

              <button
                onClick={() => onEdit(user)}
                title="Editar"
                className="
                  rounded-full p-2 text-blue-500 shadow-md transition-all 
                  hover:scale-110 hover:bg-blue-100 hover:shadow-lg active:scale-95
                "
              >
                <PencilSquareIcon className="h-5 w-5" />
              </button>

              <button
                onClick={() => onDelete(user)}
                title="Excluir"
                className="
                  rounded-full p-2 text-red-500 shadow-md transition-all 
                  hover:scale-110 hover:bg-red-100 hover:shadow-lg active:scale-95
                "
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
