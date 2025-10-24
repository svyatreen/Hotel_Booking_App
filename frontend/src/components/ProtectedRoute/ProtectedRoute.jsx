import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';

export const ProtectedRoute = ({ element, allowedRoles }) => {
	const roleId = useSelector(selectUserRole);

	if (!allowedRoles.includes(roleId)) {
		if (roleId === ROLE.ADMIN) return <Navigate to="/admin" />;
		return (
			<div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-4">Доступ запрещён</h1>
				<p className="text-gray-600 mb-6">У вас нет прав</p>
			</div>
		);
	}

	return element;
};
