export async function register(login, password) {
	try {
		const res = await fetch('http://localhost:3001/api/auth/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ login, password }),
			credentials: 'include',
		});
		const data = await res.json();
		if (data.error) return { error: data.error };
		return { res: data.payload };
	} catch (err) {
		console.error(err);
		return { error: 'Ошибка сервера' };
	}
}
