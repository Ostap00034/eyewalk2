'use client'
import { useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { useAuthRedirect } from './auth/useAuthRedirect'
import { ILoginPassword } from '@/types/user.interface'

interface User {
	login: string
	password: string
}

const initData: ILoginPassword = {
	login: '',
	password: '',
}

const Auth = () => {
	useAuthRedirect()

	const [data, setData] = useState<ILoginPassword>(initData)

	const { login } = useActions()

	return (
		<div className='w-full h-screen flex justify-center items-center'>
			<form className='flex flex-col gap-4 text-black'>
				<input
					type='text'
					value={data.login}
					onChange={e => setData({ ...data, login: e.target.value })}
				/>
				<input
					type='password'
					value={data.password}
					onChange={e => setData({ ...data, password: e.target.value })}
				/>
				<button
					className='bg-white rounded-sm'
					onClick={e => {
						e.preventDefault()
						if (data.login && data.password) {
							const signIn = async () => {
								const res = await login(data)

								console.log(res)
							}

							signIn()

							setData(initData)
						}
					}}
				>
					Login
				</button>
			</form>
		</div>
	)
}

export default Auth
