export async function authorize(login, password) {
	try {
		const res = await fetch('/api/auth/login', {
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
