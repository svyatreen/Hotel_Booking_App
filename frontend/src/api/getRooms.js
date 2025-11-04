export async function getRooms() {
	const res = await fetch('/api/rooms', {
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при загрузке комнат');
	const data = await res.json();
	return data.payload ?? [];
}
