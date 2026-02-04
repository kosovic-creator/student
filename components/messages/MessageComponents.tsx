"use client";

import { MessageType, MessageStyles, MessageIcons } from '@/lib/constants/messages';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';

type MessageBannerProps = {
  type: MessageType;
  message: string; // translation key
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
  clearUrlParams?: boolean;
  namespace?: string; // i18n namespace (default: 'common')
};

export function MessageBanner({
  type,
  message,
  onClose,
  autoClose = true,
  autoCloseDuration = 3000,
  clearUrlParams = true,
  namespace = 'common'
}: MessageBannerProps) {
  const styles = MessageStyles[type];
  const icon = MessageIcons[type];
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation(namespace);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      if (clearUrlParams) {
        router.replace(pathname);
      }
      onClose?.();
    }, 300);
  }, [clearUrlParams, pathname, router, onClose]);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, handleClose]);

  if (!isVisible || !message) {
    return null;
  }

  return (
    <div
      className={`border rounded-lg p-4 mb-4 flex items-center justify-between backdrop-blur-sm bg-opacity-95 transition-opacity duration-300 ${styles} ${isVisible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold">{icon}</span>
        <span>{t(message)}</span>
      </div>
      <button
        onClick={handleClose}
        className="text-current hover:opacity-70 ml-4"
        aria-label="Close"
      >
        ✕
      </button>
    </div>
  );
}

type SuccessMessageProps = {
  message: string; // translation key
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
  clearUrlParams?: boolean;
  namespace?: string;
};

export function SuccessMessage({ message, onClose, autoClose, autoCloseDuration, clearUrlParams, namespace }: SuccessMessageProps) {
  return <MessageBanner type={MessageType.SUCCESS} message={message} onClose={onClose} autoClose={autoClose} autoCloseDuration={autoCloseDuration} clearUrlParams={clearUrlParams} namespace={namespace} />;
}

type ErrorMessageProps = {
  message: string; // translation key
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
  clearUrlParams?: boolean;
  namespace?: string;
};

export function ErrorMessage({ message, onClose, autoClose, autoCloseDuration, clearUrlParams, namespace }: ErrorMessageProps) {
  return <MessageBanner type={MessageType.ERROR} message={message} onClose={onClose} autoClose={autoClose} autoCloseDuration={autoCloseDuration} clearUrlParams={clearUrlParams} namespace={namespace} />;
}

type WarningMessageProps = {
  message: string; // translation key
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
  clearUrlParams?: boolean;
  namespace?: string;
};

export function WarningMessage({ message, onClose, autoClose, autoCloseDuration, clearUrlParams, namespace }: WarningMessageProps) {
  return <MessageBanner type={MessageType.WARNING} message={message} onClose={onClose} autoClose={autoClose} autoCloseDuration={autoCloseDuration} clearUrlParams={clearUrlParams} namespace={namespace} />;
}

type InfoMessageProps = {
  message: string; // translation key
  onClose?: () => void;
  autoClose?: boolean;
  autoCloseDuration?: number;
  clearUrlParams?: boolean;
  namespace?: string;
};

export function InfoMessage({ message, onClose, autoClose, autoCloseDuration, clearUrlParams, namespace }: InfoMessageProps) {
  return <MessageBanner type={MessageType.INFO} message={message} onClose={onClose} autoClose={autoClose} autoCloseDuration={autoCloseDuration} clearUrlParams={clearUrlParams} namespace={namespace} />;
}
