import { AdminRoomCard } from './components';
import { useAdminData } from '../../hooks';
import { Loader } from '../../components';

export const AdminPanel = () => {
	const { rooms, loading, error, getRoomStatus } = useAdminData();

	if (loading) return <Loader />;
	if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

	return (
		<div className="min-h-screen bg-orange-50 p-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				Админ-панель
			</h2>

			{rooms.length > 0 ? (
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{rooms.map((room) => (
						<AdminRoomCard
							key={room.id}
							room={room}
							status={getRoomStatus(room.id)}
						/>
					))}
				</div>
			) : (
				<div className="text-center text-lg text-gray-500 mt-10">Нет комнат</div>
			)}
		</div>
	);
};
