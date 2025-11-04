export async function getBookings() {
	const res = await fetch('/api/bookings', {
		credentials: 'include',
	});
	if (!res.ok) throw new Error('Ошибка при загрузке бронирований');
	const data = await res.json();
	return data.payload ?? [];
}
