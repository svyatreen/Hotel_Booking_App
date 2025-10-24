import { RoomCardBase } from '../../../../components';

export const AdminRoomCard = ({ room, status }) => {
	return (
		<RoomCardBase
			id={room.id}
			imageUrl={room.imageUrl}
			title={room.title}
			category={room.category}
			cost={room.cost}
			status={status}
			linkTo={`/room/${room.id}`}
			primaryLabel="Подробнее"
			primaryVariant="orange"
		/>
	);
};
