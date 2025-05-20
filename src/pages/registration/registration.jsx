import * as yup from 'yup';
import { AuthFormError, Button, H2, Input } from '../../components';
import { Navigate } from 'react-router-dom';
import { server } from '../../bff/';
import { setUser } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import { selectUserRole } from '../../selectors';
import { ROLE } from '../../constants';
import { useResetForm } from '../../hooks';

const regFormSchema = yup.object().shape({
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
    passcheck: yup
        .string()
        .required('Введите пароль еще раз')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают'),
});

const RegistrationContainer = ({ className }) => {
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
            passcheck: '',
        },
        resolver: yupResolver(regFormSchema),
    });

    useResetForm(reset);

    const [serverError, setServerError] = useState(null);

    const onSubmit = ({ login, password }) => {
        server.register(login, password).then(({ error, res }) => {
            if (error) {
                setServerError(`Ошибка запроса: ${error}`);
                return;
            }
            dispatch(setUser(res));
        });
    };

    const formError =
        errors?.login?.message || errors?.password?.message || errors?.passcheck?.message;
    const errorMessage = formError || serverError;

    if (roleId !== ROLE.GUEST) {
        return <Navigate to="/" />;
    }

    return (
        <div className={className}>
            <H2>Регистрация</H2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    type="text"
                    placeholder="Логин..."
                    {...register('login', { onChange: () => setServerError(null) })}
                />
                <Input type="password" placeholder="Пароль..." {...register('password')} />
                <Input
                    type="password"
                    placeholder="Повторите пароль..."
                    {...register('passcheck')}
                />
                <Button type="submit" disabled={!!formError}>
                    Зарегистрироваться
                </Button>
                {errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
            </form>
        </div>
    );
};

export const Registration = styled(RegistrationContainer)`
    display: flex;
    align-items: center;
    flex-direction: column;

    & > form {
        display: flex;
        flex-direction: column;
        width: 260px;
    }
`;
