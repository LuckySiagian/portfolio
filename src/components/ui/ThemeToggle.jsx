// Compact icon button that switches between dark and light themes.
// Shows the icon of the theme it will switch TO (sun while dark, moon while light).
export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-surface/50 text-base text-muted transition-colors duration-200 hover:border-cyan/50 hover:text-cyan"
    >
      <span className="text-sm leading-none">{isDark ? "☀" : "☾"}</span>
    </button>
  );
}
