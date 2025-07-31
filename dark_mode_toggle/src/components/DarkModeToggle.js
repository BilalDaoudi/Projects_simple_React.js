import React, { useEffect, useState } from "react";

function DarkModeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark") === "true";
    setDark(saved);
    document.body.className = saved ? "dark" : "light";
  }, []);

  const toggle = () => {
    setDark(!dark);
    document.body.className = !dark ? "dark" : "light";
    localStorage.setItem("dark", !dark);
  };

  return (
    <div className="toggle">
      <button onClick={toggle}>
        {dark ? "☀️ Mode Clair" : "🌙 Mode Sombre"}
      </button>
    </div>
  );
}

export default DarkModeToggle;
