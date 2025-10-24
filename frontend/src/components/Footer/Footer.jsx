export const Footer = () => {
	return (
		<footer className="bg-orange-50 border-t border-orange-200 shadow-inner mt-10">
			<div className="max-w-6xl mx-auto px-4 py-6 flex flex-col items-center gap-3 text-gray-700 text-sm">
				<div className="text-center">
					<p>
						Email:{' '}
						<a
							href="mailto:contact@hotelbooking.com"
							className="hover:underline"
						>
							contact@hotelbooking.com
						</a>
					</p>
					<p>
						Телефон:{' '}
						<a href="tel:+1234567890" className="hover:underline">
							+1 234 567 890
						</a>
					</p>
					<p>Адрес: 123 Main St, Your City</p>
				</div>

				<div className="text-gray-500 text-center">
					© 2025 Hotel Booking. Все права защищены.
				</div>
			</div>
		</footer>
	);
};
