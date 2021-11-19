import sidebarConfig from './data/settings/sidebar.json';
import {getLanguageFromURL, getSlugFromFilename, getLanguageFromFilename, DEFAULT_LOCALE} from './languages';


export function getPageLinks({currentPage, allPages}) {
  const langCode = getLanguageFromURL(currentPage);
  const orderedPageSlugs = sidebarConfig.sidebar.map(s => [s.rootPage, ...(s.pages ?? []).map(p => p.page)]);

  return orderedPageSlugs.map(sectionSlugs => {
    return sectionSlugs.map((pageSlug, index) => {
      // Find the right file and the right language
      let page = allPages.find(p => 
        getSlugFromFilename(p.file.pathname) === pageSlug && getLanguageFromFilename(p.file.pathname) === langCode
      );
    
      // If there wasn't a translated version, fall back to default.
      if (!page) {
        page = allPages.find(p => getSlugFromFilename(p.file.pathname) === pageSlug && getLanguageFromFilename(p.file.pathname) === DEFAULT_LOCALE);
      }
    
      return {title: page.title, href: `/${langCode}/${page.slug}`, isHeading: index === 0 }
    });
  }).flat();
}
