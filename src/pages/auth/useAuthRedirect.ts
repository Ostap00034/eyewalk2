import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useAuthRedirect = () => {
	const { user } = useAuth()

	const { replace, pathname, push } = useRouter()

	useEffect(() => {
		if (user) push('/visitqueries')
		else if (pathname !== '/auth' && pathname !== '/register') replace('/auth')
	}, [user])
}
