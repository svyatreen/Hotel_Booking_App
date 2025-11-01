import { useState, useEffect, useCallback } from 'react';
import { getRooms, getAvailableRooms } from '../api';

export const useRooms = (onlyAvailable = false) => {
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchRooms = useCallback(async () => {
		try {
			setLoading(true);
			const data = onlyAvailable ? await getAvailableRooms() : await getRooms();
			setRooms(data);
		} catch (err) {
			console.error(err);
			setError('Ошибка при загрузке комнат');
		} finally {
			setLoading(false);
		}
	}, [onlyAvailable]);

	useEffect(() => {
		fetchRooms();
	}, [onlyAvailable, fetchRooms]);

	return { rooms, loading, error, refresh: fetchRooms };
};
