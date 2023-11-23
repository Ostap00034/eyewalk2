'use client'
import { useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { useAuthRedirect } from './auth/useAuthRedirect'
import { ILoginPassword } from '@/types/user.interface'
import Field from '@/components/ui/field'
import Button from '@/components/ui/button'
import Link from 'next/link'

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
			<form className='bg-white flex flex-col min-w-[438px] h-auto p-6 gap-6 rounded-xl border-[1px] border-[#f2f2f2]'>
				<div className='flex flex-row justify-between'>
					<div className='text-[24px] font-century-gothic font-bold leading-[32px]'>
						Вход в систему{' '}
					</div>
				</div>

				<div className='flex flex-col gap-4'>
					<Field
						placeholder='Логин'
						type='text'
						value={data.login}
						onChange={e => setData({ ...data, login: e.target.value })}
					/>
					<Field
						placeholder='Пароль'
						type='password'
						value={data.password}
						onChange={e => setData({ ...data, password: e.target.value })}
					/>
				</div>
				<div className=''>
					<Button
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
						text='Войти'
					/>
					<div className='h-4'></div>
					<Link href='/register'>
						<Button text='На страницу регистрации' />
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Auth
