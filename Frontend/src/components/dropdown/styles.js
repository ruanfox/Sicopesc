import styled from 'styled-components';

export const Container = styled.ul`
  list-style: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 0px;
    height: 0px;
    background: white;
    color: black;
    position: absolute;
    transition: all .5s;
    li{
        width: 100%;
    }
    a{
        color: black;
    }
`;
