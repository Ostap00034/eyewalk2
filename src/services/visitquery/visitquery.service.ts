import { instance } from '@/api/api.interceptor'
import { IVisitQuery } from '@/types/visitquery.interface'

export const VisitQueryService = {
	async getAll() {
		return instance<IVisitQuery[]>({
			url: '/visitquery',
			method: 'GET',
		})
	},

	async getById(VisitqueryId: string | number) {
		return instance<IVisitQuery>({
			url: `/visitquery/${VisitqueryId}`,
			method: 'GET',
		})
	},

	async create(data: IVisitQuery) {
		return instance<IVisitQuery>({
			url: `/visitquery/`,
			method: 'POST',
			data,
		})
	},

	async updateStatus(VisitqueryId: string | number, data: { status: string }) {
		return instance<IVisitQuery>({
			url: `/visitquery/${VisitqueryId}`,
			method: 'PUT',
			data,
		})
	},
}
