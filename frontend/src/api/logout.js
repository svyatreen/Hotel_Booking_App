export async function logout() {
	await fetch('http://localhost:3001/api/auth/logout', {
		method: 'POST',
		credentials: 'include',
	});
}
