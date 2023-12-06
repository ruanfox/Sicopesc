export default function tituloMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{4})(\d)/, "$1.$2") //Coloca ponto entre o terceiro e o quarto dígitos
    .replace(/^(\d{4})\.(\d{4})(\d)/, "$1.$2.$3"); //Coloca ponto entre o quinto e o sexto dígitos
}
