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
				// FIA Brand Colors - Primary
				fiaPink: '#E86EB4',
				fiaBlue: '#36A0D9', 
				fiaCharcoal: '#222',
				
				// Legacy FIA colors (keeping for compatibility)
				fia: {
					yellow: '#F2BE29',
					teal: '#246A73',      
					burgundy: '#842E2E',  
					blue: '#36A0D9',      // Updated to FIA blue
					white: '#FFFFFF',     
					charcoal: '#222',     // Updated to FIA charcoal
					pink: '#E86EB4',      // New FIA pink
					
					// Original colors - keeping for compatibility
					background: '#FFFFFF',
					text: '#222',
					accent: '#E86EB4',    // Updated to FIA pink
					secondary: '#36A0D9', // Updated to FIA blue
					border: '#E0E0E0',
					// Profile colors
					dreamer: '#36A0D9',   
					peacemaker: '#246A73',  
					caregiver: '#E86EB4',   // Updated to FIA pink
					rebel: '#842E2E',       
					achiever: '#222',       // Updated to FIA charcoal
					textLight: '#666',
					offwhite: '#F9F9F9',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			fontFamily: {
				sans: ['Karla', 'Inter', 'system-ui', 'sans-serif'],
				karla: ['Karla', 'system-ui', 'sans-serif'],
				inter: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Karla', 'Inter', 'Helvetica Neue', 'sans-serif'],
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
