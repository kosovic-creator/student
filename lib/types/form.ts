/**
 * Reusable Form Components Pattern
 */

import { ReactNode } from 'react';

/**
 * Props za form wrapper komponentu
 */
export type FormWrapperProps = {
  title: string;
  action: (formData: FormData) => void | Promise<void>;
  children: ReactNode;
  submitLabel: string;
  cancelLabel: string;
  cancelHref: string;
  noValidate?: boolean;
};

/**
 * Props za form field
 */
export type FormFieldProps = {
  label?: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: ReactNode;
};

/**
 * Props za form actions (submit/cancel buttons)
 */
export type FormActionsProps = {
  submitLabel: string;
  cancelLabel: string;
  cancelHref: string;
  isSubmitting?: boolean;
};

/**
 * Form field tipovi
 */
export type InputFieldType = 'text' | 'email' | 'password' | 'number' | 'date' | 'tel';

export type InputFieldProps = {
  name: string;
  label?: string;
  type?: InputFieldType;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

export type SelectOption = {
  value: string | number;
  label: string;
};

export type SelectFieldProps = {
  name: string;
  label?: string;
  options: SelectOption[];
  defaultValue?: string | number;
  placeholder?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

/**
 * Form state tip
 */
export type FormState<T> = {
  values: T;
  errors: Record<keyof T, string>;
  isSubmitting: boolean;
};

/**
 * Form config
 */
export type FormConfig<T> = {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validacija?: (values: T) => Record<keyof T, string>;
};
