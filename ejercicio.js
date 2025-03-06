function calcularPromedio(arr) {
  let suma = 0;
  for (let i = 0; i < arr.length; i++) {
    suma += arr[i];
  }
  return suma / arr.length;
}

console.log(calcularPromedio([3, 6, 9]));
