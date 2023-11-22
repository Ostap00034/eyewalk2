// 'use client'
// import { useRef, useState } from 'react'
// import { Pannellum } from 'pannellum-react'

// import cn from 'clsx'

// import scenes from '@/data/scenes.json'

// const Tour = () => {
// 	const [currentScene, setCurrentScene] = useState(0)
// 	const [windows, setWindows] = useState([false, false])

// 	interface PannellumInstance {
// 		getViewer: () => any
// 	}

// 	const panImage = useRef<PannellumInstance | null>(null)

// 	const handleOpenModal = (number: number) => {
// 		const newArray = [...windows]

// 		newArray[number] = !newArray[number]

// 		console.log(newArray)

// 		setWindows(newArray)
// 	}

// 	return (
// 		<div className='w-full h-screen flex flex-col-reverse md:flex-row'>
// 			<div
// 				className={cn(
// 					'min-w-[30vw] h-[500px]',
// 					windows[0] ? 'visible opacity-100' : 'invisible opacity-0',
// 					'transition-all z-[1] bg-slate-600 duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
// 				)}
// 			></div>
// 			<div
// 				className={cn(
// 					'min-w-[30vw] h-[500px]',
// 					windows[1] ? 'visible opacity-100' : 'invisible opacity-0',
// 					'transition-all z-[1] bg-blue-600 duration-300 ease-in-out fixed w-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'
// 				)}
// 			></div>
// 			<div className='w-full h-[30vh] overflow-y-scroll md:w-[20vw] md:h-screen bg-red-600 text-black text-xl flex flex-col'>
// 				{scenes[currentScene].sceneName}
// 				<div className=''>
// 					<div className=''>Основатель</div>
// 					<div className=''>
// 						{scenes[currentScene].creator || 'Остутствует'}
// 					</div>
// 				</div>
// 				<div className=''>
// 					<div className=''>Дата начала резиденства</div>
// 					<div className=''>
// 						{scenes[currentScene].createdAt || 'Остутствует'}
// 					</div>
// 				</div>
// 				<div className=''>
// 					<div className=''>Сфера деятельности</div>
// 					<div className=''>
// 						{scenes[currentScene].fieldOfActivity || 'Остутствует'}
// 					</div>
// 				</div>
// 				<div className=''>
// 					<div className=''>Информация</div>
// 					<div className=''>{scenes[currentScene].info || 'Остутствует'}</div>
// 				</div>
// 				<div className=''>
// 					<div className=''>Услуга</div>
// 					<div className=''>
// 						{scenes[currentScene].service || 'Остутствует'}
// 					</div>
// 				</div>
// 				<button
// 					onClick={() => {
// 						handleOpenModal(0)
// 					}}
// 					className=''
// 				>
// 					Отправить заявку на очный визит
// 				</button>
// 				<button
// 					onClick={() => {
// 						handleOpenModal(1)
// 					}}
// 					className=''
// 				>
// 					Отправить заявку на прохождение практики/стажировки
// 				</button>
// 			</div>
// 			<div className='w-full md:w-[80vw] h-[70vh] md:h-screen'>
// 				<Pannellum
// 					width='100%'
// 					height='100%'
// 					ref={panImage}
// 					image={scenes[currentScene].scenePanoImg + '?resize=800%2C600'}
// 					pitch={scenes[currentScene].init.yaw}
// 					yaw={scenes[currentScene].init.pitch}
// 					hfov={100}
// 					showControls={true}
// 					onError={(err: any): void => {
// 						console.log('Error', err)
// 					}}
// 					draggable
// 					autoLoad
// 					showZoomCtrl={false}
// 					onMouseup={(event: any): void => {
// 						const viewer = panImage.current as PannellumInstance
// 						if (viewer && viewer.getViewer) {
// 							console.log(
// 								'pitch: ' + viewer.getViewer().mouseEventToCoords(event)[0]
// 							)
// 							console.log(
// 								'yaw: ' + viewer.getViewer().mouseEventToCoords(event)[1]
// 							)
// 						}
// 					}}
// 				>
// 					{scenes[currentScene].hotSpotsArr.map((hotSpot, index) => {
// 						return (
// 							<Pannellum.Hotspot
// 								key={`${currentScene}-${index}`}
// 								type='custom'
// 								pitch={hotSpot.pitch}
// 								yaw={hotSpot.yaw}
// 								handleClick={() =>
// 									setCurrentScene(parseInt(hotSpot.transition))
// 								}
// 								name='INFO'
// 							/>
// 						)
// 					})}
// 				</Pannellum>
// 			</div>
// 		</div>
// 	)
// }

// export default Tour
