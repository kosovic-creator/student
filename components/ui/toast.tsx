import * as React from "react";

export type ToastType = "success" | "error" | "info";

export type Toast = {
  id: number;
  message: string;
  type?: ToastType;
};

const ToastContext = React.createContext<{
  toasts: Toast[];
  showToast: (message: string, type?: ToastType) => void;
} | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const toastId = React.useRef(0);

  const showToast = React.useCallback((message: string, type: ToastType = "success") => {
    const id = toastId.current++;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast }}>
      {children}
      <div className="fixed z-50 top-4 right-4 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`px-4 py-2 rounded shadow text-white text-sm animate-fade-in-up transition-all
              ${toast.type === "success" ? "bg-green-600" : toast.type === "error" ? "bg-red-600" : "bg-blue-600"}
            `}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.showToast;
}
