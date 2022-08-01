import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";

library.add(faSun, faMoon);
const ChangeThemeButton: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button aria-label="DarkModeToggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {mounted && <>{theme === "dark" ? <FontAwesomeIcon icon="moon" size="2x" /> : <FontAwesomeIcon icon="sun" size="2x" />}</>}
      </button>
    </>
  );
};
export default ChangeThemeButton;
