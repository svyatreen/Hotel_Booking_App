export const Input = ({ placeholder, type = 'text', registerProps }) => (
	<input
		type={type}
		placeholder={placeholder}
		className="w-full rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300"
		{...registerProps}
	/>
);
