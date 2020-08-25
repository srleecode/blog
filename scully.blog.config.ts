import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './apps/blog/src',
  projectName: 'blog',
  pluginDir: './scully/plugins/',
  outDir: './dist/static',
  routes: {
    '/posts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './posts',
      },
    },
    '/code-review-checklist/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './code-review-checklist',
      },
    },
    '/concepts/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './concepts',
      },
    },
    '/ideals/:slug': {
      type: 'contentFolder',
      slug: {
        folder: './ideals',
      },
    },
  },
};
