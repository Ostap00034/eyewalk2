'use client'
import { useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { useAuthRedirect } from './auth/useAuthRedirect'
import { ILoginPassword } from '@/types/user.interface'

const initData: ILoginPassword = {
	login: '',
	password: '',
	confirm_password: '',
}

const Register = () => {
	useAuthRedirect()

	const [data, setData] = useState<ILoginPassword>(initData)

	const { register } = useActions()

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
				<input
					type='password'
					value={data.confirm_password}
					onChange={e => setData({ ...data, confirm_password: e.target.value })}
				/>
				<button
					className='bg-white rounded-sm'
					onClick={e => {
						e.preventDefault()
						if (
							data.login &&
							data.password &&
							data.password === data.confirm_password
						) {
							const signUp = async () => {
								const res = await register(data)

								console.log(res)
							}

							signUp()

							setData(initData)
						}
					}}
				>
					Register
				</button>
			</form>
		</div>
	)
}

export default Register
