export async function getAvailableRooms() {
	const res = await fetch('http://localhost:3001/api/rooms/available', {
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при загрузке доступных комнат');
	const data = await res.json();
	return data.payload ?? [];
}
