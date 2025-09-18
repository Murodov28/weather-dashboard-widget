'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { Toaster } from 'react-hot-toast'

const DynamicThemeProvider = dynamic(
	() => import('./Theme.provider').then(mod => mod.ThemeProvider),
	{ ssr: false }
)

export function Providers({ children }: { children: React.ReactNode }) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						retry: 1
					},
					mutations: {
						retry: 1
					}
				}
			})
	)
	return (
		<DynamicThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<QueryClientProvider client={queryClient}>
				{children} <Toaster />
			</QueryClientProvider>
		</DynamicThemeProvider>
	)
}
