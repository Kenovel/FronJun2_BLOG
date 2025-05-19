import { Link, useNavigate } from 'react-router-dom';
import { Button, Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserLogin, selectUserRole, selectUserSesson } from '../../../../selectors';
import { logout } from '../../../../actions';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const RightAligned = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const StyledIcon = styled.div`
    &:hover {
        cursor: pointer;
    }
`;

const UserName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

const ContolPanelContainer = ({ className }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const login = useSelector(selectUserLogin);
    const roleId = useSelector(selectUserRole);
    const session = useSelector(selectUserSesson);

    return (
        <div className={className}>
            <RightAligned>
                {roleId === ROLE.GUEST ? ( //Вход не выполнен
                    <Button borderRadius="7px" boxShadow="0 0 5px">
                        <Link to="/login">Войти</Link>
                    </Button>
                ) : (
                    //Вход выполнен
                    <>
                        <UserName>{login}</UserName>
                        <StyledIcon>
                            <Icon
                                id="fa-sign-out"
                                size="24px"
                                margin="auto 0 auto 10px"
                                onClick={() => dispatch(logout(session))}
                            />
                        </StyledIcon>
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <StyledIcon onClick={() => navigate(-1)}>
                    <Icon id="fa-backward" size="24px" margin="10px 0 0 0" />
                </StyledIcon>
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
