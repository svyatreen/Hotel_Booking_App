import { useState, useEffect } from 'react';
import { getBookings, getRooms } from '../api';

export const useBookings = () => {
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchBookings = async () => {
		try {
			setLoading(true);
			const [bookingsData, roomsData] = await Promise.all([
				getBookings(),
				getRooms(),
			]);
			const enrichedBookings = bookingsData.map((b) => ({
				...b,
				room: roomsData.find((r) => r.id === b.roomId),
			}));
			setBookings(enrichedBookings);
		} catch (err) {
			console.error(err);
			setError('Ошибка при загрузке бронирований');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBookings();
	}, []);

	return { bookings, loading, error, refresh: fetchBookings };
};
