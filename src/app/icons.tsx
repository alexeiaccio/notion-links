export type IconName = keyof typeof ICONS

export function Icons({ name }: { name: IconName }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  )
}

const ICONS = {
  behance: (
    <path d="M3 18v-12h4.5a3 3 0 0 1 0 6a3 3 0 0 1 0 6h-4.5m0 -6l4.5 0m6.5 1h7a3.5 3.5 0 0 0 -7 0v2a3.5 3.5 0 0 0 6.64 1m-4.64 -10l3 0" />
  ),
  discord: (
    <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0m7 0m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0m-6.5 -4.5c3.5 -1 5.5 -1 9 0m-9.5 9c3.5 1 6.5 1 10 0m-1.5 .5c0 1 1.5 3 2 3c1.5 0 2.833 -1.667 3.5 -3c.667 -1.667 .5 -5.833 -1.5 -11.5c-1.457 -1.015 -3 -1.34 -4.5 -1.5l-1 2.5m-5.5 10.5c0 1 -1.356 3 -1.832 3c-1.429 0 -2.698 -1.667 -3.333 -3c-.635 -1.667 -.476 -5.833 1.428 -11.5c1.388 -1.015 2.782 -1.34 4.237 -1.5l1 2.5" />
  ),
  dribbble: (
    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0m6 -8.4c5 6 7 10.5 7.5 16.2m-10.1 -.8c3.5 -3.5 6 -6.5 14.5 -6.4m-17.8 -1.85c5 0 9.814 -.38 15.314 -5" />
  ),
  email: (
    <path d="M10 21v-6.5a3.5 3.5 0 0 0 -7 0v6.5h18v-6a4 4 0 0 0 -4 -4h-10.5m5.5 0v-8h4l2 2l-2 2h-4m-6 8h1" />
  ),
  facebook: (
    <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
  ),
  github: (
    <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
  ),
  instagram: (
    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4zm8 4m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0m7.5 -4.5l0 0" />
  ),
  linkedin: (
    <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2zm4 5l0 5m0 -8l0 .01m4 7.99l0 -5m4 5v-3a2 2 0 0 0 -4 0" />
  ),
  mastodon: (
    <path d="M18.648 15.254c-1.816 1.763 -6.648 1.626 -6.648 1.626a18.262 18.262 0 0 1 -3.288 -.256c1.127 1.985 4.12 2.81 8.982 2.475c-1.945 2.013 -13.598 5.257 -13.668 -7.636l-.026 -1.154c0 -3.036 .023 -4.115 1.352 -5.633c1.671 -1.91 6.648 -1.666 6.648 -1.666s4.977 -.243 6.648 1.667c1.329 1.518 1.352 2.597 1.352 5.633s-.456 4.074 -1.352 4.944zm-6.648 -4.05v-2.926c0 -1.258 -.895 -2.278 -2 -2.278s-2 1.02 -2 2.278v4.722m4 -4.722c0 -1.258 .895 -2.278 2 -2.278s2 1.02 2 2.278v4.722" />
  ),
  pinterest: (
    <path d="M8 20l4 -9m-1.3 3c.437 1.263 1.43 2 2.55 2c2.071 0 3.75 -1.554 3.75 -4a5 5 0 1 0 -9.7 1.7m4.7 -1.7m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
  ),
  telegram: <path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" />,
  tiktok: <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5" />,
  twitch: (
    <path d="M4 5v11a1 1 0 0 0 1 1h2v4l4 -4h5.584c.266 0 .52 -.105 .707 -.293l2.415 -2.414c.187 -.188 .293 -.442 .293 -.708v-8.585a1 1 0 0 0 -1 -1h-14a1 1 0 0 0 -1 1zm12 3l0 4m-4 -4l0 4" />
  ),
  twitter: (
    <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c0 -.249 1.51 -2.772 1.818 -4.013z" />
  ),
  whatsapp: (
    <path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9m6 -11a0.5 .5 0 0 0 1 0v-1a0.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a0.5 .5 0 0 0 0 -1h-1a0.5 .5 0 0 0 0 1" />
  ),
  youtube: (
    <path d="M3 5m0 4a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v6a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4zm7 0l5 3l-5 3z" />
  ),
  chevron: <path d="M6 9l6 6l6 -6"></path>,
} as const
