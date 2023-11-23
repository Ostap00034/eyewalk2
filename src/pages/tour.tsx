import { useEffect, useMemo, useRef, useState, useCallback } from 'react'

import cn from 'clsx'

import scenes from '@/data/scenes.json'
import View360, {
	EquirectProjection,
	ViewChangeEvent,
} from '@egjs/react-view360'
import '@egjs/react-view360/css/view360.min.css'
import ReactPlayer from 'react-player'
import { VisitqueryService } from '@/services/visitquery/visitquery.service'
import { IVisitQuery } from '@/types/visitquery.interface'
import { IIntershipQuery } from '@/types/intershipquery.interface'
import { IntershipQueryService } from '@/services/intershipquery/intershipquery.service'

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

		console.log(newArray)

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
			<div className='w-full h-screen flex flex-col-reverse lg:flex-row'>
				<div
					className={cn(
						'min-w-[30vw] h-auto',
						windows[0] ? 'visible opacity-100' : 'invisible opacity-0',
						'transition-all z-[1] duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					)}
				>
					<form className='bg-slate-400 text-black flex flex-col min-w-[438px] h-auto p-6 gap-6'>
						<div className=''></div>
						<input
							type='text'
							value={visitData.fio}
							onChange={e => {
								setVisitData({ ...visitData, fio: e.target.value })
							}}
						/>
						<input
							type='text'
							value={visitData.phoneNumber}
							onChange={e => {
								setVisitData({ ...visitData, phoneNumber: e.target.value })
							}}
						/>
						<input
							type='text'
							value={visitData.activity}
							onChange={e => {
								setVisitData({ ...visitData, activity: e.target.value })
							}}
						/>
						<button
							onClick={e => {
								e.preventDefault()
								if (
									visitData.fio &&
									visitData.phoneNumber &&
									visitData.activity
								)
									VisitqueryService.create({
										...visitData,
										to: scenes[srcNum].name || 'ИТ парк',
									})
								setVisitData(initVisitData)
								handleOpenModal(1)
							}}
						>
							Подать
						</button>
					</form>
				</div>
				<div
					className={cn(
						'min-w-[30vw]',
						windows[1] ? 'visible opacity-100' : 'invisible opacity-0',
						'transition-all z-[1] duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
					)}
				>
					<form className='bg-slate-400 text-black flex flex-col min-w-[438px] h-auto p-6 gap-6'>
						<div className=''></div>
						<input
							type='text'
							value={intershipData.fio}
							onChange={e => {
								setIntershipData({ ...intershipData, fio: e.target.value })
							}}
						/>
						<input
							type='text'
							value={intershipData.phoneNumber}
							onChange={e => {
								setIntershipData({
									...intershipData,
									phoneNumber: e.target.value,
								})
							}}
						/>
						<input
							type='text'
							value={intershipData.activity}
							onChange={e => {
								setIntershipData({ ...intershipData, activity: e.target.value })
							}}
						/>
						<input
							type='text'
							value={intershipData.skills}
							onChange={e => {
								setIntershipData({ ...intershipData, skills: e.target.value })
							}}
						/>
						<button
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
								handleOpenModal(1)
							}}
						>
							Подать
						</button>
					</form>
				</div>
				{scenes[srcNum].video ? (
					<div
						className={cn(
							'min-w-[30vw] h-auto',
							windows[2] ? 'visible opacity-100' : 'invisible opacity-0',
							'transition-all z-[1] fixed duration-300 ease-in-out w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
						)}
					>
						<div className='relative'>
							<svg
								className='absolute right-0 -top-10 w-10 h-10 p-1 bg-slate-400 rounded-full cursor-pointer'
								onClick={() => {
									handleOpenModal(2)
								}}
								viewBox='0 0 50 50'
							>
								<path
									xmlns='http://www.w3.org/2000/svg'
									d='M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z'
								/>
							</svg>
							<ReactPlayer
								controls
								className='w-full h-full'
								url={scenes[srcNum].video}
							/>
						</div>
					</div>
				) : null}
				<div className='w-full h-[30vh] overflow-y-scroll lg:w-[30vw] lg:h-screen bg-red-600 text-black text-xl flex flex-col'>
					{scenes[srcNum].name}
					<div className=''>
						<div className=''>Основатель</div>
						<div className=''>{scenes[srcNum].creator || 'Остутствует'}</div>
					</div>
					<div className=''>
						<div className=''>Дата начала резиденства</div>
						<div className=''>{scenes[srcNum].createdAt || 'Остутствует'}</div>
					</div>
					<div className=''>
						<div className=''>Сфера деятельности</div>
						<div className=''>
							{scenes[srcNum].fieldOfActivity || 'Остутствует'}
						</div>
					</div>
					<div className=''>
						<div className=''>Информация</div>
						<div className=''>{scenes[srcNum].info || 'Остутствует'}</div>
					</div>
					<div className=''>
						<div className=''>Услуга</div>
						<div className=''>{scenes[srcNum].service || 'Остутствует'}</div>
					</div>
					<button
						onClick={() => {
							handleOpenModal(0)
						}}
						className=''
					>
						Отправить заявку на очный визит
					</button>
					<button
						onClick={() => {
							handleOpenModal(1)
						}}
						className=''
					>
						Отправить заявку на прохождение практики/стажировки
					</button>
					{scenes[srcNum].video ? (
						<button
							onClick={() => {
								handleOpenModal(2)
							}}
						>
							Посмотреть выступление основателя
						</button>
					) : null}
				</div>

				<View360
					// onViewChange={(evt: ViewChangeEvent) => {}}
					ref={viewerRef}
					hotspot={{ zoom: true }}
					className='w-full h-full'
					projection={projection}
					initialPitch={scenes[srcNum].init.pitch}
					initialYaw={scenes[srcNum].init.yaw}
				>
					<div className='view360-container h-0 is-16by9'>
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
					</div>
				</View360>
			</div>
		</div>
	)
}

export default Tour
