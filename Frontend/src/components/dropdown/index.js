import React, { useEffect } from 'react';

import {Container} from './styles';

export default function dropdown(props) {
    function showDropdown(){
        let el = document.querySelector('.dropdown');
        el.style.display = "flex";
        setTimeout(()=>{
            el.style.width = "200px";
            el.style.height= "auto";
        }, 100)
    }
  return (
    <Container className="dropdown" style={{left: props.left+"px", top: props.top+"px", display: props.show?showDropdown():"none"}}>
        {props.show?showDropdown():""}
        <li><a href="#!">one</a></li>
        <li><a href="#!">two</a></li>
        <li className="divider"></li>
        <li><a href="#!">three</a></li>
    </Container>
  );
}
