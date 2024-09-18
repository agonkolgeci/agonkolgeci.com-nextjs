'use server';

import { defaultLocale} from '@/i18n/config';
import { Locale } from '@/i18n/locales';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'AGON-KOLGECI_WEBSITE_LOCALE';

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || defaultLocale;
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}