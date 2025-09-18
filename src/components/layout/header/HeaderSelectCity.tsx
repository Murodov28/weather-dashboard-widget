'use client'
import { useState } from 'react'

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList
} from '@/components/ui/command'
import { CITIES } from '@/constants/cities.constant'
import { useWeatherCityData } from '@/hooks/useWeatherCityData'
import { useWeatherStore } from '@/store/weather.store'
import { MapPin } from 'lucide-react'

export function HeaderSelectCity() {
	const [open, setOpen] = useState(false)
	const { setCity, city, setIsLoading, setDay } = useWeatherStore()
	const { data } = useWeatherCityData(city)
	const [cityInput, setCityInput] = useState('')

	const handleSelectCity = (cityValue: string) => {
		setIsLoading(true)
		setTimeout(() => {
			setCity(cityValue)
			setDay(0)
			setIsLoading(false)
		}, 3500)
		setOpen(false)
	}

	return (
		<span className='flex items-center gap-2'>
			<button
				onClick={() => setOpen(true)}
				className='flex items-center gap-2'
			>
				<MapPin />
				{data?.city.name ?? 'Choose city'}
			</button>
			<CommandDialog
				open={open}
				onOpenChange={setOpen}
			>
				<CommandInput
					value={cityInput}
					onValueChange={setCityInput}
					placeholder='Search city...'
				/>
				<CommandList>
					<CommandEmpty>No city found.</CommandEmpty>
					<CommandGroup heading='Available Cities'>
						{CITIES.map(city => (
							<CommandItem
								key={city}
								value={city}
								onSelect={() => handleSelectCity(city)}
							>
								{city}
							</CommandItem>
						))}
					</CommandGroup>
				</CommandList>
			</CommandDialog>
		</span>
	)
}
