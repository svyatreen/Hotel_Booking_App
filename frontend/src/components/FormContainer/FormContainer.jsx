export const FormContainer = ({ title, children }) => (
	<div className="flex min-h-screen items-center justify-center bg-gray-50">
		<div className="w-full max-w-md rounded-lg bg-white shadow p-8">
			<h2 className="text-2xl font-bold text-center text-gray-800 mb-6">{title}</h2>
			{children}
		</div>
	</div>
);
