import minicloud from '/bg.png'
import cloud from '/pogoda (1).svg'
import sun from '/pogoda (2).svg'
import minirain from '/pogoda (3).svg'
import sunrain from '/pogoda (4).svg'
import rain from '/pogoda (5).svg'
export const weatherName = {
	дымка: minicloud,
	ясно: sun,
	'небольшая облачность': cloud,
	пасмурно: cloud,
	'облочно с пояснениями': sunrain,
	'небольшой дождь': minirain,
	дождь: rain,
	'переменная облочность': cloud,
	'небольшой снег': minirain,
	'снег с дождём': rain,
	'переменная облачность': cloud
}
