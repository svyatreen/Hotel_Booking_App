import { useState, useEffect } from 'react';
import { getRooms, getBookings } from '../api';

export const useAdminData = () => {
	const [rooms, setRooms] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchAdminData = async () => {
		try {
			setLoading(true);
			const [roomsData, bookingsData] = await Promise.all([
				getRooms(),
				getBookings(),
			]);
			setRooms(roomsData);
			setBookings(bookingsData);
		} catch (err) {
			console.error(err);
			setError('Ошибка при загрузке данных');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAdminData();
	}, []);

	const getRoomStatus = (roomId) => {
		const isBooked = bookings.some((b) => b.roomId === roomId);
		return isBooked ? 'Забронирован' : 'Свободен';
	};

	return { rooms, bookings, loading, error, refresh: fetchAdminData, getRoomStatus };
};
