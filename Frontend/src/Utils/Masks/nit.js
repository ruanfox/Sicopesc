export default function nitMask(value) {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{3})(\d)/, "$1.$2") //Coloca ponto entre o terceiro e o quarto dígitos
    .replace(/^(\d{3})\.(\d{5})(\d)/, "$1.$2.$3") //Coloca ponto entre o quinto e o sexto dígitos
    .replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, "$1.$2.$3-$4")
    .replace(/(-\d{1})\d+?$/, "$1");
}
