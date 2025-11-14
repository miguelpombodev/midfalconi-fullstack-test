export interface IBaseRepository<T> {
  getById(id: string): Promise<T | null>;
  getAll(): Promise<T[]>;
}
