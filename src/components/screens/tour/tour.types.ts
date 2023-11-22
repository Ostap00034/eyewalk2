export interface IScene {
	id: number
	sceneName: string
	hotSpotArr: hotSpot[]
	init: hotSpot
	creator: string
	created: string
	fieldOfActivity: string
	info: string
	service: string
	scenePanoImg: string
}

interface hotSpot {
	pitch: number
	yaw: number
	transition?: string
}
