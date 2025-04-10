/// <reference path="./.sst/platform/config.d.ts" />

// Project configuration constants
const PROJECT_NAME: string = 'florin'; // Must be set by developer, must only contain alphanumeric characters and hyphens
const CUSTOMER: string = 'florin'; // Must be set by developer, must only contain alphanumeric characters and hyphens

export default $config({
  app(input) {
    return {
      name: PROJECT_NAME,
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: {
          defaultTags: {
            tags: { customer: CUSTOMER, stage: input.stage },
          },
        },
      },
    };
  },
  async run() {
    const ui = new sst.aws.StaticSite(`${PROJECT_NAME}-ui`, {
      path: '.',
      build: {
        command: 'npm run build',
        output: 'dist',
      },
      errorPage: 'index.html',
    });
    // UI <-

    return {
      ui: ui.url,
    };
  },
});
