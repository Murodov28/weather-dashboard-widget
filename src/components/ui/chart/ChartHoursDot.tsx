export const ChartHoursDot = (props: any) => {
	const { cx, cy, payload, currentTime } = props

	if (payload.time === currentTime) {
		return (
			<g>
				<defs>
					<filter
						id='glow'
						x='-50%'
						y='-50%'
						width='200%'
						height='200%'
					>
						<feGaussianBlur
							stdDeviation='6'
							result='coloredBlur'
						/>
						<feMerge>
							<feMergeNode in='coloredBlur' />
							<feMergeNode in='SourceGraphic' />
						</feMerge>
					</filter>
				</defs>
				<circle
					cx={cx}
					cy={cy}
					r={6}
					fill='#FBBF24'
					filter='url(#glow)'
				/>
			</g>
		)
	}

	return null
}
