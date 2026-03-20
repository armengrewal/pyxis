(function () {
  const root = document.documentElement;
  const storageKey = "pyxis-theme";
  const toggleButton = document.querySelector("[data-theme-toggle]");
  const lightIconPath = "assets/app icons/App Icon.png";
  const darkIconPath = "assets/app icons/App Icon - Dark.png";

  const getPreferredTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const setToggleLabel = (theme) => {
    if (!toggleButton) return;
    const nextTheme = theme === "dark" ? "light" : "dark";
    toggleButton.setAttribute("data-theme-icon", theme === "dark" ? "moon" : "sun");
    toggleButton.setAttribute("aria-label", `Switch to ${nextTheme} mode`);
    toggleButton.setAttribute("title", `Switch to ${nextTheme} mode`);
    toggleButton.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  };

  const syncAppIcons = (theme) => {
    const iconPath = theme === "dark" ? darkIconPath : lightIconPath;
    const heroIcons = document.querySelectorAll("img.icon");
    const touchIcon = document.querySelector('link[rel~="apple-touch-icon"]');

    heroIcons.forEach((icon) => {
      icon.setAttribute("src", iconPath);
    });

    if (touchIcon) {
      touchIcon.setAttribute("href", iconPath);
    }
  };

  const applyTheme = (theme, persist) => {
    root.setAttribute("data-theme", theme);
    setToggleLabel(theme);
    syncAppIcons(theme);
    if (persist) {
      localStorage.setItem(storageKey, theme);
    }
  };

  const savedTheme = localStorage.getItem(storageKey);
  const initialTheme = savedTheme === "dark" || savedTheme === "light" ? savedTheme : getPreferredTheme();
  applyTheme(initialTheme, false);

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const currentTheme = root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme, true);
    });
  }
})();
