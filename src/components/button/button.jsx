import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, borderRadius, boxShadow, ...props }) => {
    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};

export const Button = styled(ButtonContainer)`
    border-radius: ${({ borderRadius = '0' }) => borderRadius};
    box-shadow: ${({ boxShadow = 'none' }) => boxShadow};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    width: ${({ width = '100%' }) => width};
    height: 32px;
    border: 1px solid #000;
    background-color: #ddd;

    &:hover {
        cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    }
`;

Button.propTypes = {
    children: PropTypes.node.isRequired,
    width: PropTypes.string,
    borderRadius: PropTypes.string,
    boxShadow: PropTypes.string,
};
