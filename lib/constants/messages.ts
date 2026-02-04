/**
 * Konstante za success i error poruke
 */

export enum MessageType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

export const MessageStyles: Record<MessageType, string> = {
  [MessageType.SUCCESS]: 'text-green-600 bg-green-50 border-green-200',
  [MessageType.ERROR]: 'text-red-600 bg-red-50 border-red-200',
  [MessageType.WARNING]: 'text-yellow-600 bg-yellow-50 border-yellow-200',
  [MessageType.INFO]: 'text-blue-600 bg-blue-50 border-blue-200',
};

export const MessageIcons: Record<MessageType, string> = {
  [MessageType.SUCCESS]: '✓',
  [MessageType.ERROR]: '✕',
  [MessageType.WARNING]: '⚠',
  [MessageType.INFO]: 'ℹ',
};