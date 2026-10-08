'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { Messages } from './dictionary';
import type { Locale } from './config';

const I18nContext = createContext<{ locale: Locale; messages: Messages } | null>(null);

export function I18nProvider({ locale, messages, children }: { locale: Locale; messages: Messages; children: ReactNode }) {
  return <I18nContext.Provider value={{ locale, messages }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside I18nProvider');
  return context;
}
