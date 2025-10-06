import { createPortal } from "react-dom";
import clsx from "clsx";
import { RefObject } from "react";

export type DrawerProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    side?: "right" | "left";
    width?: number;
    children: React.ReactNode;
    overlayClassName?: string;
    panelClassName?: string;
    ariaLabel?: string;
};

type DrawerViewProps = DrawerProps & {
    panelRef: RefObject<HTMLDivElement | null>;
};

export function DrawerView({
    open,
    onOpenChange,
    side = "right",
    width = 380,
    children,
    overlayClassName,
    panelClassName,
    ariaLabel = "Side drawer",
    panelRef,
}: DrawerViewProps) {
    return createPortal(
        <div
            aria-hidden={!open}
            aria-label={ariaLabel}
            className={clsx(
                "fixed inset-0 z-[60] pointer-events-none",
                open && "pointer-events-auto"
            )}
        >
            {/* Overlay */}
            <div
                onClick={() => onOpenChange(false)}
                className={clsx(
                    "absolute inset-0 bg-black/30 transition-opacity",
                    open ? "opacity-100" : "opacity-0",
                    overlayClassName
                )}
            />

            {/* Panel */}
            <div
                ref={panelRef}
                style={{ width }}
                className={clsx(
                    "absolute top-0 h-full bg-white shadow-xl border-l border-gray-200 outline-none flex flex-col",
                    side === "right" ? "right-0" : "left-0 border-l-0 border-r",
                    open
                        ? "translate-x-0"
                        : side === "right"
                            ? "translate-x-full"
                            : "-translate-x-full",
                    "transition-transform will-change-transform duration-200 ease-out",
                    panelClassName
                )}
                tabIndex={-1}
            >
                {children}
            </div>
        </div>,
        document.body
    );
}
