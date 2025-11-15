import { CreateUserDto, Profile, UpdateUserDto, User } from "../types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const handleResponse = async (res: Response) => {
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Something went wrong");
  }

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return;
};

export const getProfiles = (): Promise<Profile[]> => {
  return fetch(`${API_URL}/profile`).then(handleResponse);
};

export const getUsers = (profileId?: string | null): Promise<User[]> => {
  let url = `${API_URL}/users`;
  if (profileId) {
    url += `?profile=${profileId}`;
  }
  return fetch(url).then(handleResponse);
};

export const createUser = (data: CreateUserDto): Promise<void> => {
  return fetch(`${API_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
};

export const updateUser = (id: string, data: UpdateUserDto): Promise<void> => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(handleResponse);
};

export const inactivateUser = (id: string): Promise<void> => {
  return fetch(`${API_URL}/users/${id}/inactivate`, {
    method: "PUT",
  }).then(handleResponse);
};

export const activateUser = (id: string): Promise<void> => {
  return updateUser(id, { isActive: true });
};

export const deleteUser = (id: string): Promise<void> => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
  }).then(handleResponse);
};
