import { WeatherIcon } from '@/components/ui/weather-icons/WeatherIcon'
import { useWeatherStore } from '@/store/weather.store'
import { IDailyTemps } from '@/types/daily-temps.types'
import { IconSkyconsFormatted } from '@/utils/icon-skycons.utils'
import { Droplet, Wind } from 'lucide-react'
import Image from 'next/image'
import { WeatherChart } from '../chart/ChartsHoursView'
import { DayItem } from './DayItem'
import { DopInformation } from './DopInformation'
interface Props {
	dailyStats: IDailyTemps[]
	day: number
}

export function WeatherLayout({ dailyStats, day }: Props) {
	const { day: currentDay } = useWeatherStore()

	const data = dailyStats[day]

	return (
		<div className='flex flex-col gap-30 justify-between max-md:gap-20'>
			<div className='grid grid-cols-[1fr_2fr_1fr]  gap-5 max-lg:flex max-lg:flex-wrap max-lg:gap-20 max-md:gap-10'>
				<div className='flex flex-col gap-10'>
					<div className='flex flex-col gap-3'>
						<h1 className='text-8xl flex items-start'>
							{Math.round(Number(data.hours[0].temp))}{' '}
							<WeatherIcon
								type={IconSkyconsFormatted(
									data.hours[0].icon?.toString() || ''
								)}
								size={40}
								className='opacity-100'
							/>
						</h1>
						<h2 className='text-2xl opacity-65'>{data.hours[0].description}</h2>
					</div>
					<div className='flex items-center gap-10'>
						<DopInformation
							title='Ветер'
							Icon={Wind}
							value={`${data.avgWind}км/ч`}
						/>
						<DopInformation
							title='Влажность'
							Icon={Droplet}
							value={`${data.avgHumidity}%`}
						/>
					</div>
				</div>
				<div className='flex items-start justify-center relative max-lg:flex-1 max-md:hidden max-md:w-0'>
					<Image
						src='/images/bg.png'
						alt='bg'
						width={500}
						height={400}
						className='w-full relative z-1'
					/>
				</div>
				<div className='flex justify-end w-full'>
					<div className='w-full pl-2 pr-4 py-7 grid grid-cols-1 gap-5 rounded-3xl border border-foreground/20 bg-foreground/10 backdrop-blur-lg  max-lg:grid max-lg:grid-cols-3 max-lg:gap-6 max-md:grid-cols-2 max-sm:flex max-sm:w-fit max-sm:overflow-x-auto max-sm:py-4'>
						{dailyStats.map((item, index) => (
							<DayItem
								key={index}
								id={index}
								item={item}
							/>
						))}
					</div>
				</div>
			</div>
			<div className='h-fit'>
				<WeatherChart
					currentTime={data.hours[currentDay].time.slice(0, 5)}
					chartData={dailyStats[currentDay].hours}
				/>
			</div>
		</div>
	)
}
