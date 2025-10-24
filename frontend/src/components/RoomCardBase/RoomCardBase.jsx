import { Button } from '../Button/Button';
import { Link } from 'react-router-dom';

export const RoomCardBase = ({
	imageUrl,
	title,
	category,
	cost,
	status,
	onPrimary,
	onSecondary,
	primaryLabel = 'Подробнее',
	secondaryLabel,
	primaryVariant = 'orange',
	secondaryVariant = 'red',
	linkTo,
}) => {
	return (
		<div className="bg-white rounded-lg shadow p-4 flex flex-col">
			<img
				src={imageUrl}
				alt={title}
				className="w-full h-48 object-cover rounded-md mb-3"
			/>

			<h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
			<p className="text-gray-600">Категория: {category}</p>
			<p className="text-gray-800 font-medium mb-3">Цена: {cost} ₽/ночь</p>

			{status && (
				<p
					className={`font-semibold mb-3 ${
						status === 'Свободен' ? 'text-green-600' : 'text-red-600'
					}`}
				>
					Статус: {status}
				</p>
			)}

			<div className="mt-auto flex gap-2">
				{linkTo ? (
					<Link to={linkTo} className="flex-1">
						<Button variant={primaryVariant} className="w-full">
							{primaryLabel}
						</Button>
					</Link>
				) : (
					onPrimary && (
						<Button
							variant={primaryVariant}
							onClick={onPrimary}
							className="flex-1 w-full"
						>
							{primaryLabel}
						</Button>
					)
				)}

				{onSecondary && (
					<Button
						variant={secondaryVariant}
						onClick={onSecondary}
						className="flex-1 w-full"
					>
						{secondaryLabel}
					</Button>
				)}
			</div>
		</div>
	);
};
