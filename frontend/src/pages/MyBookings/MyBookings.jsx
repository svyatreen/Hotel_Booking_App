import { useSelector } from 'react-redux';
import { selectUserSession } from '../../selectors';
import { BookingCard } from './components';
import { useBookings } from '../../hooks';
import { deleteBookingById } from '../../api';
import { Loader, ErrorMessage } from '../../components';

export const MyBookings = () => {
	const session = useSelector(selectUserSession);
	const { bookings, loading, error, refresh } = useBookings();

	const userBookings = bookings.filter((b) => b.userId === session);

	const handleDelete = async (bookingId) => {
		try {
			await deleteBookingById(bookingId);
			refresh();
		} catch (err) {
			console.error(err);
			alert('Ошибка при удалении брони');
		}
	};

	if (loading) return <Loader />;

	if (userBookings.length === 0)
		return (
			<div className="text-center mt-10 text-gray-500">
				У вас пока нет забронированных номеров
			</div>
		);

	return (
		<div className="flex flex-col min-h-screen bg-orange-50 px-6 py-8">
			<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
				Мои бронирования
			</h2>

			<ErrorMessage message={error} className="mt-4" />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{userBookings.map((booking) => (
					<BookingCard
						key={booking.id}
						booking={booking}
						onCancel={handleDelete}
					/>
				))}
			</div>
		</div>
	);
};
