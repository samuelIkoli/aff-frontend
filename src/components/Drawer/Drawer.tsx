"use client";

import { useEffect, useRef, useState } from "react";
import { DrawerView } from "./DrawerView";
import type { DrawerProps } from "./DrawerView";

export default function Drawer(props: DrawerProps) {
    const { open, onOpenChange } = props;
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [mounted, setMounted] = useState(false);

    // Only run on client
    useEffect(() => {
        setMounted(true);
    }, []);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onOpenChange(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onOpenChange]);

    // Prevent scroll
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    // Focus management
    useEffect(() => {
        if (open && panelRef.current) {
            const el = panelRef.current.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            el?.focus();
        }
    }, [open]);

    if (!mounted) return null;

    return <DrawerView {...props} panelRef={panelRef} />;
}
