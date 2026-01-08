import styled from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
    border-style: solid;
    border-width: 2px;
    border-color: #aeaca0; 
    border-radius: 5px;
    font-size: 1rem;
    font-weiget: bold;
    padding: 0.25rem 1rem;
    color: white;
    ouline: none;
    cursor: pointer;
    
    background: ${palette.white};
    &:hover {
        background: ${palette.gray[3]};
    }
    `;

    const Button = props => <StyledButton {...props} />;

    export default Button;