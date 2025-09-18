'use client'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { IconsThemeMode } from '@/utils/icons-theme-mode.utils'
import { useTheme } from 'next-themes'
export function HeaderSelectTheme() {
	const { setTheme, theme, themes } = useTheme()

	return (
		<div className=''>
			<div className='max-sm:hidden'>
				<Select
					value={theme}
					onValueChange={val => setTheme(val)}
				>
					<SelectTrigger className='w-36 border-0 shadow-none outline-none '>
						<SelectValue placeholder={IconsThemeMode(theme)} />
					</SelectTrigger>
					<SelectContent className='border-0'>
						<SelectItem value='light'>{IconsThemeMode('light')}</SelectItem>
						<SelectItem value='dark'>{IconsThemeMode('dark')}</SelectItem>
						<SelectItem value='system'>{IconsThemeMode('system')}</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className='hidden max-sm:flex'>
				<button
					onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
					className='flex items-center'
				>
					{IconsThemeMode(theme, false)}
				</button>
			</div>
		</div>
	)
}
