import { useTheme } from 'next-themes'
import { useEffect, useRef } from 'react'
import { IconKey, Skycons } from 'skycons-ts'
import { twMerge } from 'tailwind-merge'
interface WeatherIconProps {
	type: IconKey // "CLEAR_DAY", "RAIN", "SNOW" и т.д.
	size?: number
	className?: string
}

export const WeatherIcon = ({
	type,
	size = 64,
	className
}: WeatherIconProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null)
	const { theme } = useTheme()
	useEffect(() => {
		if (canvasRef.current) {
			const skycons = new Skycons({
				color: theme === 'light' ? 'black' : 'white'
			})
			skycons.add(canvasRef.current, type)
			skycons.play()

			return () => skycons.remove(canvasRef.current!)
		}
	}, [type, theme])

	return (
		<canvas
			ref={canvasRef}
			width={size}
			height={size * 0.8}
			className={twMerge(
				'opacity-65 hover:opacity-100 transition-opacity duration-377 cursor-pointer',
				className
			)}
		></canvas>
	)
}
