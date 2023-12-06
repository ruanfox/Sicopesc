import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body{
  font-family: Ubuntu, sans-serif;
  color: ${(props) => props.theme.colors.text};
  background: ${props => props.theme.colors.background};
  @media print {
    .navbar, #logo-login {
      display: none !important;
    }
  }
}
:root{
    --primary: ${(props) => props.theme.colors.primary};
    --primary-dark: #163d7d;
    --secondary: #5b90eb;
    --secondary-light: #a4bfed;
    --danger: #d32121;
    --success: #27B54B;
    --warning: #f4b400;
    --backcolor: #dde3ed;
    --bs-table-accent-bg: #E9ECEF;
  }
.btn{
  height: 50px;
  border-radius: 10px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-primary{
  background-color: ${(props) => props.theme.colors.primary};
  border-color: ${(props) => props.theme.colors.primary};
  &:hover{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:active{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
  &:disabled{
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
}

.bg-success{
  background-color: ${(props) => props.theme.colors.success}!important;
  border-color: ${(props) => props.theme.colors.success};
}

.form-control{
  border-radius: 10px;
  height: 50px;
  font-size: 18px;
  background-color: ${props => props.theme.colors.background_2};
  color: ${props => props.theme.colors.text};
  border-color: ${props => props.theme.colors.border}
}

.form-control:focus{
  background-color: ${props => props.theme.colors.background_2};
  color: ${props => props.theme.colors.text};
}

.form-control:disabled{
  background-color: ${props => props.theme.colors.background_2};
  color: ${props => props.theme.colors.text};
}

.input-group-text{
  border-radius: 10px 0 0 10px;
  width: 50px;
  display: flex;
  justify-content: center;
  background-color: ${props => props.theme.colors.border};
  border: ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text}
}

.secondary{
  background-color: ${(props) => props.theme.colors.background_2};
}

.alert{
  border-radius: 10px;
}

.gradient-primary{
  background: ${(props) =>
    `linear-gradient(${props.theme.colors.secondary}, ${props.theme.colors.primary})`};
    color: white;

   &:hover{
     color: white;
   }
}

.dropdown-menu{
  border-radius: 10px;
  background-color: ${props => props.theme.colors.background_2};
}

.dropdown-item:hover{
  background-color: ${props => props.theme.colors.primary};
}

.bg-light{
  background-color: ${(props) => props.theme.colors.background};
}

.logo-bottom{
  width: 153px;
  height: 80px;
  bottom: 0;
  left: -25px;
  position: fixed;
}
.modal-content{
  border-radius: 10px;
  background-color: ${props => props.theme.colors.background};
  border-color: ${props => props.theme.colors.border};
}
.modal-header{
  border-color: ${props => props.theme.colors.border};
  .btn-close{
    margin-right: 5px;
  }
}
.modal-footer{
  border-color: ${props => props.theme.colors.border};
}
.table{
  border: 1px solid ${(props) => props.theme.colors.border};
  color: ${(props) => props.theme.colors.text};
  border-radius: 10px;
  border-spacing: 0px; border-collapse: separate;
  z-index: 2;
  thead{
    background-color: ${props => props.theme.colors.background_3};
    border-radius: 10px;
    th{
      text-align: left;
      border-bottom: 1px solid ${(props) => props.theme.colors.border};
    }
    th:first-of-type{
      border-radius: 10px 0 0 0;
      box-shadow: none;
    }
    th:last-of-type{
      border-radius: 0 10px 0 0;
    }
  }
  tr:nth-child(even) {
    background-color: ${props => props.theme.colors.background_3};
  }
  td{
    color: ${(props) => props.theme.colors.text};
  }
}
.table-btn-actions{
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  a, button{
    width: auto;
    min-width: 60px;
  }
}
.table>:not(:last-child)>:last-child>* {
    border-bottom-color: ${(props) => props.theme.colors.border};
}

.card{
  background-color: ${props => props.theme.colors.background_2};
  border-radius: 10px;
}
.card-header{
  //background-color: #F9FAFB;
  h3{
    color: ${(props) => props.theme.colors.text};
    font-size: 1.5em;
  }
}
.tipo-fluxo{
  padding: 5px 20px;
  color: white;
  border-radius: 10px;
}

.form-select{
  border-radius: 10px;
  background-color: ${props => props.theme.colors.background_2};
  color: ${props => props.theme.colors.text};
  border-color: ${props => props.theme.colors.border}
}

  .pagination li.active {
      background-color: var(--primary);
      color: #fff;
      border-radius: 10px;
    }

    .pagination li.active a {
      color: #fff;
    }

  .pagination li a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: ${(props) => props.theme.colors.text};
    text-decoration: none;
  }
  .pagination{
    margin: 0;
    padding: 5px 0;
  }
`;
