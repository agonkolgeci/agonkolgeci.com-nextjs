'use server';

import { getDefaultLocale } from '@/i18n/config';
import { Locale } from '@/i18n/locales';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'agonkolgeci_locale';

export async function getUserLocale() {
  return cookies().get(COOKIE_NAME)?.value || getDefaultLocale();
}

export async function setUserLocale(locale: Locale) {
  cookies().set(COOKIE_NAME, locale);
}