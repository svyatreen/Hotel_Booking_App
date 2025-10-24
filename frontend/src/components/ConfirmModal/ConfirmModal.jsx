import { Button } from '../Button/Button';

export const ConfirmModal = ({
	isOpen,
	title = 'Подтвердите действие',
	message,
	onConfirm,
	onCancel,
}) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
				<h2 className="text-xl font-bold mb-4">{title}</h2>
				<p className="mb-6">{message}</p>
				<div className="flex justify-end gap-3">
					<Button variant="gray" onClick={onCancel}>
						Отмена
					</Button>
					<Button variant="red" onClick={onConfirm}>
						Да
					</Button>
				</div>
			</div>
		</div>
	);
};
