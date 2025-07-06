import { Footer, Header, Modal } from './components';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { Authorization, Post, Registration, Users } from './pages';
import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './actions';

const AppColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 1000px;
    min-height: 100%;
    background-color: #fff;
    margin: 0 auto;
`;

const Content = styled.div`
    padding: 120px 0 20px;
`;

export const Blog = () => {
    const dispatch = useDispatch();
    useLayoutEffect(() => {
        const currentUserDataJSON = sessionStorage.getItem('userData');

        if (!currentUserDataJSON) return;

        const currentUserData = JSON.parse(currentUserDataJSON);

        dispatch(setUser({ ...currentUserData, roleId: Number(currentUserData.roleId) }));
    }, [dispatch]);

    return (
        <AppColumn>
            <Header />
            <Content>
                <Routes>
                    <Route path="/" element={<div>Главная</div>} />
                    <Route path="/login" element={<Authorization />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/post" element={<div>Новая статья</div>} />
                    <Route path="/posts/:id" element={<Post />} />
                    <Route path="/posts/:id/edit" element={<Post />} />
                    <Route path="*" element={<div>Ошибки</div>} />
                </Routes>
            </Content>
            <Footer />
            <Modal />
        </AppColumn>
    );
};

export default Blog;
