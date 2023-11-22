import { IUserState } from '@/store/user/user.interface'

export interface IUser {
	id: number
	login: string
	password: string
}

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IInitialState {
	user: IUserState | null
	isLoading: boolean
}

export interface ILoginPassword {
	login: string
	password: string
	confirm_password?: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
