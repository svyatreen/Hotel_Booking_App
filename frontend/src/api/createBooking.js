export async function createBooking({ roomId }) {
	const res = await fetch('/api/bookings', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ roomId }),
		credentials: 'include',
	});
	const data = await res.json();
	return data.payload;
}
