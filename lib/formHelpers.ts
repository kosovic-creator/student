/* eslint-disable @typescript-eslint/no-explicit-any */

export function createErrorRedirect(
  path: string,
  errors: Record<string, string[] | undefined>,
  formValues: Record<string, string | number | boolean>
): string {
  const params = new URLSearchParams();

  // Dodaj greške
  Object.entries(errors).forEach(([key, value]) => {
    if (value?.[0]) {
      params.append(`${key}Error`, value[0]);
    }
  });

  // Dodaj vrijednosti
  Object.entries(formValues).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, value.toString());
    }
  });

  return `${path}?${params.toString()}`;
}

/**
 * Kreira URL za success redirect
 */
export function createSuccessRedirect(
  path: string,
  message: string
): string {
  const params = new URLSearchParams();
  params.append('success', message);
  return `${path}?${params.toString()}`;
}

/**
 * Kreira URL za error redirect
 */
export function createFailureRedirect(
  path: string,
  message: string
): string {
  const params = new URLSearchParams();
  params.append('error', message);
  return `${path}?${params.toString()}`;
}

/**
 * Konvertuje datum u format za HTML input type="date" (YYYY-MM-DD)
 */
export function toDateInput(val: any): string {
  if (!val) return '';
  if (typeof val === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(val)) return val;
  const d = new Date(val);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().slice(0, 10);
}

/**
 * Dobija vrijednost polja sa fallback-om
 */
export function getFieldValue(
  paramValue: string | undefined,
  dbValue: any,
  isDate = false
): string {
  if (isDate) {
    if (paramValue && paramValue !== '') return toDateInput(paramValue);
    if (dbValue) return toDateInput(dbValue);
    return '';
  }
  if (paramValue && paramValue !== '') return paramValue;
  return dbValue?.toString() ?? '';
}

/**
 * Kreira objekat sa greškama iz search params
 */
export function extractErrors(params: Record<string, string>, fields: string[]): Record<string, string> {
  const errors: Record<string, string> = {};
  fields.forEach(field => {
    const errorKey = `${field}Error`;
    if (params[errorKey]) {
      errors[field] = params[errorKey];
    }
  });
  return errors;
}

/**
 * Kreira objekat sa vrijednostima forme iz search params sa fallback-om
 */
export function extractFormData(
  params: Record<string, string>,
  dbData: Record<string, any> | null,
  fields: string[],
  dateFields: string[] = []
): Record<string, string> {
  const formData: Record<string, string> = {};
  fields.forEach(field => {
    const isDate = dateFields.includes(field);
    formData[field] = getFieldValue(params[field], dbData?.[field], isDate);
  });
  return formData;
}
