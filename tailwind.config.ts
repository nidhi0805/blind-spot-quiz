
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// FIA Updated colors
				fia: {
					yellow: '#F2BE29',    // Hero sections, result backgrounds
					teal: '#246A73',      // Quiz flashcard background
					burgundy: '#842E2E',  // CTA button hover, rebel profile
					blue: '#1B3B6F',      // Info cards, secondary tone
					white: '#FFFFFF',     // Background for cards
					charcoal: '#121212',  // Headings and CTA text
					
					// Original colors - keeping for compatibility
					background: '#FFFFFF',
					text: '#121212',
					accent: '#F2BE29',
					secondary: '#246A73',
					border: '#E0E0E0',
					// Profile colors
					dreamer: '#1B3B6F',    // Sapphire Blue
					peacemaker: '#246A73',  // Deep Teal  
					caregiver: '#F2BE29',   // FIA Yellow
					rebel: '#842E2E',       // Burgundy
					achiever: '#121212',    // Charcoal
					textLight: '#444444',
					offwhite: '#F9F9F9',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Inter', 'DM Sans', 'Work Sans', 'system-ui', 'sans-serif'],
				inter: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Circular Std', 'Futura PT', 'Helvetica Neue', 'Inter', 'sans-serif'],
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'slide-right': {
					'0%': {
						transform: 'translateX(-20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-left': {
					'0%': {
						transform: 'translateX(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'card-flip': {
					'0%': {
						transform: 'rotateY(-10deg)',
						opacity: '0'
					},
					'100%': {
						transform: 'rotateY(0)',
						opacity: '1'
					}
				},
				'card-flip-back': {
					'0%': {
						transform: 'rotateY(180deg)',
					},
					'100%': {
						transform: 'rotateY(0deg)',
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out',
				'slide-left': 'slide-left 0.5s ease-out',
				'card-flip': 'card-flip 0.5s ease-out',
				'card-flip-back': 'card-flip-back 0.5s ease-out'
			},
			backgroundImage: {
				// Adding subtle texture patterns
				'subtle-dots': 'url("data:image/svg+xml,%3Csvg width="20" height="20" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill="%23000" fill-opacity=".05" d="M10 0a1 1 0 110 2 1 1 0 010-2zm0 18a1 1 0 110 2 1 1 0 010-2z"/%3E%3C/svg%3E")',
			},
			rotate: {
				'y-180': 'rotateY(180deg)',
			},
			transitionProperty: {
				'transform-opacity': 'transform, opacity',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
