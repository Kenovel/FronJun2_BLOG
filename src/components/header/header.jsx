import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const Description = styled.div`
    font-style: italic;
`;

const HeaderContainer = ({ className }) => (
    <header className={className}>
        <Logo />
        <Description>
            Веб-технологии <br />
            Написание кода <br />
            Разбор ошибок <br />
        </Description>
        <ControlPanel />
    </header>
);

export const Header = styled(HeaderContainer)`
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    width: 1000px;
    height: 120px;
    padding: 20px 40px;
    box-shadow: 0 -2px 15px #412b45;
    background-color: #f1e1f3;
    z-index: 10;
`;
