"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleClick = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <p
        className="text-xl cursor-pointer hover:scale-105"
        onClick={handleClick}
      >
        {resolvedTheme === "dark" ? "🌙" : "☀️"}
      </p>
    </div>
  );
}
