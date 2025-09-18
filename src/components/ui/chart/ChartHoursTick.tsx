import { cn } from '@/lib/utils'

export const ChartHoursTick = (props: any) => {
	const { x, y, payload, currentTime } = props
	const isCurrentTime = payload.value === currentTime

	return (
		<g transform={`translate(${x},${y})`}>
			<text
				x={0}
				y={0}
				dy={16}
				textAnchor='middle'
				fill={isCurrentTime ? '#000' : '#fff'}
				fontSize={12}
				className={cn('transition-all', isCurrentTime && 'font-bold')}
				paintOrder='stroke'
				stroke={isCurrentTime ? 'hsl(var(--background))' : 'none'}
				strokeWidth='6px'
				strokeLinecap='round'
			>
				{isCurrentTime && (
					<tspan>
						<rect
							x={-25}
							y={-2}
							width='50'
							height='20'
							rx='6'
							fill='hsl(var(--muted))'
						></rect>
					</tspan>
				)}
				<tspan
					x={0}
					dy={14}
					fill={
						isCurrentTime
							? 'hsl(var(--foreground))'
							: 'hsl(var(--muted-foreground))'
					}
				>
					{payload.value}
				</tspan>
			</text>
		</g>
	)
}
