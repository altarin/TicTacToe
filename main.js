var winLines = {
    line_g1: [1, 2, 3],
    line_g2: [4, 5, 6],
    line_g3: [7, 8, 9],
    line_v1: [1, 4, 7],
    line_v2: [2, 5, 8],
    line_v3: [3, 6, 9],
    line_dl: [1, 5, 9],
    line_dr: [3, 5, 7]
};

var gameOver = false;

function isValidStep(cellContent) {
    console.log(cellContent.classList);
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
    for (var n = 1; n <= 9; n++) {
        var cell = document.getElementById('s' + n);
        var a = cell.classList;
        if (!a.contains("cross") && !a.contains("zero")) {
            cell.classList.add('zero');
            return;
        }
    }
}

function checkLine(stepOwner) {
    for (var lineId in winLines) {
        console.log('ключ: ' + lineId + ' значение: ' + winLines[lineId]);
        var zeroCount = 0;
        var crossCount = 0;
        winLines[lineId].forEach(function (cellID) {
            console.log(cellID);
            var classes = document.getElementById('s' + cellID).classList;
            if (classes.contains("cross")) {
                console.log("cross+");
                crossCount++;
            } else if (classes.contains("zero")) {
                zeroCount++;
                console.log("zero+");
            }
            console.log(crossCount, zeroCount);
            if (crossCount === 3 || zeroCount === 3) {
                document.getElementById(lineId).classList.remove('hidden');
                gameOver = true;
                setTimeout(
                    function () {
                        alert(stepOwner + " wins")
                    },
                    200
                );
            }
        });
    }
}

var fieldCollection = document.getElementsByClassName('square');
for (var i = 0; i < fieldCollection.length; i++) {
    console.log(fieldCollection[i]);
    fieldCollection[i].onclick = function () {
        console.log(this);
        if (!isValidStep(this)) {
            return;
        }

        handelStepHuman(this);

        checkLine("Human");

        if (gameOver === false) {
            autoStepComp();
            checkLine("Computer");
        }
    }
}