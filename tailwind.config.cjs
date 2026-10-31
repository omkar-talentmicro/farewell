module.exports = {
  content: ['./src/template.html'],
  theme: {
    extend: {
      colors: {
        paper: 'rgb(var(--c-paper) / <alpha-value>)',
        ink: 'rgb(var(--c-ink) / <alpha-value>)',
        accent: 'rgb(var(--c-accent) / <alpha-value>)',
        muted: 'rgb(var(--c-muted) / <alpha-value>)'
      },
      fontFamily: {
        serif: ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', 'Palatino', 'Georgia', 'serif'],
        sans: ['system-ui', '"Segoe UI"', 'Inter', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'Consolas', '"Cascadia Mono"', 'Menlo', 'monospace'],
        hand: ['"Segoe Script"', '"Snell Roundhand"', '"Apple Chancery"', '"Brush Script MT"', '"Lucida Handwriting"', 'cursive']
      },
      // transform / opacity only
      keyframes: {
        floaty:    { '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' }, '50%': { transform: 'translate3d(30px,-24px,0) scale(1.08)' } },
        scrolldot: { '0%': { transform: 'translateY(-100%)', opacity: '0' }, '30%': { opacity: '1' }, '100%': { transform: 'translateY(400%)', opacity: '0' } },
        blink:     { '50%': { opacity: '0' } },
        rise:      { '0%': { transform: 'translateY(0)', opacity: '0' }, '15%': { opacity: '.55' }, '100%': { transform: 'translateY(-110vh)', opacity: '0' } },
        eq:        { '0%,100%': { transform: 'scaleY(.25)' }, '50%': { transform: 'scaleY(1)' } }
      },
      animation: {
        floaty: 'floaty 18s ease-in-out infinite',
        scrolldot: 'scrolldot 2.2s cubic-bezier(.4,0,.2,1) infinite',
        blink: 'blink 1s steps(1) infinite',
        rise: 'rise 14s linear infinite',
        eq: 'eq .9s ease-in-out infinite'
      }
    }
  }
};
