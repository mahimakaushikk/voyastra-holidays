"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
      return;
    }

    let refreshing = false;
    // Guard against first-visit reload:
    // If there was no controller when the page initially loaded, clients.claim()
    // during initial SW activation will fire controllerchange. We do NOT want to reload then.
    // We only reload if there was already an active controller and a new SW replaces it.
    const hadController = Boolean(navigator.serviceWorker.controller);

    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadController) {
        return;
      }
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    const registerSW = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js", {
          scope: "/",
        });

        // 1. Check for updates on install
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              console.log("[PWA] New version detected! Activating immediately...");
              newWorker.postMessage({ type: "SKIP_WAITING" });
            }
          });
        });

        // 2. Check for updates when user returns to tab
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") {
            registration.update().catch(() => {});
          }
        });

        // 3. Periodic update check every 30 minutes
        setInterval(() => {
          registration.update().catch(() => {});
        }, 30 * 60 * 1000);
      } catch (err) {
        console.warn("[PWA] Service worker registration failed:", err);
      }
    };

    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
      return () => window.removeEventListener("load", registerSW);
    }
  }, []);

  return null;
}
