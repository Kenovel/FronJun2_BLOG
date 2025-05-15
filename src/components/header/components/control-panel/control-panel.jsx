import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';
const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
`;

const StyledLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: 100px;
    height: 32px;
    border: 1px solid #000;
    border-radius: 7px;
    box-shadow: 0 0 5px;
    background-color: #ddd;
`;

const StyledButton = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const ContolPanelContainer = ({ className }) => {
    const navigate = useNavigate();

    return (
        <div className={className}>
            <RightAligned>
                <StyledLink to="/login">Войти</StyledLink>
            </RightAligned>
            <RightAligned>
                <StyledButton onClick={() => navigate(-1)}>
                    <Icon id="fa-backward" size="24px" margin="10px 0 0 0" />
                </StyledButton>
                <Link to="/post">
                    <Icon id="fa-file-text-o" size="24px" margin="10px 0 0 16px" />
                </Link>
                <Link to="/users">
                    <Icon id="fa-users" size="24px" margin="10px 0 0 16px" />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ContolPanelContainer)``;
