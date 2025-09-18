import { IForecastResponse } from '@/types/weater.types'
import toast from 'react-hot-toast'

class WeatherService {
	private _KEY = '357e8f36fa1d5819b42adf133c6ec290'
	private _API = 'https://api.openweathermap.org/data/2.5/forecast'
	private _LAST = 0
	private _PREV_DATA: IForecastResponse | null = null

	public _SUCCESS = false

	async getWeather(city: string): Promise<IForecastResponse> {
		const now = Date.now()

		if (now - this._LAST < 5000) {
			toast.error('Слишком часто вызываешь! Подожди ещё немного', {
				id: 'Error in Api'
			})
			this._SUCCESS = false
			// throw new Error('throttled')
			return this._PREV_DATA!
		}

		this._LAST = now
		try {
			const res = await fetch(
				`${this._API}?q=${encodeURIComponent(city)}&appid=${
					this._KEY
				}&lang=ru&units=metric`
			)

			if (!res.ok) {
				this._SUCCESS = false
				toast.error('Ошибка при загрузке погоды', { id: 'Error in Server' })
				throw new Error('fetch_failed')
			}

			const data: IForecastResponse = await res.json()
			this._PREV_DATA = data
			this._SUCCESS = true
			toast.success('Данные успешно получены', {
				id: 'Success in Get'
			})

			return data
		} catch (e) {
			this._SUCCESS = false
			throw e
		}
	}
}

export const weatherService = new WeatherService()
