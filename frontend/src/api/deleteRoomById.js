export async function deleteRoomById(id) {
	const res = await fetch(`/api/rooms/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при удалении комнаты');
	return true;
}
