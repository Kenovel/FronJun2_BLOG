import * as yup from 'yup';
import { AuthFormError, Button, H2, Input } from '../../components';
import { Link, Navigate } from 'react-router-dom';
import { server } from '../../bff';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';

const authFormSchema = yup.object().shape({
    login: yup
        .string()
        .required('Заполните логин')
        .matches(/\w+$/, 'Логин содержит недопустимые символы. Допускаются только буквы и цифры')
        .min(3, 'Логин должен содержать минимум 3 символа')
        .max(15, 'Размер логина не должен превышать 15 символов'),
    password: yup
        .string()
        .required('Заполните пароль')
        .matches(
            /^[\w#%]+$/,
            'Пароль содержит недопустимые символы. Допускаются буквы, цифры, знаки # и %',
        )
        .min(6, 'Пароль должен содержать минимум 6 символов')
        .max(30, 'Пароль не должен превышать 30 символов'),
});

const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: underline;
    margin: 20px 0;
    font-size: 18px;
`;

const AuthorizationContainer = ({ className }) => {
    const dispatch = useDispatch();

    const roleId = useSelector(selectUserRole);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            login: '',
            password: '',
        },
        resolver: yupResolver(authFormSchema),
    });

    useResetForm(reset);

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        server.authorize(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            dispatch(setUser(res));
            sessionStorage.setItem('userData', JSON.stringify(res));
        });
    };

    const formError = errors?.login?.message || errors?.password?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Авторизация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    autoComplete="username"
                    {...register('login', { onChange: () => setServerError(null) })}
                />
                <Input
                    type="password"
                    placeholder="Пароль..."
                    autoComplete="current-password"
                    {...register('password')}
                />
                <Button type="submit" disabled={!!formError}>
                    Авторизоваться
                </Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
                <StyledLink to="/register">Регистрация</StyledLink>
            </form>
        </div>
    );
};

export const Authorization = styled(AuthorizationContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
