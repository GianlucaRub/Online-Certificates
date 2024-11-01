function sumGroceries(grocery_1, grocery_2, resultID) {
  document.getElementById(resultID).innerText = `Total grocery cost is: ${
    grocery_1 + grocery_2
  }`;
}
