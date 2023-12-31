export interface IVisitQuery {
	id: number
	createdAt: Date
	updatedAt: Date
	status: string
	to: string
	fio: string
	phoneNumber: string
	activity: string
	appointmentDate: Date
}

export type TypeVisitQueries = { visitqueries: IVisitQuery[] }
