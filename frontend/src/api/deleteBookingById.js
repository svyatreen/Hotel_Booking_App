export async function deleteBookingById(id) {
	const res = await fetch(`http://localhost:3001/api/bookings/${id}`, {
		method: 'DELETE',
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при удалении брони');
	return true;
}
