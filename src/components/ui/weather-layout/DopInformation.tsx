import { type LucideIcon } from 'lucide-react'

interface Props {
	Icon: LucideIcon
	title: string
	value: string | number
}

export function DopInformation({ Icon, title, value }: Props) {
	return (
		<div className=''>
			<span className='flex items-center gap-2 mb-2 text-sm'>
				<Icon size={20} /> {title}
			</span>
			<span className='text-2xl'>{value}</span>
		</div>
	)
}
