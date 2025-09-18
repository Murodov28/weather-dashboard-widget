import { useWeatherStore } from '@/store/weather.store'
import { IDailyTemps, IHourData } from '@/types/daily-temps.types'
import { useWeatherCityData } from './useWeatherCityData'

export function useWeatherData() {
	const { city } = useWeatherStore()
	const { data, isPending } = useWeatherCityData(city)

	const HOURS = [
		'00:00:00',
		'03:00:00',
		'06:00:00',
		'09:00:00',
		'12:00:00',
		'15:00:00',
		'18:00:00',
		'21:00:00'
	]

	function interpolate(
		a: number,
		b: number,
		t: number,
		ta: number,
		tb: number
	): number {
		const ratio = (t - ta) / (tb - ta)
		return a + (b - a) * ratio
	}

	const grouped: Record<
		string,
		{
			hours: IHourData[]
			descriptions: string[]
			humidities: number[]
			winds: number[]
		}
	> = {}

	data?.list.forEach(item => {
		const [date, time] = item.dt_txt.split(' ')

		if (!grouped[date])
			grouped[date] = {
				hours: [],
				descriptions: [],
				humidities: [],
				winds: []
			}

		grouped[date].hours.push({
			time,
			temp: item.main.temp,
			humidity: item.main.humidity,
			wind: item.wind.speed,
			icon: item.weather[0].icon,
			description: item.weather[0].description
		})

		grouped[date].descriptions.push(item.weather[0].description)
		grouped[date].humidities.push(item.main.humidity)
		grouped[date].winds.push(item.wind.speed)
	})

	for (const date in grouped) {
		const hours = grouped[date].hours
		const existing = hours.map(h => h.time)

		HOURS.forEach(targetTime => {
			if (!existing.includes(targetTime)) {
				const before = [...hours]
					.filter(h => h.time < targetTime)
					.sort((a, b) => b.time.localeCompare(a.time))[0]
				const after = [...hours]
					.filter(h => h.time > targetTime)
					.sort((a, b) => a.time.localeCompare(b.time))[0]

				if (before && after) {
					const parseHour = (t: string) => Number(t.split(':')[0])
					const th = parseHour(targetTime)
					const bh = parseHour(before.time)
					const ah = parseHour(after.time)

					hours.push({
						time: targetTime,
						temp:
							Math.round(
								interpolate(before.temp!, after.temp!, th, bh, ah) * 10
							) / 10,
						humidity: Math.round(
							interpolate(before.humidity!, after.humidity!, th, bh, ah)
						),
						wind:
							Math.round(
								interpolate(before.wind!, after.wind!, th, bh, ah) * 10
							) / 10,
						icon: before.icon ?? after.icon,
						description: before.description ?? after.description
					})
				} else if (before && !after) {
					hours.push({
						time: targetTime,
						temp: before.temp,
						humidity: before.humidity,
						wind: before.wind,
						icon: before.icon,
						description: before.description
					})
				} else if (!before && after) {
					hours.push({
						time: targetTime,
						temp: after.temp,
						humidity: after.humidity,
						wind: after.wind,
						icon: after.icon,
						description: after.description
					})
				} else {
					hours.push({
						time: targetTime,
						temp: null,
						humidity: null,
						wind: null,
						icon: null,
						description: null
					})
				}
			}
		})

		grouped[date].hours.sort((a, b) => a.time.localeCompare(b.time))
	}

	const dailyStats: IDailyTemps[] = Object.entries(grouped)
		.map(([date, { hours, descriptions, humidities, winds }]) => ({
			date,
			min: Math.min(...hours.map(h => h.temp ?? Infinity)),
			max: Math.max(...hours.map(h => h.temp ?? -Infinity)),
			mainDescription: descriptions
				.sort(
					(a, b) =>
						descriptions.filter(v => v === a).length -
						descriptions.filter(v => v === b).length
				)
				.pop()!,
			avgHumidity: Math.round(
				humidities.reduce((a, b) => a + b, 0) / humidities.length
			),
			avgWind: (winds.reduce((a, b) => a + b, 0) / winds.length).toFixed(1),
			hours
		}))
		.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

	return {
		isPending,
		data,
		dailyStats
	}
}
