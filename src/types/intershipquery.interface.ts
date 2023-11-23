export interface IIntershipQuery {
	id: number
	createdAt: Date
	updatedAt: Date
	status: string
	to: string
	fio: string
	phoneNumber: string
	activity: string
	skills: string
}

export type TypeVisitQueries = { intershipqueries: IIntershipQuery[] }
