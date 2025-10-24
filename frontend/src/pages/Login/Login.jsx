import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { Navigate, Link } from 'react-router-dom';

import { authorize } from '../../api';
import { login as loginAction } from '../../actions';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { Input, Button, FormContainer, Loader, ErrorMessage } from '../../components';

const authFormSchema = yup.object().shape({
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
});

export const Login = () => {
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);
	const [serverError, setServerError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { login: '', password: '' },
		resolver: yupResolver(authFormSchema),
	});

	const onSubmit = async ({ login, password }) => {
		setServerError(null);
		setIsLoading(true);
		const { error, res } = await authorize(login, password);
		setIsLoading(false);

		if (error) {
			setServerError(error);
			return;
		}
		dispatch(loginAction(res));
		sessionStorage.setItem('userData', JSON.stringify(res));
	};

	if (isLoading) return <Loader message="Вход в аккаунт..." />;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	const errorMessage = errors.login?.message || errors.password?.message || serverError;

	return (
		<FormContainer title="Вход">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<Input placeholder="Логин" registerProps={register('login')} />
				<Input
					type="password"
					placeholder="Пароль"
					registerProps={register('password')}
				/>
				<Button type="submit" variant="orange">
					Войти
				</Button>
				<ErrorMessage message={errorMessage} />
				<div className="text-center">
					<Link
						to="/register"
						className="text-gray-700 hover:underline text-sm"
					>
						Зарегистрироваться
					</Link>
				</div>
			</form>
		</FormContainer>
	);
};
