"use client";

import { useEffect, useState } from "react";

function DesktopMonitorIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer monitor bezel */}
      <rect x="3" y="4" width="28" height="18" rx="3" fill="#2d2c28" stroke="#4c4a43" strokeWidth="1.5" />
      {/* Blue screen display */}
      <rect x="5" y="6" width="24" height="14" rx="1.5" fill="#4fa3e3" />
      {/* Glossy screen diagonal reflection */}
      <path d="M5 6L21 6L5 18Z" fill="white" fillOpacity="0.24" />
      {/* Stand neck */}
      <rect x="14" y="22" width="6" height="4" fill="#3b3a36" />
      {/* Keyboard / base stand */}
      <rect x="9" y="26" width="16" height="3" rx="1" fill="#4c4a43" />
    </svg>
  );
}

export default function MobileDesktopNoticePopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isDismissed = sessionStorage.getItem("mobile_desktop_notice_dismissed");
    if (isDismissed) return;

    const checkMobile = () => {
      const isNarrow = window.innerWidth <= 1024;
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
      if (isNarrow || isMobileUA) {
        setIsVisible(true);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem("mobile_desktop_notice_dismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <aside className="mobile-desktop-notice" role="dialog" aria-label="Desktop recommendation notice">
      <div className="mobile-desktop-notice__content">
        <div className="mobile-desktop-notice__icon" aria-hidden="true">
          <DesktopMonitorIcon />
        </div>
        <p className="mobile-desktop-notice__text">
          Best experienced on desktop — grab a bigger screen for the full experience.
        </p>
        <button
          type="button"
          className="mobile-desktop-notice__close"
          onClick={handleDismiss}
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </aside>
  );
}
