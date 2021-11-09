import CMS from "netlify-cms-app";
import { de } from 'netlify-cms-locales';
import { config } from './netlify-cms-config';

CMS.registerLocale('de', de);
CMS.init({config});
