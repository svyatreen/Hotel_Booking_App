import { RoomCardBase } from '../../../../components';

export const BookingCard = ({ booking, onCancel }) => {
	const { room } = booking;

	return (
		<RoomCardBase
			id={room.id}
			imageUrl={room.imageUrl}
			title={room.title}
			category={room.category}
			cost={room.cost}
			linkTo={`/room/${room.id}`}
			primaryLabel="Подробнее"
			onSecondary={() => onCancel(booking.id)}
			secondaryLabel="Отменить"
			secondaryVariant="red"
		/>
	);
};
