import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { register as registerUser } from '../../api';
import { login as loginAction } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { Input, Button, FormContainer, ErrorMessage, Loader } from '../../components';

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required('Заполните логин')
		.matches(/^\w+$/, 'Только буквы и цифры')
		.min(5, 'Минимум 5 символов')
		.max(15, 'Максимум 15 символов'),
	password: yup
		.string()
		.required('Заполните пароль')
		.matches(/^[\w#%]+$/, 'Допускаются буквы, цифры и # %')
		.min(6, 'Минимум 6 символов')
		.max(30, 'Максимум 30 символов'),
	passcheck: yup
		.string()
		.required('Повторите пароль')
		.oneOf([yup.ref('password')], 'Пароли не совпадают'),
});

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: { login: '', password: '', passcheck: '' },
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const navigate = useNavigate();

	const onSubmit = async ({ login, password }) => {
		setServerError(null);
		setIsLoading(true);
		const { error, res } = await registerUser(login, password);
		setIsLoading(false);

		if (error) {
			setServerError(error);
			return;
		}

		dispatch(loginAction(res));
		sessionStorage.setItem('userData', JSON.stringify(res));
		reset();
		navigate('/');
	};

	if (isLoading) return <Loader message="Регистрация..." />;

	if (roleId !== ROLE.GUEST) return <Navigate to="/" replace />;

	const errorMessage =
		errors.login?.message ||
		errors.password?.message ||
		errors.passcheck?.message ||
		serverError;

	return (
		<FormContainer title="Регистрация">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input
					placeholder="Логин"
					registerProps={register('login', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль"
					registerProps={register('password', {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Повторите пароль"
					registerProps={register('passcheck', {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" variant="orange" disabled={!!errorMessage}>
					Зарегистрироваться
				</Button>
				<ErrorMessage message={errorMessage} />
				<div className="text-center">
					<Link to="/login" className="text-gray-700 hover:underline text-sm">
						Уже есть аккаунт? Войти
					</Link>
				</div>
			</form>
		</FormContainer>
	);
};
