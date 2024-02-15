function generateMatrices() {
    createMatrix('The 1st Matrix', 'matrix1', document.getElementById('matrix1Rows').value, document.getElementById('matrix1Cols').value);
    createMatrix('The 2nd Matrix','matrix2', document.getElementById('matrix2Rows').value, document.getElementById('matrix2Cols').value);
};

const createMatrix = (title, containerId, rows, cols) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            input.value = Math.floor(Math.random() * 100); // Random value between 0 and 99
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult = (title, containerId, rows, cols, dataArray) => {
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let span = document.createElement('span');
            // Calculate the index in the dataArray based on current row and column
            let index = i * cols + j;
            if (index < dataArray.length) {
                span.innerHTML = dataArray[index];
            }
            td.appendChild(span);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
};

const showResult2D = (title, containerId, dataArray) => {
	// dataArray is a 2D array
	// complete this function based on the showResult function
    let container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous content
    let table = document.createElement('table');
    let rows = dataArray.length;
    let cols = dataArray[0].length;
    for (let i = 0; i < rows; i++) {
        let tr = document.createElement('tr');
        for (let j = 0; j < cols; j++) {
            let td = document.createElement('td');
            let input = document.createElement('input');
            input.type = 'number';
            // Calculate the index in the dataArray based on current row and column
            input.value = dataArray[i][j];    
            td.appendChild(input);
            tr.appendChild(td);
        }
        table.appendChild(tr);
    };
    let caption = table.createCaption();
    caption.textContent = title;
    container.appendChild(table);
}

function performOperation(operation) {
    let matrix1 = getMatrixData2D('matrix1');
    let matrix2 = getMatrixData2D('matrix2');
    console.log("1st Matrix",matrix1);
    console.log("2nd Matrix", matrix2);
    console.log("Operation", operation);
    // Just a test result
    let result = [];
    // Call your matrix calculation functions here
    if(operation == 'add') {result = addMatrices(matrix1, matrix2)}
    if(operation == 'subtract') {result = subtractMatrices(matrix1, matrix2)}
    if(operation == 'multiply') {result = multiplyMatrices(matrix1, matrix2)}
    // For example: if (operation === 'add') { addMatrices(matrix1, matrix2); }
	// prints suitable messages for impossible situation
    if (result.length == 0) {console.log('Could not print array')}
    else{showResult2D('The Result', 'matrix3', result);} // use suitable function for printing results
};

const getMatrixData1D = function (matrixId) {
    let matrixData = [];
    let inputs = document.querySelectorAll(`#${matrixId} input`);
    inputs.forEach(input => {
        matrixData.push(parseInt(input.value, 10));
    });
    return matrixData;
};

const getMatrixData2D = function (matrixId) {
    let matrixData = [];
    let rows = parseInt(document.getElementById(matrixId + 'Rows').value, 10);
    let cols = parseInt(document.getElementById(matrixId + 'Cols').value, 10);
    let inputs = document.querySelectorAll(`#${matrixId} input`);

    for (let i = 0; i < rows; i++) {
        let rowData = [];
        for (let j = 0; j < cols; j++) {
            // Calculate index in the flat list of inputs
            let index = i * cols + j;
            if (index < inputs.length) {
                rowData.push(parseInt(inputs[index].value, 10));
            } else {
                rowData.push(0); // Default value if input is missing
            }
        }
        matrixData.push(rowData);
    }
    return matrixData;
};


// Add your matrix calculation functions here
// The functions must check the posibility of calculation too.
function addMatrices(matrix1, matrix2){ 
	// provide the code
    let resultMatrix = [];
    // retrieve the row counts of each matrix
    let rows1 = matrix1.length;
    let rows2 = matrix2.length;
    // retrieve the column counts of each matrix
    let cols1 = matrix1[0].length;
    let cols2 = matrix2[0].length;
    // for addition, matrices must be the same size
    if (rows1 != rows2 || cols1 != cols2){
        console.log("The matrices must be of the same dimensions");
    }
    else{
        for(let i = 0; i < rows1; i++){
            let row = [];
            for(let j = 0; j < cols1; j++){
                row.push(matrix1[i][j] + matrix2[i][j]);
            }
            resultMatrix.push(row);
        }
    }
    return resultMatrix;
};
const subtractMatrices = function (matrix1, matrix2) { 
	// provide the code
    let resultMatrix = [];
    // retrieve the row counts of each matrix
    let rows1 = matrix1.length;
    let rows2 = matrix2.length;
    // retrieve the column counts of each matrix
    let cols1 = matrix1[0].length;
    let cols2 = matrix2[0].length;
    // for addition, matrices must be the same size
    if (rows1 != rows2 || cols1 != cols2){
        console.log("The matrices must be of the same dimensions");
    }
    else{
        for(let i = 0; i < rows1; i++){
            let row = [];
            for(let j = 0; j < cols1; j++){
                row.push(matrix1[i][j] - matrix2[i][j]);
            }
            resultMatrix.push(row);
        }
    }
    return resultMatrix;
};
const multiplyMatrices = (matrix1, matrix2) => { 
	// provide the code
    
    // retrieve the row counts of each matrix
    let rows1 = matrix1.length;
    let rows2 = matrix2.length;
    // retrieve the column counts of each matrix
    let cols1 = matrix1[0].length;
    let cols2 = matrix2[0].length;

    let resultMatrix = [rows1];

    if (rows2 == cols1){
        for(let i = 0; i < rows1; i++){
            resultMatrix[i] = [cols2]
            for(let j = 0; j < cols2; j++){
                resultMatrix[i][j] = 0;
                for(let k = 0; k < cols1; k++){
                    resultMatrix[i][j] += matrix1[i][k] * matrix2[k][j];
                }
            }
        }
    }
    else{
        console.log("The matrices are invalid dimensions");
    }

    return resultMatrix;

}