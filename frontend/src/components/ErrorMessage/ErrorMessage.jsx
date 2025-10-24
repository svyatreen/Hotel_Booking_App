export const ErrorMessage = ({ message, className = '' }) => {
	if (!message) return null;

	return (
		<div className={`text-center mt-4 text-red-500 text-sm font-medium ${className}`}>
			{message}
		</div>
	);
};
