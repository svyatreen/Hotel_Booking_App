import { RoomCard } from './components';
import { useRooms, useBookings } from '../../hooks';
import { Loader, ErrorMessage } from '../../components';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { Navigate } from 'react-router-dom';

export const RoomsList = () => {
	const { rooms, loading, error } = useRooms();
	const { bookings } = useBookings();
	const roleId = useSelector(selectUserRole);

	if (roleId === ROLE.ADMIN) {
		return <Navigate to="/admin" />;
	}

	const bookedRoomIds = bookings.map((b) => b.roomId);
	const availableRooms = rooms.filter((room) => !bookedRoomIds.includes(room.id));

	if (loading) return <Loader />;

	return (
		<div className="flex flex-col min-h-screen bg-orange-50 px-6 py-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				Доступные номера
			</h2>

			<ErrorMessage message={error} className="mt-4" />

			{availableRooms.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{availableRooms.map((room) => (
						<RoomCard key={room.id} room={room} />
					))}
				</div>
			) : (
				<div className="text-center text-lg text-gray-500 mt-10">
					Нет доступных номеров
				</div>
			)}
		</div>
	);
};
