import { useAuth } from '@/hooks/useAuth'
import { useAuthRedirect } from './useAuthRedirect'
import { useActions } from '@/hooks/useActions'

const Logout = () => {
	useAuthRedirect()
	const { logout } = useActions()

	logout()

	return <div>Logout</div>
}

export default Logout
