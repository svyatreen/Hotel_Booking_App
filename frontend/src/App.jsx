import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from './components';
import { Login, Register, RoomsList, RoomDetails, MyBookings, AdminPanel } from './pages';
import { useDispatch } from 'react-redux';
import { useLayoutEffect } from 'react';
import { login } from './actions';
import { ProtectedRoute, ErrorPage } from './components';
import { ROLE } from './constants';

export const App = () => {
	const dispatch = useDispatch();

	useLayoutEffect(() => {
		const userDataJSON = sessionStorage.getItem('userData');
		if (!userDataJSON) return;

		const userData = JSON.parse(userDataJSON);
		dispatch(login({ ...userData, role_id: Number(userData.role_id) }));
	}, [dispatch]);

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<div className="flex-1">
				<Routes>
					<Route path="/" element={<RoomsList />} />
					<Route path="/room/:id" element={<RoomDetails />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/my-bookings"
						element={
							<ProtectedRoute
								element={<MyBookings />}
								allowedRoles={[ROLE.USER]}
							/>
						}
					/>
					<Route
						path="/admin"
						element={
							<ProtectedRoute
								element={<AdminPanel />}
								allowedRoles={[ROLE.ADMIN]}
							/>
						}
					/>
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
};
