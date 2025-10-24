import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { RoomDetailsCard } from './components';
import { useRoomDetails } from '../../hooks';
import { createBooking, deleteRoomById, updateRoom } from '../../api';
import { Loader, ErrorPage, ConfirmModal } from '../../components';

export const RoomDetails = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const roleId = useSelector(selectUserRole);

	const { room, isBooked, loading, error, refresh } = useRoomDetails(id);
	const [isEditing, setIsEditing] = useState(false);
	const [editedRoom, setEditedRoom] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		if (room && !editedRoom) setEditedRoom(room);
	}, [room, editedRoom]);

	const handleBooking = async () => {
		if (roleId === ROLE.GUEST) {
			navigate('/login');
			return;
		}

		try {
			await createBooking({ roomId: room.id });
			refresh();
			navigate('/my-bookings');
		} catch (err) {
			console.error(err);
		}
	};

	const handleEditClick = () => setIsEditing(true);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setEditedRoom((prev) => ({ ...prev, [name]: value }));
	};

	const handleSave = async () => {
		try {
			await updateRoom(id, editedRoom);
			refresh();
			setIsEditing(false);
		} catch {
			alert('Ошибка при сохранении');
		}
	};

	const handleDeleteClick = () => setIsModalOpen(true);

	const handleConfirmDelete = async () => {
		setIsModalOpen(false);
		try {
			await deleteRoomById(id);
			navigate('/admin');
		} catch {
			alert('Ошибка при удалении комнаты');
		}
	};

	const handleCancelDelete = () => setIsModalOpen(false);

	if (loading) return <Loader />;

	if (error || !room) return <ErrorPage />;

	return (
		<>
			<RoomDetailsCard
				room={isEditing ? editedRoom : room}
				isBooked={isBooked}
				onBook={handleBooking}
				onEdit={isEditing ? handleSave : handleEditClick}
				onDelete={handleDeleteClick}
				isEditing={isEditing}
				onChange={handleChange}
			/>
			<ConfirmModal
				isOpen={isModalOpen}
				title="Подтверждение удаления"
				message="Вы точно хотите удалить эту комнату?"
				onConfirm={handleConfirmDelete}
				onCancel={handleCancelDelete}
			/>
		</>
	);
};
