export async function deleteRoomById(id) {
	const res = await fetch(`http://localhost:3001/api/rooms/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при удалении комнаты');
	return true;
}
