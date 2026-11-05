import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware(({ locals }) => {
  const route = locals.starlightRoute;

  // `/` only redirects to `/docs/`, so the logo links straight there.
  route.siteTitleHref = '/docs/';

  // Starlight sets og:title to the bare frontmatter title; link previews use the full <title>,
  // including pages that override it in their `head` frontmatter.
  const title = route.head.findLast(({ tag }) => tag === 'title')?.content;
  const ogTitle = route.head.find(({ tag, attrs }) => tag === 'meta' && attrs?.property === 'og:title');
  if (title && ogTitle?.attrs) ogTitle.attrs.content = title;
});
