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

    const onLogout = () => {
        dispatch(logout(session));
        sessionStorage.removeItem('userData');
    };

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
                        <Icon
                            id="fa-sign-out"
                            size="24px"
                            margin="auto 0 auto 10px"
                            onClick={onLogout}
                        />
                    </>
                )}
            </RightAligned>
            <RightAligned>
                <Icon
                    id="fa-backward"
                    size="24px"
                    margin="10px 0 0 0"
                    onClick={() => navigate(-1)}
                />
                <Link to="/post">
                    <Icon  id="fa-file-text-o" size="24px" margin="10px 0 0 16px" />
                </Link>
                <Link to="/users">
                    <Icon  id="fa-users" size="24px" margin="10px 0 0 16px" />
                </Link>
            </RightAligned>
        </div>
    );
};

export const ControlPanel = styled(ContolPanelContainer)``;
