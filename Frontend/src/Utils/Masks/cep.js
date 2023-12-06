export default function cepMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{5})(\d)/, "$1-$2") //Coloca ponto entre o terceiro e o quarto dígitos
    .replace(/(-\d{3})\d+?$/, "$1"); // captura 2 numeros seguidos de uma barra e não deixa ser digitado mais nada
}
