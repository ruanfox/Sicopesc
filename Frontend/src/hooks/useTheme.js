import { useCallback, useEffect, useRef, useState } from "react";

export default function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const lightTheme = useRef({
    colors: {
      background: "#fefefe",
      text: "#41424a",
      primary: "#0892C9",
      secondary: "#007DF5",
      border: "#ced4da",
      success: "#5CB85C",
      background_2: "#ffffff",
      background_3: "#F9FAFB",
      background_4: "#E9ECEF",
      background_5: "#2D2D31",
    },
  });

  const darkTheme = useRef({
    colors: {
      background: "#41424A",
      text: "#fefefe",
      primary: "#0892C9",
      secondary: "#007DF5",
      border: "#1F2023",
      success: "#5CB85C",
      background_2: "#2D2D31",
      background_3: "#1F2023",
    },
  });

  const [themeColor, setThemeColor] = useState(lightTheme.current);

  const toggleDarkMode = useCallback(() => {
    return;
    /*setIsDarkMode((state) => {
      localStorage.setItem("dark_mode", !state);
      return !state;
    });
    window.location.reload();*/
  }, []);

  useEffect(() => {
    /*let darkMode = localStorage.getItem("dark_mode");

    if (darkMode === null) {
      //verify dark mode so
      console.log(
        window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
      );
      if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        darkMode = "true";
        localStorage.setItem("dark_mode", "true");
      }
    }

    if (!darkMode) {
      localStorage.setItem("dark_mode", "false");
      darkMode = "false";
    }*/

    setIsDarkMode(false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      setThemeColor(darkTheme.current);
      return;
    }

    setThemeColor(lightTheme.current);
  }, [isDarkMode, darkTheme, lightTheme]);

  return { isDarkMode, toggleDarkMode, themeColor };
}
