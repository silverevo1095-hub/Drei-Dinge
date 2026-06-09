'use client'

interface Props {
  theme: 'light' | 'dark'
  onToggle: () => void
}

export default function ThemeToggle({ theme, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={theme === 'dark' ? 'Hellen Modus aktivieren' : 'Dunklen Modus aktivieren'}
      className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-300"
    >
      {theme === 'dark' ? (
        // Sun icon
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 1.78a1 1 0 011.42 1.42l-.7.7a1 1 0 11-1.42-1.42l.7-.7zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4.93 15.07a1 1 0 001.42-1.42l-.7-.7a1 1 0 00-1.42 1.42l.7.7zM2 11a1 1 0 110-2h1a1 1 0 110 2H2zm2.22-7.22a1 1 0 00-1.42 1.42l.7.7a1 1 0 001.42-1.42l-.7-.7zM10 15a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zm5.07-.93a1 1 0 001.42 1.42l.7-.7a1 1 0 00-1.42-1.42l-.7.7zM10 6a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
      ) : (
        // Moon icon
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
  )
}
