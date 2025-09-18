export interface IForecastResponse {
	cod: string // "200" при успешном запросе
	message: number
	cnt: number // количество элементов в list (обычно 40)
	list: IForecastItem[]
	city: {
		id: number
		name: string
		coord: {
			lat: number
			lon: number
		}
		country: string
		population: number
		timezone: number
		sunrise: number
		sunset: number
	}
}

export interface IForecastItem {
	dt: number
	main: {
		temp: number
		feels_like: number
		temp_min: number
		temp_max: number
		pressure: number
		sea_level: number
		grnd_level: number
		humidity: number
		temp_kf: number
	}
	weather: {
		id: number
		main: string
		description: string
		icon: string
	}[]
	clouds: {
		all: number
	}
	wind: {
		speed: number
		deg: number
		gust: number
	}
	visibility: number
	pop: number // probability of precipitation
	rain?: {
		'3h': number
	}
	snow?: {
		'3h': number
	}
	sys: {
		pod: 'd' | 'n'
	}
	dt_txt: string // "YYYY-MM-DD HH:mm:ss"
}
