import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { type ReactNode, useEffect } from "react";
import { Button } from "./DFButton";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
};

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  size = "md",
  className,
}: ModalProps) {
  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="modal.dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/30 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClose();
        }}
        aria-hidden="true"
      />
      {/* Modal panel */}
      <dialog
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={cn(
          "relative z-10 w-full rounded-2xl bg-card shadow-elevated border border-border flex flex-col max-h-[90vh] m-0 p-0 open:flex",
          sizeMap[size],
          className,
        )}
        open
      >
        {/* Header */}
        {(title != null || onClose != null) && (
          <div className="flex items-start justify-between gap-4 p-6 pb-4 border-b border-border">
            <div className="min-w-0">
              {title && (
                <h2
                  id="modal-title"
                  className="font-display text-lg font-semibold text-foreground"
                >
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-sm text-muted-foreground mt-0.5">
                  {description}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              aria-label="Close modal"
              data-ocid="modal.close_button"
              className="shrink-0 -mt-1 -mr-1"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">{children}</div>
        {/* Footer */}
        {footer && (
          <div className="p-6 pt-4 border-t border-border flex justify-end gap-3">
            {footer}
          </div>
        )}
      </dialog>
    </div>
  );
}
