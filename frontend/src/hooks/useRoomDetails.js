import { useState, useEffect, useCallback } from 'react';
import { getRooms, getBookings } from '../api';

export const useRoomDetails = (roomId) => {
	const [room, setRoom] = useState(null);
	const [bookings, setBookings] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchData = useCallback(async () => {
		try {
			setLoading(true);
			const [roomsData, bookingsData] = await Promise.all([
				getRooms(),
				getBookings(),
			]);
			const foundRoom = roomsData.find((r) => r.id === roomId);
			if (!foundRoom) throw new Error('Номер не найден');
			setRoom(foundRoom);
			setBookings(bookingsData);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}, [roomId]);

	useEffect(() => {
		if (roomId) fetchData();
	}, [roomId, fetchData]);

	const isBooked = bookings.some((b) => b.roomId === room?.id);

	return { room, bookings, isBooked, loading, error, refresh: fetchData };
};
