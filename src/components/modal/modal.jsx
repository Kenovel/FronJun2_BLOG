import styled from 'styled-components';
import { Button } from '../button/button';
import {
    selectModalIsOpen,
    selectModalOnCancel,
    selectModalOnConfirm,
    selectModalText,
} from '../../selectors';
import { useSelector } from 'react-redux';

const ModalContainer = ({ className }) => {
    const text = useSelector(selectModalText);
    const isOpen = useSelector(selectModalIsOpen);
    const onCancel = useSelector(selectModalOnCancel);
    const onConfirm = useSelector(selectModalOnConfirm);

    if (!isOpen) {
        return null;
    }

    return (
        <div className={className}>
            <div className="overlay"></div>
            <div className="box">
                <h3>{text}</h3>
                <div className="buttons">
                    <Button width="120px" onClick={onConfirm}>
                        Да
                    </Button>
                    <Button width="120px" onClick={onCancel}>
                        Отмена
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Modal = styled(ModalContainer)`
    position: fixed;
    z-index: 20;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    & .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }

    & .box {
        position: relative;
        top: 50%;
        transform: translate(0, -50%);
        width: 400px;
        margin: 0 auto;
        padding: 0 20px 20px;
        text-align: center;
        background-color: #fff;
        border: 3px solid #000;
        z-index: 30;
    }

    & .buttons {
        display: flex;
        justify-content: center;
    }

    & .buttons button {
        margin: 0 5px;
    }
`;
