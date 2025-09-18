import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/providers/Providers'
import type { Metadata } from 'next'
import { Duru_Sans } from 'next/font/google'
import './globals.css'

const duru_sans = Duru_Sans({
	variable: '--font-duru_sans',
	subsets: ['latin'],
	weight: ['400']
})

export const metadata: Metadata = {
	title: 'Weather App',
	description: 'Weather App',
	icons: {
		icon: '/clouds.png'
	}
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={`${duru_sans.className} antialiased h-full`}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	)
}
