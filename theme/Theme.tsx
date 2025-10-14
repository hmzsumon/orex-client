/* ────────── File: theme/Theme.tsx ────────── */

/**
 * Global theme tokens + a few utility classes used across the KYC screens.
 * Drop this once in your root layout/page (already used in KycPage).
 *
 * ❗ Keep styles minimal and non-intrusive; names match your current usage:
 * .bg-bg, .bg-panel, .card, .btn, .btn-magenta, .btn-accent, .text-muted, .text-danger, .text-accent
 */

export default function Theme() {
  return (
    <style jsx global>{`
      :root {
        --bg: #0b1017;
        --panel: #0f141b;
        --panel-2: #121921;
        --text: #e7eef8;
        --muted: #9aa4b2;
        --magenta: #d946ef; /* primary CTA */
        --magenta-600: #c026d3;
        --accent: #1ee6c5; /* green-cyan ring/accent */
        --danger: #ef4444;
        --ring: rgba(255, 255, 255, 0.1);
        --border: rgba(255, 255, 255, 0.08);
        --card-radius: 16px;
        --btn-radius: 14px;
      }

      /* base */
      html,
      body {
        background: var(--bg);
        color: var(--text);
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto,
          Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      /* simple helpers you are using in JSX */
      .bg-bg {
        background: var(--bg);
      }
      .bg-panel {
        background: var(--panel);
      }
      .text-muted {
        color: var(--muted);
      }
      .text-danger {
        color: var(--danger);
      }
      .text-accent {
        color: var(--accent);
      }

      /* ring-accent (used on selected doc buttons) */
      .ring-accent {
        box-shadow: 0 0 0 2px var(--accent) inset !important;
      }

      /* CARD */
      .card {
        background: var(--panel);
        border: 1px solid var(--border);
        border-radius: var(--card-radius);
      }

      /* BUTTONS */
      .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 44px;
        padding: 0 16px;
        border-radius: var(--btn-radius);
        border: 0;
        outline: 0;
        transition: opacity 0.15s ease, background 0.15s ease,
          transform 0.02s ease;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }
      .btn:active {
        transform: translateY(0.5px);
      }

      .btn-magenta {
        background: var(--magenta);
        color: #fff;
      }
      .btn-magenta:hover {
        opacity: 0.95;
      }
      .btn-magenta:disabled,
      .btn-magenta[disabled] {
        background: var(--panel);
        color: var(--muted);
        cursor: not-allowed;
        opacity: 1;
      }

      .btn-accent {
        background: var(--accent);
        color: #0b1017;
      }
      .btn-accent:hover {
        opacity: 0.95;
      }

      /* Inputs (used in personal details) */
      input,
      textarea,
      select {
        font: inherit;
      }
      input::file-selector-button {
        font: inherit;
      }

      /* Scrollbar (subtle, dark) */
      * {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.12) transparent;
      }
      *::-webkit-scrollbar {
        height: 10px;
        width: 10px;
      }
      *::-webkit-scrollbar-track {
        background: transparent;
      }
      *::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.12);
        border-radius: 10px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }

      /* Toastify theme overrides (keeps your design intact) */
      .Toastify__toast-theme--dark {
        background: var(--panel);
        color: var(--text);
        border: 1px solid var(--border);
      }
      .Toastify__toast-icon svg {
        opacity: 0.9;
      }
      .Toastify__progress-bar--dark {
        background: var(--magenta);
      }
    `}</style>
  );
}
