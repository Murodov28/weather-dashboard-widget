'use client'

import { useMemo } from 'react'
import {
	Area,
	AreaChart,
	CartesianGrid,
	LabelList,
	ResponsiveContainer,
	XAxis,
	YAxis
} from 'recharts'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	type ChartConfig
} from '@/components/ui/chart'

import { IHourData } from '@/types/daily-temps.types'
import { useTheme } from 'next-themes'
import { ChartHoursTick } from './ChartHoursTick'

const chartConfig = {
	temperature: {
		label: 'Температура-',
		color: 'hsl(var(--chart-1))'
	}
} satisfies ChartConfig

export function WeatherChart({
	currentTime = '09:00',
	chartData = []
}: {
	currentTime?: string
	chartData: IHourData[]
}) {
	const data = useMemo(() => {
		return chartData.map(h => ({
			time: typeof h.time === 'string' ? h.time.slice(0, 5) : '',
			temperature: Math.round(Number(h.temp)) as number | null
		}))
	}, [chartData])

	const { theme } = useTheme()

	return (
		<div className='h-fit'>
			<ChartContainer
				config={chartConfig}
				className='w-full h-[160px] text-xl max-md:text-base max-md:h-[200px]'
			>
				<ResponsiveContainer
					width='100%'
					height='100%'
				>
					<AreaChart
						data={data}
						margin={{ top: 0, right: 15, left: 15, bottom: 10 }}
					>
						<defs>
							<linearGradient
								id='fillTemperature'
								x1='0'
								y1='0'
								x2='0'
								y2='1'
							>
								<stop
									offset='10%'
									stopColor={
										theme === 'light'
											? 'rgba(0,0,0,0.7)'
											: 'rgba(255,255,255,0.28)'
									}
								/>
								<stop
									offset='90%'
									stopColor={
										theme === 'light'
											? 'rgba(0,0,0,0.05)'
											: 'rgba(255,255,255,0.00)'
									}
								/>
							</linearGradient>
						</defs>

						<CartesianGrid
							vertical={false}
							stroke='hsl(var(--muted-foreground))'
							strokeDasharray='3 3'
							strokeOpacity={0.12}
						/>

						<YAxis
							domain={['dataMin - 5', 'dataMax +5']}
							hide
						/>

						<XAxis
							dataKey='time'
							// tickLine={false}
							axisLine={false}
							tick={<ChartHoursTick currentTime={currentTime} />}
							interval={0}
							padding={{ left: 6, right: 6 }}
						/>

						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent indicator='dot' />}
						/>

						<Area
							dataKey='temperature'
							type='natural'
							fill='url(#fillTemperature)'
							stroke='hsl(var(--foreground))'
							strokeWidth={1.5}
							// dot={<ChartHoursDot currentTime={currentTime} />}
						>
							<LabelList
								dataKey='temperature'
								position='top'
								offset={12}
								className='fill-foreground font-medium'
								formatter={(value: number) =>
									value == null ? '' : `${value}°`
								}
							/>
						</Area>
					</AreaChart>
				</ResponsiveContainer>
			</ChartContainer>
		</div>
	)
}
