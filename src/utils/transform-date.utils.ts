import dayjs from 'dayjs'
import 'dayjs/locale/ru'

export const formattedDate = (day: string) => {
	return dayjs(day).locale('ru').format('dddd')
}
