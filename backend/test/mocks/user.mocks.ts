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

const mockUsersService = {
  createUserAsync: jest.fn(),
  findAllUsersAsync: jest.fn(),
  inactivateUserAsync: jest.fn(),
  findOneUserAsync: jest.fn(),
  updateUserAsync: jest.fn(),
  deleteUserAsync: jest.fn(),
};

const mockCacheManager = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

const mockCacheInterceptor = {
  intercept: jest.fn((context, next) => next.handle()),
};

export {
  mockUsersRepository,
  mockLogger,
  mockUsersService,
  mockCacheManager,
  mockCacheInterceptor,
};
