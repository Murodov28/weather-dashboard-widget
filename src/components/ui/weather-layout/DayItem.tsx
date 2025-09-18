import { WeatherIcon } from '@/components/ui/weather-icons/WeatherIcon'
import { useWeatherStore } from '@/store/weather.store'
import { IDailyTemps } from '@/types/daily-temps.types'
import { IconSkyconsFormattedSentence } from '@/utils/icon-skycons.utils'
import { formattedDate } from '@/utils/transform-date.utils'

interface Props {
	item: IDailyTemps
	id: number
}

export function DayItem({ item, id }: Props) {
	const { setDay, day: currentDay } = useWeatherStore()

	const currentDate = new Date()

	const year = currentDate.getFullYear()
	const month = String(currentDate.getMonth() + 1).padStart(2, '0')
	const day = String(currentDate.getDate()).padStart(2, '0')

	const fullDate = `${year}-${month}-${day}`

	return (
		<button
			onClick={() => setDay(id)}
			className='max-sm:w-[220px] max-sm:h-16 flex items-center '
		>
			<div className='w-full flex items-start  gap-3 justify-between'>
				<div className='relative flex items-center gap-3'>
					{id === currentDay ? (
						<div className='absolute left-0 top-0 h-full w-1 rounded-xl bg-amber-400 ' />
					) : null}
					<div className=''>
						<WeatherIcon
							type={IconSkyconsFormattedSentence(item.mainDescription)}
							size={40}
							className={`ml-3 ${id === currentDay ? ' opacity-100' : ''}`}
						/>
					</div>
					<div className='flex flex-col text-left gap-1.5'>
						<span>{formattedDate(item.date)}</span>
						<span className='text-xs opacity-65'>{item.mainDescription}</span>
					</div>
				</div>
				<span className='flex items-start gap-0.5'>
					{Math.round(item.max)} <span className='text-[0.7rem]'>°С</span>
				</span>
			</div>
		</button>
	)
}
