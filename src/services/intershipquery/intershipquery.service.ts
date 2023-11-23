import { instance } from '@/api/api.interceptor'
import { IIntershipQuery } from '@/types/intershipquery.interface'

export const IntershipQueryService = {
	async getAll() {
		return instance<IIntershipQuery[]>({
			url: '/intershipquery',
			method: 'GET',
		})
	},

	async getById(intershipqueryId: string | number) {
		return instance<IIntershipQuery>({
			url: `/intershipquery/${intershipqueryId}`,
			method: 'GET',
		})
	},

	async create(data: IIntershipQuery) {
		return instance<IIntershipQuery>({
			url: `/intershipquery/`,
			method: 'POST',
			data,
		})
	},

	async updateStatus(
		intershipqueryId: string | number,
		data: { status: string }
	) {
		return instance<IIntershipQuery>({
			url: `/intershipquery/${intershipqueryId}`,
			method: 'PUT',
			data,
		})
	},
}
