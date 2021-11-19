import sidebarConfig from './data/settings/sidebar.json';
import {getLanguageFromURL, getSlugFromFilename, getLanguageFromFilename, DEFAULT_LOCALE} from './languages';


export function getSections({currentPage, allPages}) {
  const langCode = getLanguageFromURL(currentPage);

  function buildPageObj(slug: string) {
    // Find the right file and the right language
    let page = allPages.find(p => 
      getSlugFromFilename(p.file.pathname) === slug && getLanguageFromFilename(p.file.pathname) === langCode
    );
    // If there wasn't a translated version, fall back to default.
    if (!page) {
      page = allPages.find(p => getSlugFromFilename(p.file.pathname) === slug && getLanguageFromFilename(p.file.pathname) === DEFAULT_LOCALE);
    }

    return {title: page.title, href: `/${langCode}/${page.slug}` }
  }

  return sidebarConfig.sidebar.map(section => {
    const root = buildPageObj(section.rootPage);
    const children = section.pages?.map(p => buildPageObj(p.page));
    return {root, children};
  });
}
