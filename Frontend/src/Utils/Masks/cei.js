export default function ceiMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1.$2") //Coloca ponto entre o terceiro e o quarto dígitos
    .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    .replace(/(\d{2})\.(\d{3})\.(\d{5})(\d)/, "$1.$2.$3/$4")
    .replace(/([/]\d{2})\d+?$/, "$1"); // captura 2 numeros seguidos de uma barra e não deixa ser digitado mais nada
}
