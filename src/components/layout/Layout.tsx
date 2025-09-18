import { twMerge } from 'tailwind-merge'
import { Header } from './header/Header'

export function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div
			className={twMerge(
				'max-w-[1440px] w-full mx-auto my-10 h-[calc(100vh-5rem)] rounded-4xl shadow-lg p-8 body-in max-xl:min-h-screen max-xl:my-0 max-xl:rounded-none max-md:p-4 max-md:pt-8'
			)}
		>
			<Header />
			{children}
		</div>
	)
}
