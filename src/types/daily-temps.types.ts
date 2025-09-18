export interface IDailyTemps {
	date: string
	min: number
	max: number
	mainDescription: string
	avgHumidity: number
	avgWind: string
	hours: IHourData[]
}
export interface IHourData {
	time: string
	temp: number | null
	humidity: number | null
	wind: number | null
	icon: string | null
	description: string | null
}
