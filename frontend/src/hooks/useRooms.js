import { useState, useEffect } from 'react';
import { getRooms } from '../api';

export const useRooms = () => {
	const [rooms, setRooms] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const fetchRooms = async () => {
		try {
			setLoading(true);
			const data = await getRooms();
			setRooms(data);
		} catch (err) {
			console.error(err);
			setError('Ошибка при загрузке комнат');
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchRooms();
	}, []);

	return { rooms, loading, error, refresh: fetchRooms };
};
