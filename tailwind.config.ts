
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				terminal: {
					DEFAULT: 'hsl(var(--terminal-bg))',
					foreground: 'hsl(var(--terminal-fg))',
					accent: 'hsl(var(--terminal-accent))',
					highlight: 'hsl(var(--terminal-highlight))',
					warning: 'hsl(var(--terminal-warning))',
					success: 'hsl(var(--terminal-success))',
					error: 'hsl(var(--terminal-error))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'text-reveal': {
					'0%': { width: '0%' },
					'100%': { width: '100%' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'pulse-warning': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsla(var(--terminal-warning), 0.4)' },
					'50%': { boxShadow: '0 0 20px 5px hsla(var(--terminal-warning), 0.4)' }
				},
				'pulse-error': {
					'0%, 100%': { boxShadow: '0 0 0 0 hsla(var(--terminal-error), 0.4)' },
					'50%': { boxShadow: '0 0 30px 10px hsla(var(--terminal-error), 0.5)' }
				},
				'scanning': {
					'0%': { backgroundPosition: '0% 0%' },
					'100%': { backgroundPosition: '0% 100%' }
				},
				'glitch': {
					'0%, 100%': { transform: 'translate(0)' },
					'20%': { transform: 'translate(-2px, 2px)' },
					'40%': { transform: 'translate(-2px, -2px)' },
					'60%': { transform: 'translate(2px, 2px)' },
					'80%': { transform: 'translate(2px, -2px)' }
				},
				'blink': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' }
				},
				'page-transition': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'text-reveal': 'text-reveal 1.5s ease-out forwards',
				'fade-in': 'fade-in 0.6s ease-out forwards',
				'fade-out': 'fade-out 0.6s ease-out forwards',
				'pulse-warning': 'pulse-warning 2s infinite',
				'pulse-error': 'pulse-error 1.5s infinite',
				'scanning': 'scanning 2s linear infinite',
				'glitch': 'glitch 0.3s ease-in-out infinite',
				'blink': 'blink 1s step-end infinite',
				'page-transition': 'page-transition 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
			},
			backgroundImage: {
				'scanning-line': 'linear-gradient(to bottom, transparent 0%, hsl(var(--terminal-accent)) 50%, transparent 100%)',
				'terminal-pattern': 'radial-gradient(hsl(var(--terminal-accent) / 0.1) 1px, transparent 0)',
				'glass-gradient': 'linear-gradient(135deg, hsl(var(--terminal-bg) / 0.2) 0%, hsl(var(--terminal-bg) / 0.4) 100%)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
