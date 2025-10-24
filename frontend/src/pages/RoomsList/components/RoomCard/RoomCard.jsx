import { RoomCardBase } from '../../../../components';

export const RoomCard = ({ room }) => {
	return (
		<RoomCardBase
			id={room.id}
			imageUrl={room.imageUrl}
			title={room.title}
			category={room.category}
			cost={room.cost}
			linkTo={`/room/${room.id}`}
			primaryLabel="Подробнее"
			primaryVariant="orange"
		/>
	);
};
