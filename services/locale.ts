'use server';

import { getDefaultLocale } from '@/i18n/config';
import { Locale } from '@/i18n/locales';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'agonkolgeci_locale';

export async function getUserLocale() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value || getDefaultLocale();
}

export async function setUserLocale(locale: Locale) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, locale);
}