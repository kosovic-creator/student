/**
 * Helper funkcije za rukovanje sa URL parametrima
 */

// import { redirect } from 'next/navigation';

// /**
//  * Kreira URL sa greškama i vrijednostima polja za ponovno popunjavanje forme
//  */
// export function buildvalidacijaErrorUrl(
//   basePath: string,
//   fieldErrors: Record<string, string[] | undefined>,
//   formValues: Record<string, unknown>,
//   lang?: string
// ): string {
//   const params = new URLSearchParams();

//   // Dodaj greške
//   Object.entries(fieldErrors).forEach(([field, errors]) => {
//     if (errors?.[0]) {
//       params.append(`${field}Error`, errors[0]);
//     }
//   });

//   // Dodaj vrijednosti polja za ponovno popunjavanje
//   Object.entries(formValues).forEach(([field, value]) => {
//     if (value !== null && value !== undefined) {
//       params.append(field, String(value));
//     }
//   });

//   // Dodaj jezik ako postoji
//   if (lang) {
//     params.append('lang', lang);
//   }

//   return `${basePath}?${params.toString()}`;
// }

// /**
//  * Kreira URL sa success porukom
//  */
// export function buildSuccessUrl(
//   basePath: string,
//   successType: string,
//   lang?: string
// ): string {
//   const params = new URLSearchParams();
//   params.append('success', successType);

//   if (lang) {
//     params.append('lang', lang);
//   }

//   return `${basePath}?${params.toString()}`;
// }

// /**
//  * Kreira URL sa error porukom
//  */
// export function buildErrorUrl(
//   basePath: string,
//   errorType: string,
//   lang?: string
// ): string {
//   const params = new URLSearchParams();
//   params.append('error', errorType);

//   if (lang) {
//     params.append('lang', lang);
//   }

//   return `${basePath}?${params.toString()}`;
// }

// /**
//  * Redirect sa validacionim greškama
//  */
// export function redirectWithvalidacijaErrors(
//   basePath: string,
//   fieldErrors: Record<string, string[] | undefined>,
//   formValues: Record<string, unknown>,
//   lang?: string
// ): never {
//   const url = buildvalidacijaErrorUrl(basePath, fieldErrors, formValues, lang);
//   redirect(url);
// }

/**
 * Redirect sa success porukom
 */
// export function redirectWithSuccess(
//   basePath: string,
//   successType: string,
//   lang?: string
// ): never {
//   const url = buildSuccessUrl(basePath, successType, lang);
//   redirect(url);
// }

/**
 * Redirect sa error porukom
 */
// export function redirectWithError(
//   basePath: string,
//   errorType: string,
//   lang?: string
// ): never {
//   const url = buildErrorUrl(basePath, errorType, lang);
//   redirect(url);
// }

/**
 * Konvertuje datum u YYYY-MM-DD format za date input
 */
export function toDateInput(val: unknown): string {
  if (!val) return '';

  // Ako je već u ispravnom formatu
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) {
    return val;
  }

  const d = new Date(val as string);
  if (isNaN(d.getTime())) return '';

  return d.toISOString().slice(0, 10);
}

/**
 * Ekstrauje greške iz search params
 */
export function extractErrors(params: Record<string, string | undefined>): Record<string, string> {
  const errors: Record<string, string> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (key.endsWith('Error') && value) {
      const fieldName = key.replace('Error', '');
      errors[fieldName] = value;
    }
  });

  return errors;
}

/**
 * Ekstrauje vrijednosti forme iz search params sa fallback na default vrijednosti
 */
// export function extractFormValues<T extends Record<string, unknown>>(
//   params: Record<string, string | undefined>,
//   defaultValues: T
// ): T {
//   const formValues = { ...defaultValues };

//   Object.keys(defaultValues).forEach((key) => {
//     if (params[key] !== undefined && params[key] !== '') {
//       // @ts-expect-error - Dynamic key access
//       formValues[key] = params[key];
//     }
//   });

//   return formValues;
// }

/**
 * Vraća vrijednost polja sa prioritetom: params > dbValue > ''
 */
export function getFieldValue(
  paramVal: string | undefined,
  dbVal: unknown,
  isDate = false
): string {
  if (isDate) {
    if (paramVal && paramVal !== '') return toDateInput(paramVal);
    if (dbVal) return toDateInput(dbVal);
    return '';
  }

  if (paramVal && paramVal !== '') return paramVal;
  return dbVal ? String(dbVal) : '';
}
