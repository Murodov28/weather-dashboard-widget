import { HeaderSelectCity } from './HeaderSelectCity'
import { HeaderSelectTheme } from './HeaderSelectTheme'
import { HeaderTime } from './HeaderTime'
export function Header() {
	return (
		<header className='flex items-center justify-center gap-8 mb-12 max-md:gap-6 max-md:justify-between'>
			<HeaderSelectCity />
			<HeaderTime />
			<HeaderSelectTheme />
		</header>
	)
}
