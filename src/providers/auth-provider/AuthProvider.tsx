'use client'
import { FC, PropsWithChildren, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useActions } from '@/hooks/useActions'
import { useRouter } from 'next/router'
import { getAccessToken, getRefreshToken } from '@/services/auth/auth.helper'

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
	const { user } = useAuth()
	const { checkAuth, logout } = useActions()

	const { pathname } = useRouter()

	useEffect(() => {
		const accessToken = getAccessToken()
		if (accessToken) checkAuth()
	}, [])

	useEffect(() => {
		const refreshToken = getRefreshToken()
		if (!refreshToken && user) logout()
	}, [pathname])

	return <>{children}</>
}

export default AuthProvider
