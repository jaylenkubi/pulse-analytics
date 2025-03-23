import { defineConfig } from 'orval';

// Orval v6 configuration
const config = {
  pulse: {
    input: './swagger.json',
    output: {
      mode: 'tags-split',
      target: './frontend/pulse/src/api/generated/index.ts',
      schemas: './frontend/pulse/src/api/generated/models',
      client: 'react-query',
      mock: false,
      override: {
        useDates: true,
        mutator: {
          path: './frontend/pulse/src/api/axios-client.ts',
          name: 'customInstance',
        },
        operations: {
          GetByQuery: {
            query: {
              useQuery: true
            }
          }
        }
      },
    },
  },
};

// For Orval v6
export = config;
