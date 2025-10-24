import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectUserRole, selectUserLogin } from '../../selectors';
import { logout as logoutAction } from '../../actions';
import { ROLE } from '../../constants';
import { Button } from '../Button/Button';
import { logout as apiLogout } from '../../api';

export const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const roleId = useSelector(selectUserRole);
	const login = useSelector(selectUserLogin);

	const handleLogout = async () => {
		try {
			await apiLogout();
			dispatch(logoutAction());
			sessionStorage.removeItem('userData');
			navigate('/');
		} catch (err) {
			console.error('Ошибка при выходе:', err);
			alert('Не удалось выйти. Попробуйте ещё раз.');
		}
	};

	const handleLogoClick = () => {
		if (roleId === ROLE.ADMIN) navigate('/admin');
		else navigate('/');
	};

	return (
		<header className="bg-orange-100 shadow-md border-b border-orange-200">
			<div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
				<div
					onClick={handleLogoClick}
					className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition cursor-pointer"
				>
					Hotel Booking
				</div>

				<nav className="flex gap-3 items-center">
					{/* Гость */}
					{roleId === ROLE.GUEST && (
						<>
							<Button
								variant="orange"
								className="!w-auto !px-5 !py-2 !text-base whitespace-nowrap"
								onClick={() => navigate('/login')}
							>
								Вход
							</Button>
							<Button
								variant="orange"
								className="!w-auto !px-5 !py-2 !text-base whitespace-nowrap"
								onClick={() => navigate('/register')}
							>
								Регистрация
							</Button>
						</>
					)}

					{/* Пользователь или админ */}
					{roleId === ROLE.USER || roleId === ROLE.ADMIN ? (
						<>
							{roleId === ROLE.USER && (
								<>
									<Button
										variant="orange"
										className="!w-auto !px-5 !py-2 !text-base whitespace-nowrap"
										onClick={() => navigate('/')}
									>
										Главная
									</Button>
									<Button
										variant="orange"
										className="!w-auto !px-5 !py-2 !text-base whitespace-nowrap"
										onClick={() => navigate('/my-bookings')}
									>
										Мои брони
									</Button>
								</>
							)}
							{roleId === ROLE.ADMIN && (
								<Button
									variant="orange"
									className="!w-auto !px-5 !py-2 !text-base whitespace-nowrap"
									onClick={() => navigate('/admin')}
								>
									Админ-панель
								</Button>
							)}

							<span className="font-medium text-gray-800 px-2 text-base">
								{login}
							</span>

							<Button
								variant="red"
								className="!w-auto !px-5 !py-2 !text-base whitespace-nowrap"
								onClick={handleLogout}
							>
								Выйти
							</Button>
						</>
					) : null}
				</nav>
			</div>
		</header>
	);
};
