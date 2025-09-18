import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	output: 'export',
	basePath: '/weather-dashboard-widget',
	images: {
		unoptimized: true
	}
}

export default nextConfig
