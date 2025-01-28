import { defineConfig } from 'orval';

export default defineConfig({
  pulse: {
    input: './swagger.json',
    output: {
      mode: 'tags-split',
      target: './src/api/generated/index.ts',
      schemas: './src/api/generated/schemas',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/axios-client.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
          useInfinite: true,
          useInfiniteQueryParam: 'page',
        },
      },
    },
  },
});
