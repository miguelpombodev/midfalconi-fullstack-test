export function UserListSkeleton() {
  return (
    <div className="flex w-full animate-pulse space-x-4 rounded-lg bg-white p-4 shadow-md">
      <div className="flex-1 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200"></div> {/* Nome */}
        <div className="h-4 w-1/2 rounded bg-gray-200"></div> {/* Email */}
      </div>
      <div className="h-6 w-16 rounded-full bg-gray-200"></div> {/* Badge */}
      <div className="h-8 w-20 rounded-full bg-gray-200"></div> {/* Botões */}
    </div>
  );
}
