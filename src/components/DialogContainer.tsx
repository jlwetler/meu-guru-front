import styled from 'styled-components';

export default styled.div `
        font-family: "Hero New",sans-serif;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        input {
            padding: 10px;
            width: 303px;
            height: 20px;
            border: 1px solid #000000;
            border-radius: 20px;
            margin-bottom: 10px;
        }
        input::placeholder {
            font-size: 18px;
        }
        img {
            width: 205px;
            height: 183pxpx;
            margin-bottom: 20px;
        }
        h1 {
            font-size: 25px;
        }
        button {
            font-size: 17px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #A328D6;
            border-radius: 20px;
            color: #ffffff;
            width: 303px;
            height: 45px;
            margin-bottom: 15px;
            border: none;
            disabled {
                opacity: 0.1;
            }           
        }
        button:hover {
            cursor: pointer;
            background: purple;
        }
    `;