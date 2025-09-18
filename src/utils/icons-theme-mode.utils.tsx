import { MonitorCogIcon, MoonIcon, SunIcon } from 'lucide-react'
export const IconsThemeMode = (
	theme: string | undefined,
	isText: boolean = true
) => {
	if (theme?.toLocaleLowerCase() === 'light') {
		return (
			<span className='flex items-center gap-2'>
				<SunIcon /> {isText ? 'light' : null}
			</span>
		)
	} else if (theme?.toLocaleLowerCase() === 'dark') {
		return (
			<span className='flex items-center gap-2'>
				<MoonIcon /> {isText ? 'dark' : null}
			</span>
		)
	} else {
		return (
			<span className='flex items-center gap-2'>
				<MonitorCogIcon />
				{isText ? 'system' : null}
			</span>
		)
	}
}
