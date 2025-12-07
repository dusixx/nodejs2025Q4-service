declare namespace NodeJS {
  type ProcessEnv = {
    PORT: string;
    POSTGRES_PORT: string;
    TEST_MODE: string;
    POSTGRES_URL: string;
    NODE_ENV: 'development' | 'production' | 'test';
  };
}
