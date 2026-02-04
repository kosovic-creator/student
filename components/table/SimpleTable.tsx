import { ReactNode } from 'react';

type SimpleTableProps = {
  children: ReactNode;
  className?: string;
};

export function SimpleTable({ children, className = '' }: SimpleTableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800 ${className}`}>
      <table className="w-full text-sm">
        {children}
      </table>
    </div>
  );
}

type TableHeadProps = {
  children: ReactNode;
  className?: string;
};

export function TableHead({ children, className = '' }: TableHeadProps) {
  return (
    <thead className={`bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 ${className}`}>
      {children}
    </thead>
  );
}

type TableBodyProps = {
  children: ReactNode;
};

export function TableBody({ children }: TableBodyProps) {
  return (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
      {children}
    </tbody>
  );
}

type TableRowProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export function TableRow({ children, onClick, className = '' }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={`hover:bg-gray-50 dark:hover:bg-gray-800 transition ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </tr>
  );
}

type TableHeaderProps = {
  children: ReactNode;
  sortable?: boolean;
  onClick?: () => void;
  className?: string;
};

export function TableHeaderCell({ children, sortable, onClick, className = '' }: TableHeaderProps) {
  return (
    <th
      onClick={onClick}
      className={`px-4 py-3 text-left font-semibold text-gray-700 dark:text-gray-300 ${
        sortable ? 'cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800' : ''
      } ${className}`}
    >
      {children}
    </th>
  );
}

type TableCellProps = {
  children: ReactNode;
  className?: string;
};

export function TableCell({ children, className = '' }: TableCellProps) {
  return (
    <td className={`px-4 py-3 text-gray-900 dark:text-gray-100 ${className}`}>
      {children}
    </td>
  );
}