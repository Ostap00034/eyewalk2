import Button from '@/components/ui/button'
import Image from 'next/legacy/image'
import Link from 'next/link'

export default function Home() {
	return (
		<main
			className={`flex font-century-gothic min-h-screen flex-col items-center justify-between`}
		>
			<div className='flex flex-col-reverse md:flex-row lg:max-w-[1024px] h-screen gap-[10px] md:gap-[112px] justify-center items-center w-full'>
				<div className='flex flex-col gap-8'>
					<div className='flex flex-col gap-4'>
						<div className='text-[#115ff9] text-[41px] md:text-[48px] font-bold'>
							EyeWalk
						</div>
						<div className='font-manrope text-[14px] font-bold'>
							Виртуальный тур по ИТ Парку
						</div>
					</div>
					<Link href='/tour'>
						<Button text='Начать экскурсию' />
					</Link>
				</div>
				<div className='max-w-[80vw] md:max-w-[546px] w-full h-auto relative'>
					<Image
						layout='responsive'
						width={279}
						height={188}
						src='/main_image.png'
						alt='Main Image'
					/>
				</div>
			</div>
		</main>
	)
}
