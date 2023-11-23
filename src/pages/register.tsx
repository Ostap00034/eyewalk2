'use client'
import { useState } from 'react'
import { useActions } from '@/hooks/useActions'
import { useAuthRedirect } from './auth/useAuthRedirect'
import { ILoginPassword } from '@/types/user.interface'
import Button from '@/components/ui/button'
import Field from '@/components/ui/field'
import Link from 'next/link'

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
		<div className='w-full bg-white h-screen flex justify-center items-center'>
			<form className='bg-white flex flex-col min-w-[438px] h-auto p-6 gap-6 rounded-xl border-[1px] border-[#f2f2f2]'>
				<div className='flex flex-row justify-between'>
					<div className='text-[24px] font-century-gothic font-bold leading-[32px]'>
						Регистрация{' '}
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
					<Field
						placeholder='Подтвердите пароль'
						type='password'
						value={data.confirm_password}
						onChange={e =>
							setData({ ...data, confirm_password: e.target.value })
						}
					/>
				</div>

				<div className=''>
					<Button
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
						text='Зарегистрироваться'
					/>
					<div className='w-full h-4'></div>
					<Link href='/auth'>
						<Button text='На страницу входа' />
					</Link>
				</div>
			</form>
		</div>
	)
}

export default Register
