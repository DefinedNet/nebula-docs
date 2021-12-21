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
    getSlugFromFilename(p.file.pathname) === slug && getLanguageFromFilename(p.file.pathname) === langCode
  );
  // If there wasn't a translated version, fall back to default.
  if (!page) {
    page = allPages.find(p => getSlugFromFilename(p.file.pathname) === slug && getLanguageFromFilename(p.file.pathname) === DEFAULT_LOCALE);
  }
  return {title: page.title, href: `${SITE.root}/${langCode}/${page.slug}/` }
}
