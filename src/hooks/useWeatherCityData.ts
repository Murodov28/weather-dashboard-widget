import { weatherService } from '@/services/current-weather.service'
import { useQuery } from '@tanstack/react-query'

export const useWeatherCityData = (city: string) =>
	useQuery({
		queryKey: ['weather', city],
		queryFn: () => weatherService.getWeather(city),
		enabled: !!city,
		retry: 0
	})
