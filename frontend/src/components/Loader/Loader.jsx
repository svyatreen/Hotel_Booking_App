export const Loader = ({ message = 'Загрузка...' }) => {
	return (
		<div className="flex flex-col items-center justify-center min-h-screen">
			<div className="w-16 h-16 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin mb-4"></div>
			<p className="text-gray-700 text-lg font-medium">{message}</p>
		</div>
	);
};
