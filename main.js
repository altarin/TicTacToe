var winLines = {
    line_v2: [5, 2, 8],
    line_g2: [5, 4, 6],
    line_dl: [5, 1, 9],
    line_dr: [5, 3, 7],
    line_g1: [1, 2, 3],
    line_g3: [7, 8, 9],
    line_v1: [1, 4, 7],
    line_v3: [3, 6, 9]
};

var gameOver = false;

function isValidStep(cellContent) {
    if (cellContent.classList.contains("cross") || cellContent.classList.contains("zero")) {
        alert('Поле занято');
        return false;
    }
    if (gameOver) {
        alert('Игра закончена');
        return false;
    }
    return true;
}

function handelStepHuman(cellEmpty) {
    cellEmpty.classList.add("cross");
}

function autoStepComp() {
    for (var lineId in winLines) {
        var zeroCount = 0;
        var crossCount = 0;
        var emptyCount = 0;

        winLines[lineId].forEach(function (cellID) {
            var classes = document.getElementById('s' + cellID).classList;
            if (classes.contains("cross")) {
                crossCount++;
            } else if (classes.contains("zero")) {
                zeroCount++;
            } else {
                emptyCount++;
            }
        });

        if (zeroCount === 2 && emptyCount === 1) {
            console.log(lineId, 'почти победа');
            thirdZero(lineId);
            return;
        }

        if (crossCount === 2 && zeroCount === 0) {
            console.log(lineId, 'защита');
            protection(lineId);
            return;
        }
    }

    console.log('нападение');
    attack();
}

function protection(lineId) {
    winLines[lineId].forEach(function (cellID) {
        var cell = document.getElementById('s' + cellID);
        var classes = cell.classList;
        if (!classes.contains("cross") && !classes.contains("zero")) {
            cell.classList.add('zero');
        }
    });
}


function thirdZero(lineId) {
    winLines[lineId].every(function (cellID) {
        var cell = document.getElementById('s' + cellID);
        var classes = cell.classList;
        if (!classes.contains("cross") && !classes.contains("zero")) {
            cell.classList.add('zero');
            return false;
        } else {
            return true;
        }
    });
}

function secondZero(lineId) {
    winLines[lineId].every(function (cellID) {
        var cell = document.getElementById('s' + cellID);
        var classes = cell.classList;
        console.log('cell - ', cellID);
        if (!classes.contains("cross") && !classes.contains("zero")) {
            console.log('ставим zero');
            cell.classList.add('zero');
            return false;
        } else {
            return true;
        }
    });
}

function firstZero(lineId) {
    winLines[lineId].every(function (cellID) {
        var cell = document.getElementById('s' + cellID);
        var classes = cell.classList;
        if (!classes.contains("cross") && !classes.contains("zero")) {
            cell.classList.add('zero');
            return false;
        } else {
            return true;
        }
    });
}

function attack() {
    var center = document.getElementById('s5');
    var centClass = center.classList;
    if (!centClass.contains("cross") && !centClass.contains("zero")) {
        center.classList.add('zero');
        return;
    }

    for (var lineId in winLines) {
        var zeroCount = 0;
        var crossCount = 0;
        var emptyCount = 0;

        winLines[lineId].forEach(function (cellID) {
            console.log(cellID);
            var classes = document.getElementById('s' + cellID).classList;
            if (classes.contains("cross")) {
                console.log("cross+");
                crossCount++;
            } else if (classes.contains("zero")) {
                zeroCount++;
                console.log("zero+");
            } else {
                emptyCount++;
            }
        });

        if (zeroCount === 1 && emptyCount === 2) {
            console.log(lineId, 'второй нолик в линии');
            secondZero(lineId);
            return;
        }
        if (emptyCount === 3) {
            console.log(lineId, 'первый нолик');
            firstZero(lineId);
            return;
        }
    }
}

function checkLine(stepOwner) {
    for (var lineId in winLines) {
        var zeroCount = 0;
        var crossCount = 0;
        winLines[lineId].forEach(function (cellID) {
            var classes = document.getElementById('s' + cellID).classList;
            if (classes.contains("cross")) {
                crossCount++;
            } else if (classes.contains("zero")) {
                zeroCount++;
            }
            if (crossCount === 3 || zeroCount === 3) {
                document.getElementById(lineId).classList.remove('hidden');
                gameOver = true;
                bootbox.alert(stepOwner + " wins");
            }
        });
    }
}


var fieldCollection = document.getElementsByClassName('square');
for (var i = 0; i < fieldCollection.length; i++) {
    fieldCollection[i].onclick = function () {
        if (!isValidStep(this)) {
            return;
        }

        handelStepHuman(this);

        checkLine("Human");

        if (gameOver === false) {
            autoStepComp();

            checkLine("Computer");
            //сохранить куки, хранящие состояние игры, если игра не завершена, в противном случае очистить
        }
    }
}

document.getElementById('butNewGame').onclick = function () {
    //очистить куки, хранящие состояние игры
    window.location.reload();
};
