import { Footer, Header } from './components';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

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
    padding: 120px 0;
`;

const H2 = styled.h2`
    text-aligin: center;
`;

export const Blog = () => {
    return (
        <AppColumn>
            <Header />
            <Content>
                <H2>Контент страницы</H2>
                <Routes>
                    <Route path="/" element={<div>Главная</div>} />
                    <Route path="/login" element={<div>Авторизация</div>} />
                    <Route path="/register" element={<div>Регистрация</div>} />
                    <Route path="/users" element={<div>Пользователи</div>} />
                    <Route path="/post" element={<div>Новая статья</div>} />
                    <Route path="/posts/:postId" element={<div>Статья</div>} />
                    <Route path="*" element={<div>Ошибки</div>} />
                </Routes>
            </Content>
            <Footer />
        </AppColumn>
    );
};

export default Blog;
