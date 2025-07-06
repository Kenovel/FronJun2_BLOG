import styled from 'styled-components';
import { Icon } from '../../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';
import { useServerRequest } from '../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { checkAccess } from '../../../../utils';
import { ROLE } from '../../../../constants';
import { selectUserRole } from '../../../../selectors';
import PropTypes from 'prop-types';

const SpecialPantelContainer = ({ className, id, publishedAt, editButton }) => {
    const dispatch = useDispatch();
    const requestServer = useServerRequest();
    const navigate = useNavigate();
    const userRole = useSelector(selectUserRole);

    const onPostRemove = (id) => {
        dispatch(
            openModal({
                text: 'Удалить статью',
                onConfirm: () => {
                    dispatch(removePostAsync(requestServer, id)).then(() => {
                        navigate('/');
                    });
                    dispatch(CLOSE_MODAL);
                },
                onCancel: () => dispatch(CLOSE_MODAL),
            }),
        );
    };

    const isAdmin = checkAccess([ROLE.ADMIN], userRole);

    return (
        <div className={className}>
            <div className="published-at">
                {publishedAt && (
                    <Icon inactive={true} id="fa-calendar-o" size="18px" margin="0 7px 0 0" />
                )}
                {publishedAt}
            </div>
            {isAdmin && (
                <div className="buttons">
                    {editButton}
                    {publishedAt && (
                        <Icon
                            id="fa-trash-o"
                            size="21px"
                            margin="0 0 0 7px"
                            onClick={() => onPostRemove(id)}
                        ></Icon>
                    )}
                </div>
            )}
        </div>
    );
};

export const SpecialPanel = styled(SpecialPantelContainer)`
    display: flex;
    justify-content: space-between;
    margin: ${(margin) => margin};

    & .published-at {
        display: flex;
        font-size: 18px;
    }

    & i {
        position: relative;
        top: -1px;
    }

    & .buttons {
        display: flex;
    }
`;

SpecialPanel.propTypes = {
    id: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
    editButton: PropTypes.node.isRequired,
};
