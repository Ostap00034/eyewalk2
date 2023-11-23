import { useEffect, useMemo, useRef, useState, useCallback } from 'react'

import cn from 'clsx'

import scenes from '@/data/scenes.json'
import View360, { EquirectProjection } from '@egjs/react-view360'
import '@egjs/react-view360/css/view360.min.css'
import ReactPlayer from 'react-player'
import { VisitQueryService } from '@/services/visitquery/visitquery.service'
import { IntershipQueryService } from '@/services/intershipquery/intershipquery.service'
import Button from '@/components/ui/button'
import Image from 'next/legacy/image'
import Field from '@/components/ui/field'
import Link from 'next/link'

const initVisitData = {
	fio: '',
	to: '',
	phoneNumber: '',
	activity: '',
}

const initIntershipData = {
	fio: '',
	to: '',
	phoneNumber: '',
	activity: '',
	skills: '',
}

function Tour() {
	const [srcNum, setSrcNum] = useState(0)
	const [windows, setWindows] = useState([false, false])
	const [visitData, setVisitData] = useState<any>(initVisitData)
	const [intershipData, setIntershipData] = useState<any>(initIntershipData)

	const handleOpenModal = (number: number) => {
		const newArray = [...windows]

		newArray[number] = !newArray[number]

		for (var i = 0; i < newArray.length; ++i) {
			newArray[i] = i === number ? !windows[number] : false
		}

		setWindows(newArray)
	}

	const viewerRef = useRef<any>(null)

	const changeProjection = useCallback(
		(number: number) => {
			setSrcNum(number)
		},
		[srcNum]
	)

	useEffect(() => {
		viewerRef.current.hotspot.refresh()
	}, [srcNum])

	const projection = useMemo(
		() =>
			new EquirectProjection({
				src: scenes[srcNum].scenePanoImg,
			}),
		[srcNum]
	)

	return (
		<div className='bg-white w-full h-screen'>
			{/* Заявка на очный визит */}
			<div className='w-full h-screen flex flex-col-reverse lg:flex-row'>
				<div
					className={cn(
						'min-w-[30vw] h-auto',
						windows[0] ? 'visible opacity-100' : 'invisible opacity-0',
						'transition-all z-[1] duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					)}
				>
					<form className='bg-white flex flex-col min-w-[438px] h-auto p-6 rounded-xl border-[1px] border-[#f2f2f2]'>
						<div className='flex flex-row justify-between'>
							<div className='text-[24px] font-century-gothic font-bold leading-[32px]'>
								Заявка на очный визит
							</div>
							<div
								onClick={() => {
									handleOpenModal(0)
								}}
								className='w-10 h-10 p-2 border-[1px] border-[#f2f2f2] background-[#f6f7f8] rounded-xl cursor-pointer flex justify-center items-center'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
								>
									<g id='Line / All / X 2v'>
										<path
											id='Icon'
											d='M17 7L12 12M12 12L7 17M12 12L17 17M12 12L7 7'
											stroke='#6765F8'
											stroke-width='2.5'
											stroke-linecap='round'
											stroke-linejoin='round'
										/>
									</g>
								</svg>
							</div>
						</div>

						<div className='w-full h-6'></div>

						<div className='flex flex-col gap-4'>
							<Field
								placeholder='ФИО'
								type='text'
								value={intershipData.fio}
								onChange={e => {
									setIntershipData({ ...intershipData, fio: e.target.value })
								}}
							/>
							<Field
								placeholder='Контактные данные'
								type='text'
								value={intershipData.phoneNumber}
								onChange={e => {
									setIntershipData({
										...intershipData,
										phoneNumber: e.target.value,
									})
								}}
							/>
							<Field
								placeholder='Место работы/учебы'
								type='text'
								value={intershipData.activity}
								onChange={e => {
									setIntershipData({
										...intershipData,
										activity: e.target.value,
									})
								}}
							/>
						</div>

						<div className='h-8 w-full'></div>

						<Button
							onClick={e => {
								e.preventDefault()
								if (
									visitData.fio &&
									visitData.phoneNumber &&
									visitData.activity
								)
									VisitQueryService.create({
										...visitData,
										to: scenes[srcNum].name || 'ИТ парк',
									})
								setVisitData(initVisitData)
								handleOpenModal(1)
							}}
							text='Отправить'
						/>
					</form>
				</div>
				{/* Заявка на практику/стажировку */}
				<div
					className={cn(
						'min-w-[30vw]',
						windows[1] ? 'visible opacity-100' : 'invisible opacity-0',
						'transition-all z-[1] duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					)}
				>
					<form className='bg-white flex flex-col min-w-[438px] h-auto p-6 gap-6 rounded-xl border-[1px] border-[#f2f2f2]'>
						<div className='flex flex-row justify-between'>
							<div className='text-[24px] font-century-gothic font-bold leading-[32px]'>
								Заявка на <br />
								практику/стажировку
							</div>
							<div
								onClick={() => {
									handleOpenModal(1)
								}}
								className='w-10 h-10 p-2 border-[1px] border-[#f2f2f2] background-[#f6f7f8] rounded-xl cursor-pointer flex justify-center items-center'
							>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									width='24'
									height='24'
									viewBox='0 0 24 24'
									fill='none'
								>
									<g id='Line / All / X 2v'>
										<path
											id='Icon'
											d='M17 7L12 12M12 12L7 17M12 12L17 17M12 12L7 7'
											stroke='#6765F8'
											strokeWidth='2.5'
											strokeLinecap='round'
											strokeLinejoin='round'
										/>
									</g>
								</svg>
							</div>
						</div>
						<Field
							placeholder='ФИО'
							type='text'
							value={intershipData.fio}
							onChange={e => {
								setIntershipData({ ...intershipData, fio: e.target.value })
							}}
						/>
						<Field
							placeholder='Контактные данные'
							type='text'
							value={intershipData.phoneNumber}
							onChange={e => {
								setIntershipData({
									...intershipData,
									phoneNumber: e.target.value,
								})
							}}
						/>
						<Field
							placeholder='Место работы/учебы'
							type='text'
							value={intershipData.activity}
							onChange={e => {
								setIntershipData({ ...intershipData, activity: e.target.value })
							}}
						/>
						<Field
							placeholder='Навыки'
							type='text'
							value={intershipData.skills}
							onChange={e => {
								setIntershipData({ ...intershipData, skills: e.target.value })
							}}
						/>
						<Button
							onClick={e => {
								e.preventDefault()
								if (
									intershipData.fio &&
									intershipData.phoneNumber &&
									intershipData.activity &&
									intershipData.skills
								)
									IntershipQueryService.create({
										...intershipData,
										to: scenes[srcNum].name || 'ИТ парк',
									})
								setIntershipData(initIntershipData)
								handleOpenModal(0)
							}}
							text='Отправить'
						/>
					</form>
				</div>
				{/* Видео основателя */}
				{scenes[srcNum].video ? (
					<div
						className={cn(
							'min-w-[30vw] h-auto',
							windows[2] ? 'visible opacity-100' : 'invisible opacity-0',
							'transition-all z-[1] fixed duration-300 ease-in-out w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
						)}
					>
						<div className='bg-white flex flex-col min-w-[438px] h-auto p-6 gap-6 rounded-xl border-[1px] border-[#f2f2f2]'>
							<div className='flex flex-row justify-between'>
								<div className='text-[24px] font-century-gothic font-bold leading-[32px]'>
									Видое основателя{' '}
								</div>
								<div
									onClick={() => {
										handleOpenModal(2)
									}}
									className='w-10 h-10 p-2 border-[1px] border-[#f2f2f2] background-[#f6f7f8] rounded-xl cursor-pointer flex justify-center items-center'
								>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										width='24'
										height='24'
										viewBox='0 0 24 24'
										fill='none'
									>
										<g id='Line / All / X 2v'>
											<path
												id='Icon'
												d='M17 7L12 12M12 12L7 17M12 12L17 17M12 12L7 7'
												stroke='#6765F8'
												strokeWidth='2.5'
												strokeLinecap='round'
												strokeLinejoin='round'
											/>
										</g>
									</svg>
								</div>
							</div>

							<ReactPlayer
								controls
								className='w-full h-full rounded-xl overflow-hidden'
								url={scenes[srcNum].video}
							/>
						</div>
					</div>
				) : null}
				{/* SideBar */}
				<div className='w-full h-[30vh] overflow-y-scroll lg:w-[40vw] lg:h-screen text-black text-xl flex flex-col justify-start items-center'>
					{scenes[srcNum].preview ? (
						<div className='relative w-full'>
							<Image
								layout='responsive'
								width='322'
								height='254'
								alt='Preview Image'
								src={scenes[srcNum].preview!}
							/>
						</div>
					) : null}
					{scenes[srcNum].name}
					{scenes[srcNum].creator ? (
						<div className=''>
							<div className=''>Основатель</div>
							<div className=''>{scenes[srcNum].creator || 'Остутствует'}</div>
						</div>
					) : null}
					{scenes[srcNum].created ? (
						<div className=''>
							<div className=''>Дата начала резиденства</div>
							<div className=''>{scenes[srcNum].created || 'Остутствует'}</div>
						</div>
					) : null}
					{scenes[srcNum].fieldOfActivity ? (
						<div className=''>
							<div className=''>Сфера деятельности</div>
							<div className=''>
								{scenes[srcNum].fieldOfActivity || 'Остутствует'}
							</div>
						</div>
					) : null}
					<div className=''>
						<div className=''>Информация</div>
						<div className=''>{scenes[srcNum].info || 'Остутствует'}</div>
					</div>
					<div className=''>
						<div className=''>Услуга</div>
						<div className=''>{scenes[srcNum].service || 'Остутствует'}</div>
					</div>
					<div className='flex flex-row lg:flex-col gap-4 lg:gap-6 w-min max-w-full px-6 flex-wrap'>
						{srcNum === 0 && (
							<Link href='https://tpykt.ru/participant/'>
								<Button text='Стать резидентом' />
							</Link>
						)}
						<Button
							onClick={() => {
								handleOpenModal(0)
							}}
							className=''
							text='Заявка на очный визит'
						/>
						{scenes[srcNum].service && (
							<Button
								onClick={() => {
									handleOpenModal(1)
								}}
								className=''
								text='Заявка на практику/стажировку'
							/>
						)}
						{scenes[srcNum].video ? (
							<Button
								onClick={() => {
									handleOpenModal(2)
								}}
								text='Выступление основателя'
							/>
						) : null}
					</div>
				</div>
				<View360
					ref={viewerRef}
					hotspot={{ zoom: true }}
					className='w-full h-full'
					projection={projection}
					initialPitch={scenes[srcNum].init.pitch}
					initialYaw={scenes[srcNum].init.yaw}
				>
					<div className='view360-hotspots'>
						{scenes[srcNum].hotSpotsArr.map((hotspot, index) => {
							return (
								<div
									key={index}
									className={cn('view360-hotspot', 'cursor-pointer')}
									data-yaw={hotspot.yaw}
									data-pitch={hotspot.pitch}
									onClick={() => {
										changeProjection(hotspot.transition)
									}}
								>
									<svg z={100} height='100' width='100'>
										<circle
											cx='50'
											cy='50'
											r='30'
											stroke='blue'
											strokeWidth='2'
											fill='white'
										/>
									</svg>
								</div>
							)
						})}
					</div>
				</View360>
			</div>
		</div>
	)
}

export default Tour
