// const math = require("mathjs");
/* Inits */
let matrix1 = [
  [0, 0],
  [0, 0],
];

let matrix2 = [
  [0, 0],
  [0, 0],
];

let hasMatrix2 = false;

/* DOM references */
const matrix1Body = document.getElementById("matrix1Body");
const matrix2Body = document.getElementById("matrix2Body");
const addRowToM1 = document.getElementById("addRowToM1");
const addColToM1 = document.getElementById("addColToM1");
const addRowToM2 = document.getElementById("addRowToM2");
const addColToM2 = document.getElementById("addColToM2");
const addMatrices = document.getElementById("add");
const subtractMatrices = document.getElementById("subtract");
const multiplyMatrices = document.getElementById("multiply");
const transposeMatrices = document.getElementById("transpose");
const resultLabel = document.getElementById("result");
const errorLabel = document.getElementById("error");

/* Default Styles */
const toggleStyles = () => {
  addMatrices.disabled = !hasMatrix2;
  subtractMatrices.disabled = !hasMatrix2;
  multiplyMatrices.disabled = !hasMatrix2;
  transposeMatrices.disabled = hasMatrix2;
};

/**
 * addRow
 * @param {reference of matrix} matrix
 * @param {string} name
 */
const addRow = (matrix, name) => {
  matrix.push(matrix[0]);
  populateMatrix(matrix, name);
};

/**
 * addColumn
 * @param {reference of matrix} matrix
 * @param {string} name
 */
const addColumn = (matrix, name) => {
  let updatedMatrix = [];
  updatedMatrix = matrix.map((ind) => {
    let newInd = ind.concat([0]);
    return newInd;
  });
  name === "matrix1" ? (matrix1 = updatedMatrix) : (matrix2 = updatedMatrix);
  populateMatrix(updatedMatrix, name);
};

/**
 * populateMatrix
 * @param {reference of matrix} matrix
 * @param {string} name
 */
const populateMatrix = (matrix, name) => {
  let matrixHtml = "";
  matrix.map((element, index) => {
    element.map((subElement, subIndex) => {
      matrixHtml += `<input type="number" class="inputField" placeholder="${
        Number(index + 1) + " , " + Number(subIndex + 1)
      }" id="${String(index + 1) + String(subIndex + 1) + name}"/>`;
    });
    matrixHtml += "<br/>";
  });
  name === "matrix1"
    ? (matrix1Body.innerHTML = matrixHtml)
    : (matrix2Body.innerHTML = matrixHtml);

  matrix.map((element, index) => {
    element.map((subElement, subIndex) => {
      document
        .getElementById(`${String(index + 1) + String(subIndex + 1) + name}`)
        .addEventListener("change", (e) => {
          handleMatrix(matrix, index, subIndex, e.target.value);
        });
    });
  });
};

const showMatrix2 = () => {
  document.getElementById("addMatrixButton").style.display = "none";
  document.getElementById("matrix2").style.visibility = "visible";
  populateMatrix(matrix2, "matrix2");
  hasMatrix2 = true;
  toggleStyles();
};

/**
 * handleMatrix
 * @param {reference of matrix to be handled} matrix
 * @param {number} x
 * @param {number} y
 * @param {number} value
 */
const handleMatrix = (matrix, x, y, value) => {
  matrix[x][y] = Number(value);
};

/* ==============Matrix Operations=============== */
/**
 * matrixOperations
 * @param {oneOf([+,-,*,/,T])} operator
 */
const matrixOperations = (operator) => {
  const matrixA = math.matrix(matrix1);
  const matrixB = math.matrix(matrix2);
  let result = 0;
  try {
    switch (operator) {
      case "+":
        result = math.add(matrixA, matrixB);
        break;
      case "-":
        result = math.subtract(matrixA, matrixB);
        break;
      case "*":
        result = math.multiply(matrixA, matrixB);
        break;
      case "T":
        result = math.transpose(matrix1);
        break;
    }
    resultLabel.innerText = "";
    let resultText = "";
    result._data
      ? result._data.map((x) => {
          resultText += `${x}\n`;
        })
      : result.map((x) => {
          resultText += `${x}\n`;
        });
    resultLabel.innerText = resultText;
  } catch (err) {
    resultLabel.innerText = "";
    errorLabel.innerText = err;
  } finally {
    console.log("result :>> ", result._data);
  }
};

/* Event listeners */
addRowToM1.addEventListener("click", () => addRow(matrix1, "matrix1"));
addColToM1.addEventListener("click", () => addColumn(matrix1, "matrix1"));
addRowToM2.addEventListener("click", () => addRow(matrix2, "matrix2"));
addColToM2.addEventListener("click", () => addColumn(matrix2, "matrix2"));
addMatrices.addEventListener("click", () => matrixOperations("+"));
subtractMatrices.addEventListener("click", () => matrixOperations("-"));
multiplyMatrices.addEventListener("click", () => matrixOperations("*"));
transposeMatrices.addEventListener("click", () => matrixOperations("T"));

/* Initial calls */
populateMatrix(matrix1, "matrix1");
toggleStyles();
