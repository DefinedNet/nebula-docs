import sidebarConfig from './data/settings/sidebar.json';
import {getLanguageFromURL, getSlugFromFilename, getLanguageFromFilename, DEFAULT_LOCALE} from './languages';
import {SITE} from './config';

export function getSections({currentPage, allPages}) {
  const langCode = getLanguageFromURL(currentPage);

  return sidebarConfig.sidebar.map(section => {
    const root = buildPageObj(section.rootPage, langCode, allPages);
    const children = section.pages?.map(p => buildPageObj(p.page, langCode, allPages));
    return {root, children};
  });
}

export function getPageLinks({currentPage, allPages}) {
  const langCode = getLanguageFromURL(currentPage);

  return sidebarConfig.sidebar.map(section => {
    const root = buildPageObj(section.rootPage, langCode, allPages);
    const children = section.pages?.map(p => buildPageObj(p.page, langCode, allPages)) ?? [];
    
    // Don't want to include root page if there are children
    if (children.length) {
      return children
    }
    return [root];
  }).flat();
}

function buildPageObj(slug: string, langCode: string, allPages: any) {
  // Find the right file and the right language
  let page = allPages.find(p => 
    getSlugFromFilename(p.file) === slug && getLanguageFromFilename(p.file) === langCode
  );
  // If there wasn't a translated version, fall back to default.
  if (!page) {
    page = allPages.find(p => getSlugFromFilename(p.file) === slug && getLanguageFromFilename(p.file) === DEFAULT_LOCALE);
  }
  return {title: page.frontmatter.title, href: `${SITE.root}/${langCode}/${page.frontmatter.slug}/` }
}
