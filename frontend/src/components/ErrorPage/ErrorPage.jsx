export const ErrorPage = () => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 text-center px-4">
			<h1 className="text-4xl font-bold text-gray-800 mb-4">Страница не найдена</h1>
			<p className="text-gray-600 mb-6">Запрашиваемая страница не существует</p>
			<div className="w-48"></div>
		</div>
	);
};
