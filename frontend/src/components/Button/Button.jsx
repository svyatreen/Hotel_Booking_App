export const Button = ({
	children,
	type = 'button',
	disabled,
	variant = 'orange',
	className = '',
	onClick,
}) => {
	const base = `w-full rounded-md border font-semibold py-2 transition disabled:bg-gray-300 disabled:cursor-not-allowed`;

	const variants = {
		orange: 'bg-orange-200 border-orange-200 text-gray-800 hover:bg-orange-300',
		red: 'bg-red-200 border-red-200 text-gray-800 hover:bg-red-300',
		blue: 'bg-blue-200 border-blue-200 text-gray-800 hover:bg-blue-300',
		gray: 'bg-gray-200 border-gray-200 text-gray-800 hover:bg-gray-300',
	};

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`${base} ${variants[variant]} ${className}`}
		>
			{children}
		</button>
	);
};
