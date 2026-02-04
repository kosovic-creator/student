/**
 * Tipovi za search parametere
 */

/**
 * Opšti tip za search params sa validacionim greškama
 */
export type validacijaSearchParams<T extends string> = {
  lang?: 'en' | 'mn';
  success?: string;
  error?: string;
} & {
  [K in T as `${K}Error`]?: string;
} & {
  [K in T]?: string;
};

/**
 * Search params za rezervacije
 */


export type StudentSearchParams = validacijaSearchParams<
  'ime'
> & {
  studentId?: string;
};

export type CommonSearchParams = {
  lang?: string;
};

/**
 * Opšti async search params wrapper
 */
export type AsyncSearchParams<T> = Promise<T>;

/**
 * Props za stranice sa search params
 */
export type PagePropsWithSearchParams<T = Record<string, string>> = {
  searchParams: AsyncSearchParams<T>;
};

/**
 * Extract type - konvertuje Promised tip u originalni tip
 */
export type Awaited<T> = T extends Promise<infer U> ? U : T;

/**
 * Jezik tip
 */
export type Language = 'en' | 'mn';

/**
 * Base page props
 */
export type BasePageProps = {
  searchParams: AsyncSearchParams<{
    lang?: string;
  }>;
};

/**
 * Success/Error message types
 */
export type MessageType = 'success' | 'error' | 'warning' | 'info';

/**
 * Message params u URL-u
 */
export type MessageParams = {
  success?: string;
  error?: string;
  warning?: string;
  info?: string;
};
