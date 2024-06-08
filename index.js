const rows = 3;
const cols = 3;

var c = 0;
var c_td = 0;
var m_p = true;

var x_count = 0;
var o_count = 0;

var x_press = [];
var o_press = [];

var sc_1 = 0;
var sc_2 = 0;

(() => {
    console.log('loaded')
})();

function spawn() {
    console.log('clicked');
    c += 1;
    const table = document.getElementById('board');

    if (c === 1) {
        table.innerHTML = ''; // Corrected typo
        for (let i = 0; i < rows; i++) {
            const row = table.insertRow();
            for (let j = 0; j < cols; j++) {
                row.insertCell();
            }
        }
    }

    let cPicker = document.getElementsByTagName("td");
    console.log(cPicker);
    for (let i = 0; i < cPicker.length; i++) {
        cPicker[i].id = i + 1;
        cPicker[i].addEventListener('click', function (event) {
            event.preventDefault();
            console.log('cell click');
            if (event.target.innerText === "") { // Only allow click on empty cells
                if (c_td != 1) {
                    event.target.innerText = "X";
                    c_td += 1;
                    x_count += 1;
                    x_press.push(event.target.id);

                    if (x_count == 4) {
                        document.getElementById(x_press[0]).innerText = "";
                        x_press.shift();
                        x_count -= 1;
                    }

                } else {
                    event.target.innerText = "O";
                    c_td -= 1;
                    o_count += 1;
                    o_press.push(event.target.id);

                    if (o_count == 4) {
                        document.getElementById(o_press[0]).innerText = "";
                        o_press.shift();
                        o_count -= 1;
                    }
                }
            }

            checkWinCondition();
        });
    }
}

function checkWinCondition() {
    const table = document.getElementById('board');
    const values = [];

    const player1_score = document.getElementById("pl1");
    const player2_score = document.getElementById("pl2");

    for (let i = 0; i < rows; i++) {
        values[i] = [];
        for (let j = 0; j < cols; j++) {
            values[i][j] = table.rows[i].cells[j].innerText;
        }
    }

    // Function to check if all elements in an array are equal and not empty
    const allEqual = arr => arr.every(val => val === arr[0] && val !== '');

    // Check rows
    for (let i = 0; i < rows; i++) {
        if (allEqual(values[i])) {
            console.log(`Row ${i + 1} has all the same innerText: ${values[i][0]}`);
            if (values[i][0] === "X") {
                sc_1 += 1;
                player1_score.innerHTML = sc_1;
            } else {
                sc_2 += 1;
                player2_score.innerHTML = sc_2;
            }
            resetBoard();
        }
    }

    // Check columns
    for (let j = 0; j < cols; j++) {
        const column = [values[0][j], values[1][j], values[2][j]];
        if (allEqual(column)) {
            console.log(`Column ${j + 1} has all the same innerText: ${values[0][j]}`);
            if (values[0][j] === "X") {
                sc_1 += 1;
                player1_score.innerHTML = sc_1;
            } else {
                sc_2 += 1;
                player2_score.innerHTML = sc_2;
            }
            resetBoard();
        }
    }

    // Check diagonals
    const diagonal1 = [values[0][0], values[1][1], values[2][2]];
    if (allEqual(diagonal1)) {
        console.log(`Diagonal 1 has all the same innerText: ${values[0][0]}`);
        if (values[0][0] === "X") {
            sc_1 += 1;
            player1_score.innerHTML = sc_1;
        } else {
            sc_2 += 1;
            player2_score.innerHTML = sc_2;
        }
        resetBoard();
    }

    const diagonal2 = [values[0][2], values[1][1], values[2][0]];
    if (allEqual(diagonal2)) {
        console.log(`Diagonal 2 has all the same innerText: ${values[0][2]}`);
        if (values[0][2] === "X") {
            sc_1 += 1;
            player1_score.innerHTML = sc_1;
        } else {
            sc_2 += 1;
            player2_score.innerHTML = sc_2;
        }
        resetBoard();
    }
}

function resetBoard() {
    showPopup()
    const table = document.getElementById('board');
    let cPicker = document.getElementsByTagName("td");
    for (let i = 0; i < cPicker.length; i++) {
        cPicker[i].innerText = "";
    }
    x_count = 0;
    o_count = 0;
    x_press = [];
    o_press = [];
    c_td = 0;
}

function showPopup() {
    const table = document.getElementById('board');
    const newWindow = window.open("", "popup", "width=400,height=400");
    newWindow.document.write(`
        <html>
        <head>
            <title>Winning Board</title>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                    margin: 0;
                }
                h3 {
                    margin: 0.5em 0;
                }
                table {
                    border-collapse: collapse;
                    margin: 20px 0;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                td {
                    width: 60px;
                    height: 60px;
                    text-align: center;
                    border: 1px solid #ddd;
                    font-size: 24px;
                    cursor: pointer;
                    transition: background-color 0.3s ease;
                }
                td:hover {
                    background-color: #f0f0f0;
                }
            </style>
        </head>
        <body>
            <h3>Winning Board:</h3>
            <table>
                ${table.innerHTML}
            </table>
        </body>
        </html>
    `);
    newWindow.document.close();
}