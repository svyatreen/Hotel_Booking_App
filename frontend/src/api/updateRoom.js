export async function updateRoom(id, updatedRoom) {
	const res = await fetch(`http://localhost:3001/api/rooms/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(updatedRoom),
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при обновлении комнаты');
	const data = await res.json();
	return data.payload;
}
