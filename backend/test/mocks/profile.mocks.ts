const mockProfilesService = {
  findAllProfilesAsync: jest.fn(),
};

const mockCacheInterceptor = {
  intercept: jest.fn((context, next) => next.handle()),
};

export { mockProfilesService, mockCacheInterceptor };
