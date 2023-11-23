import { useAuthRedirect } from './useAuthRedirect'
import { logout } from '@/store/user/user.actions'

const Logout = () => {
	useAuthRedirect()
	logout()
	return <div>Logout</div>
}

export default Logout
