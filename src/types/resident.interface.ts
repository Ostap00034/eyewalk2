export interface IVisitQuery {
	id: number
	createdAt: Date
	updatedAt: Date
	creator: string
	fieldOfActivity: string
	info: string
	name: string
	created: string
	service: string
	scenePanoImg: string
	hotSpotArr: string[]
	init: string[]
}

export type TypeVisitQueries = { visitqueries: IVisitQuery[] }
