import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'export',
	basePath: '/weather-dashboard',
	images: {
		unoptimized: true
	}
}

export default nextConfig
