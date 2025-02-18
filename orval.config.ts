import { defineConfig } from 'orval';

export default defineConfig({
  pulse: {
    input: './swagger.json',
    output: {
      mode: 'tags-split',
      target: './frontend/pulse/src/api/generated/index.ts',
      schemas: './frontend/pulse/src/api/generated/models',
      client: 'react-query',
      override: {
        mutator: {
          path: './frontend/pulse/src/api/axios-client.ts',
          name: 'customInstance',
        },
        query: {
          useQuery: true,
        },
      },
    },
  },
});
