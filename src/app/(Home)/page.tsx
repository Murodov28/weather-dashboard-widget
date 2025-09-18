'use client'

import { WeatherLayout } from '@/components/ui/weather-layout/WeatherLayout'
import { useWeatherData } from '@/hooks/useWeatherData'
import { useWeatherStore } from '@/store/weather.store'
import WeatherLoader from '../../components/ui/Loader'

export default function Page() {
	const { dailyStats, isPending } = useWeatherData()
	const { isLoading, day } = useWeatherStore()
	if (!dailyStats.length) return
	return isPending || isLoading ? (
		<div className='flex items-center justify-center'>
			<WeatherLoader />
		</div>
	) : (
		<WeatherLayout
			dailyStats={dailyStats}
			day={day}
		/>
	)
}
