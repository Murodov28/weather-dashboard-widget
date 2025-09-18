import { create } from 'zustand'

interface IWeatherStore {
	city: string
	isLoading: boolean
	day: number
	setDay: (day: number) => void
	setIsLoading: (isLoading: boolean) => void
	setCity: (city: string) => void
}

export const useWeatherStore = create<IWeatherStore>((set, get) => ({
	city: 'Tashkent',
	isLoading: false,
	day: 0,
	setDay: (day: number) => set({ day }),
	setCity: (city: string) =>
		set({
			city
		}),
	setIsLoading: (isLoading: boolean) =>
		set({
			isLoading
		})
}))
