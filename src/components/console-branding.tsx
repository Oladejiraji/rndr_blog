"use client";

import { useEffect } from "react";

export function ConsoleBranding() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      console.log(
        "%c Built by RNDR Realm ",
        "background: #000; color: #fff; font-size: 14px; padding: 8px 16px; border-radius: 4px; font-weight: bold;",
      );
      console.log(
        "%chttps://rndrealm.com",
        "color: #888; font-size: 12px; padding: 2px 0;",
      );
    }
  }, []);

  return null;
}
