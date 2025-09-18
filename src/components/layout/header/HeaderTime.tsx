'use client'
import { useWeatherData } from '@/hooks/useWeatherData'
import { useWeatherStore } from '@/store/weather.store'
import { formattedDate } from '@/utils/transform-date.utils'

export function HeaderTime() {
	const { dailyStats } = useWeatherData()
	const { day } = useWeatherStore()

	return (
		<span className='text-center'>
			{formattedDate(dailyStats[day]?.date)} ({dailyStats[day]?.date})
		</span>
	)
}
