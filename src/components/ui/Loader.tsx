// components/CircleLoader.tsx
'use client'

type Props = {
	size?: number
	thickness?: number
	color?: string
	className?: string
	label?: string
}

export default function CircleLoader({
	size = 56,
	thickness = 6,
	color = 'currentColor',
	className = '',
	label = 'Загрузка'
}: Props) {
	const r = (size - thickness) / 2
	const c = 2 * Math.PI * r
	const dash = c * 0.28

	return (
		<div
			role='status'
			aria-label={label}
			className={`inline-flex items-center justify-center ${className}`}
		>
			<svg
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
				aria-hidden='true'
				className='block'
			>
				<defs>
					<linearGradient
						id='gL'
						x1='0%'
						x2='100%'
					>
						<stop
							offset='0%'
							stopColor={color}
							stopOpacity='0.95'
						/>
						<stop
							offset='100%'
							stopColor={color}
							stopOpacity='0.6'
						/>
					</linearGradient>
				</defs>

				<circle
					cx={size / 2}
					cy={size / 2}
					r={r}
					stroke='currentColor'
					strokeOpacity='0.08'
					strokeWidth={thickness}
					fill='none'
				/>

				<circle
					cx={size / 2}
					cy={size / 2}
					r={r}
					stroke='url(#gL)'
					strokeWidth={thickness}
					strokeLinecap='round'
					strokeDasharray={`${dash} ${c}`}
					strokeDashoffset='0'
					fill='none'
					className='loader-arc'
					style={{ transformOrigin: 'center' }}
				/>
			</svg>

			<style>{`
        @keyframes arc-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes arc-dash {
          0% {
            stroke-dasharray: ${dash}px ${c}px;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: ${(dash * 1.8).toFixed(2)}px ${c}px;
            stroke-dashoffset: -${(c * 0.18).toFixed(2)}px;
          }
          100% {
            stroke-dasharray: ${dash}px ${c}px;
            stroke-dashoffset: -${c}px;
          }
        }
        .loader-arc {
          animation:
            arc-rotate 1.6s linear infinite,
            arc-dash 1.6s ease-in-out infinite;
        }
      `}</style>

			<span className='sr-only'>{label}…</span>
		</div>
	)
}
