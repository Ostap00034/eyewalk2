import { VisitQueryService } from '@/services/visitquery/visitquery.service'
import { IVisitQuery } from '@/types/visitquery.interface'
import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import Link from 'next/link'
import cn from 'clsx'
import Field from '@/components/ui/field'
import { io } from 'socket.io-client'

const VisitQueries = () => {
	const { user } = useAuth()

	const { push } = useRouter()

	if (!user) push('/auth')

	const [data, setData] = useState<IVisitQuery[]>([])
	const [status, setStatus] = useState('In analys')

	useEffect(() => {
		const socket = io('https://eye-walk.online/')

		const fetchData = async () => {
			const queries = await VisitQueryService.getAll()

			setData(queries.data)
		}

		fetchData()

		socket.on('create-v', query => {
			setData(prevData => {
				const newArray = [...prevData]

				newArray.unshift(query)

				return newArray
			})
		})

		socket.on('update-v', query => {
			setData(prevData => {
				const newArray = [...prevData]

				const existingQuery = newArray.findIndex(q => q.id === query.id)

				if (existingQuery !== -1) {
					newArray[existingQuery] = query
				} else {
					newArray.unshift(query)
				}

				return newArray
			})
		})

		return () => {
			socket.off('create-v')
			socket.off('update-v')
		}
	}, [])

	return (
		<div className='w-full min-h-screen flex flex-col gap-2 pt-2'>
			<div className='flex flex-row gap-12 w-full justify-center'>
				<Link href='/visitqueries'>
					<div className='px-12 flex flex-col gap-2'>
						<div className=' text-[18px] font-century-gothic font-bold leading-[32px] cursor-pointer underline'>
							Заявки на очный визит
						</div>

						<div className='flex flex-row gap-2 font-century-gothic font-bold'>
							<div
								onClick={() => {
									setStatus('In analys')
								}}
								className={cn(
									status === 'In analys' ? 'underline' : '',
									'cursor-pointer'
								)}
							>
								На рассмотрении
							</div>
							<div
								onClick={() => {
									setStatus('Accept')
								}}
								className={cn(
									status === 'Accept' ? 'underline' : '',
									'cursor-pointer'
								)}
							>
								Назначенные
							</div>
							<div
								onClick={() => {
									setStatus('Reject')
								}}
								className={cn(
									status === 'Reject' ? 'underline' : '',
									'cursor-pointer'
								)}
							>
								Архив
							</div>
						</div>
					</div>
				</Link>

				<Link href='/intershipqueries'>
					<div className='px-12 text-[18px] font-century-gothic font-bold leading-[32px] cursor-pointer'>
						Заявки на прохождение стажировки/практики
					</div>
				</Link>
			</div>
			<div className='h-10'></div>
			<div className='w-full max-w-[1360px] h-auto flex flex-col justify-center items-center mx-auto'>
				<div className='flex flex-row w-full gap-[74px] justify-around items-center font-century-gothic text-[14px] font-bold py-2'>
					<div className='text-center w-[3vw]'>ID</div>
					<div className='text-center w-[20vw]'>Дата стажировки/практики</div>
					<div className='text-center w-[20vw]'>ФИО</div>
					<div className='text-center w-[15vw]'>Контактные данные</div>
					<div className='text-center w-[20vw]'>Место учебы/работы</div>
					<div className='text-center w-[4vw]'></div>
				</div>
				{data &&
					data.map((query, index) => {
						if (query.status === status)
							return (
								<div
									key={index}
									className='flex flex-row w-full gap-[74px] justify-aroundi[] items-center font-century-gothic text-[14px] font-bold py-2 hover:bg-[#f2f2f2]'
								>
									<div className='text-center w-[3vw]'>{query.id}</div>
									<div className='text-center w-[20vw]'>
										{query.appointmentDate ? (
											<Field
												placeholder=''
												value={query.appointmentDate.toString().slice(0, 10)}
												type='date'
												onChange={async e => {
													console.log(e.target.value)
													await VisitQueryService.updateStatus(query.id, {
														status: 'Accept',
														appointmentDate: new Date(e.target.value),
													})
												}}
											/>
										) : (
											<Field
												placeholder=''
												type='date'
												onChange={async e => {
													console.log(e.target.value)
													await VisitQueryService.updateStatus(query.id, {
														status: 'Accept',
														appointmentDate: new Date(e.target.value),
													})
												}}
											/>
										)}
									</div>
									<div className='text-center w-[20vw]'>{query.fio}</div>
									<div className='text-center w-[15vw]'>
										{query.phoneNumber}
									</div>
									<div className='text-center w-[20vw]'>{query.activity}</div>
									<div className='text-center w-[4vw]'>
										<svg
											onClick={() => {
												VisitQueryService.updateStatus(query.id, {
													status: 'Reject',
												})
											}}
											className='cursor-pointer'
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
													stroke='black'
													strokeWidth='2.5'
													strokeLinecap='round'
													strokeLinejoin='round'
												/>
											</g>
										</svg>
									</div>
								</div>
							)
					})}
			</div>
		</div>
	)
}

export default VisitQueries
