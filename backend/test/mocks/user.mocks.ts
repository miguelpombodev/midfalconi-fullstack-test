const mockUsersRepository = {
  getUserByEmail: jest.fn(),
  createUser: jest.fn(),
  getById: jest.fn(),
  updateUser: jest.fn(),
  getAll: jest.fn(),
  deleteUser: jest.fn(),
};

const mockLogger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

export { mockUsersRepository, mockLogger };
