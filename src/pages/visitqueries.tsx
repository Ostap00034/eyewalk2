import { VisitQueryService } from '@/services/visitquery/visitquery.service'
import { IVisitQuery } from '@/types/visitquery.interface'
import { useEffect, useState } from 'react'
import { useAuthRedirect } from './auth/useAuthRedirect'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'

const statuses = ['На рассмотрении', 'Отклонено', 'Принято']

const VisitQueries = () => {
	const { user } = useAuth()

	const { push } = useRouter()

	if (!user) push('/auth')

	const [data, setData] = useState<IVisitQuery[]>([])

	useEffect(() => {
		const fetchData = async () => {
			const queries = await VisitQueryService.getAll()

			setData(queries.data)
		}

		fetchData()
	}, [])

	return (
		<div className='w-full min-h-screen flex flex-col gap-2'>
			Visit queries
			{data &&
				data.map((query, index) => {
					if (query.status === 'In analys')
						return (
							<div className='rounded-sm bg-slate-700' key={index}>
								<div className=''>
									<div className=''>ФИО</div>
									<div className=''>{query.fio}</div>
								</div>
								<div className=''>
									<div className=''>Резидент</div>
									<div className=''>{query.to}</div>
								</div>
								<div className=''>
									<div className=''>Место работы/учебы</div>
									<div className=''>{query.activity}</div>
								</div>
								<div className=''>
									<div className=''>Статус</div>
									<select
										onChange={e => {
											VisitQueryService.updateStatus(query.id, {
												status: e.target.value,
											})
										}}
										defaultValue={
											query.status === 'In analys'
												? 'На рассмотрении'
												: query.status === 'Accept'
												? 'Принято'
												: 'Отклонено'
										}
									>
										{statuses.map((status, index) => (
											<option
												key={index}
												value={
													status === 'На рассмотрении'
														? 'In analys'
														: status === 'Принято'
														? 'Accept'
														: 'Reject'
												}
											>
												{status === 'На рассмотрении'
													? 'In analys'
													: status === 'Принято'
													? 'Accept'
													: 'Отклонено'}
											</option>
										))}
									</select>
									<div className=''>{query.status}</div>
								</div>
							</div>
						)
				})}
		</div>
	)
}

export default VisitQueries
