import { IconKey } from 'skycons-ts'

export const IconSkyconsFormatted = (icon: string): IconKey => {
	switch (icon) {
		case '01d':
			return 'clear-day'
		case '01n':
			return 'clear-night'
		case '02d':
			return 'partly-cloudy-day'
		case '02n':
			return 'partly-cloudy-night'
		case '03d':
		case '03n':
			return 'cloudy'
		case '09d':
		case '09n':
			return 'rain'
		case '10d':
		case '10n':
			return 'rain'
		case '13d':
		case '13n':
			return 'snow'
		case '50d':
		case '50n':
			return 'fog'
		default:
			return 'cloudy'
	}
}

export const IconSkyconsFormattedSentence = (description: string): IconKey => {
	switch (description.toLowerCase()) {
		case 'ясно':
			return 'clear-day'
		case 'небольшая облачность':
			return 'partly-cloudy-day'
		case 'пасмурно':
		case 'облачно с прояснениями':
			return 'cloudy'
		case 'дождь':
		case 'небольшой дождь':
		case 'умеренный дождь':
		case 'сильный дождь':
			return 'rain'
		case 'снег':
		case 'небольшой снег':
		case 'умеренный снег':
			return 'snow'
		case 'туман':
			return 'fog'
		default:
			return 'cloudy'
	}
}
