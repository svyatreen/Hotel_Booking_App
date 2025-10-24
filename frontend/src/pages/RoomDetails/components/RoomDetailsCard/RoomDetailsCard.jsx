import { useSelector } from 'react-redux';
import { selectUserRole } from '../../../../selectors';
import { ROLE } from '../../../../constants';
import { Button, Input } from '../../../../components';

export const RoomDetailsCard = ({
	room,
	isBooked,
	onBook,
	onEdit,
	onDelete,
	isEditing,
	onChange,
}) => {
	const role = useSelector(selectUserRole);
	const isAdmin = role === ROLE.ADMIN;

	return (
		<div className="flex flex-col md:flex-row min-h-screen bg-orange-50 p-8 gap-8">
			<div className="md:w-1/2 w-full h-80 md:h-auto">
				<img
					src={room.imageUrl}
					alt={room.title}
					className="w-full h-full object-cover rounded-lg shadow-md"
				/>
			</div>

			<div className="md:w-1/2 w-full flex flex-col  justify-between bg-white p-6 rounded-lg shadow-md">
				<div className="flex flex-col space-y-4">
					{isEditing ? (
						<>
							<Input
								type="text"
								placeholder="Название номера"
								registerProps={{
									name: 'title',
									value: room.title,
									onChange,
								}}
							/>
							<textarea
								name="content"
								value={room.content}
								onChange={onChange}
								placeholder="Описание"
								className="w-full rounded-md border border-orange-200 bg-orange-50 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-300 mb-4"
								style={{ minHeight: '400px', resize: 'vertical' }}
							/>
							<Input
								type="number"
								placeholder="Цена за ночь"
								registerProps={{
									name: 'cost',
									value: room.cost,
									onChange,
								}}
							/>
						</>
					) : (
						<>
							<h2 className="text-3xl font-bold text-gray-800 mb-4">
								{room.title}
							</h2>
							<p className="text-gray-700 mb-4">{room.content}</p>
							<p className="text-gray-600 mb-2">
								<span className="font-semibold">Категория:</span>{' '}
								{room.category}
							</p>
							<p className="text-gray-600 mb-2">
								<span className="font-semibold">Вместимость:</span>{' '}
								{room.capacity} человек
							</p>
							<p className="text-gray-600 mb-4">
								<span className="font-semibold">Цена:</span> {room.cost} ₽
								/ ночь
							</p>
						</>
					)}
				</div>
				{!isAdmin && !isBooked && !isEditing && (
					<Button
						variant="orange"
						onClick={onBook}
						className="w-full py-3 text-lg mt-4"
					>
						Забронировать
					</Button>
				)}
				{isAdmin && (
					<div className="flex gap-3 mt-4">
						<Button
							variant="orange"
							onClick={onEdit}
							className="flex-1 py-3 text-lg"
						>
							{isEditing ? 'Сохранить' : 'Редактировать'}
						</Button>
						{!isEditing && (
							<Button
								variant="red"
								onClick={onDelete}
								className="flex-1 py-3 text-lg"
							>
								Удалить
							</Button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};
