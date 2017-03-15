let id1D = [];
let id2D = [];
let image1D = [];
let image2D = [];
let class1D = [];
let class2D = [];
let clicks = [];
let clicksID = [];
let icons = [];
let iconImages = ["music", "envelope", "home", "glass", "film", "camera", "calendar", "plane", 
					"globe", "tree-conifer", "piggy-bank", "scissors"]; // all possible iconImages
let fieldSize = 4;
let numberOfClicks = 0;
let score = 0;
let isMatch = false;

$(document).ready(function () {
    generateIconImages();
    $("#gameScore").html("Score: " + score);

    $("#resetButton").click(function () {
        $("#message").show().text("Game Reset");
        id2D = [];
        class2D = [];
        image2D = [];
        score = 0;
        $("#gameScore").html("Score: " + score);
        generateIconImages();
    });

    $(document).on("click", ".gameCell", function () {
		let first, second;
        let clickedId = $(this).attr("id");
        let clickedData = $(this).attr("data");
		$("#message").hide().text("");
        clicksID.push(clickedId);
        if ($(this).hasClass("gameCell")) {
            first = parseInt(clickedId.substr(0, 1));
            second = parseInt(clickedId.substr(2, 3));
            var tempClassInsert = " col-md-2 ";
            class2D[first][second] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-" + image2D[first][second];
            drawField();
        }
        numberOfClicks++;
        if (numberOfClicks === 2) {
            clicks.push(clickedData);
            if (clicks[0] === clicks[1] && clicksID[0] !== clicksID[1]) {
                isMatch = true;
                class2D[parseInt(clicksID[0][0])][parseInt(clicksID[0][2])] = "gameCellMatched center-block glyphicon " 
							+ tempClassInsert + " glyphicon-" + image2D[parseInt(clicksID[0][0])][parseInt(clicksID[0][2])]; // replace gameCell with gameCellMatched class in class2D
                class2D[parseInt(clicksID[1][0])][parseInt(clicksID[1][2])] = "gameCellMatched center-block glyphicon " 
							+ tempClassInsert + " glyphicon-" + image2D[parseInt(clicksID[1][0])][parseInt(clicksID[1][2])]; // replace gameCell with gameCellMatched class in class2D
                drawField();
                score += 2;
                $("#gameScore").html("Score: " + score);
                if (score === (fieldSize * fieldSize)) {
                    $("#message").show().text("You won!");
                }
            } else {
                isMatch = false;
            }
        } else if (numberOfClicks === 3) {
            if (!isMatch) {
                class2D[parseInt(clicksID[0][0])][parseInt(clicksID[0][2])] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-question-sign";
                class2D[parseInt(clicksID[1][0])][parseInt(clicksID[1][2])] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-question-sign";
            }
            class2D[first][second] = "gameCell center-block glyphicon " + tempClassInsert + " glyphicon-" + image2D[first][second];
            drawField();
            clicks = [];
            clicksID = [];
            clicksID.push(clickedId);
            clicks.push(clickedData);
            numberOfClicks = 1;
        } else {
            clicks.push(clickedData);
        }
    });
});

function generateIconImages() {
    icons = [];
	id1D = [];
	class1D = [];
	image1D = [];
	
    let tempIconImages = iconImages.slice();
	let numberIconsNeeded = ((fieldSize * fieldSize) / 2);
	
    for (let i = 0; i < numberIconsNeeded; i++) {
        let randomIcon = Math.floor(Math.random() * tempIconImages.length);
        icons.push(tempIconImages[randomIcon]);
        icons.push(tempIconImages[randomIcon]);
        tempIconImages.splice(randomIcon, 1);
    }
	
	let tempArray = icons.slice();
	
    for (let i = 0; i < icons.length; i++) { // randomize the order of the iconImages
        if (tempArray.length > 0) {
            let rnd = Math.floor(Math.random() * (tempArray.length - 1));
            image1D.push(tempArray[rnd]);
            tempArray.splice(rnd, 1);
        }
    }
    
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            id1D.push(i + "-" + j);
			class1D.push("gameCell center-block glyphicon");
        }
    }

    convertTo2D(id1D, id2D);
    convertTo2D(image1D, image2D);
    convertTo2D(class1D, class2D);
	generateField();
}

function convertTo2D(temp1D, temp2D) {
    let count = 0;
    for (let i = 0; i < fieldSize; i++) {
        let tempArray = [];
        for (let j = 0; j < fieldSize; j++) {
            tempArray.push(temp1D[count]);
            count++;
        }
        temp2D.push(tempArray);
    }
}

function generateField() {
    for (let i = 0; i < fieldSize; i++) {
        for (let j = 0; j < fieldSize; j++) {
            class2D[i][j] += " col-md-2 glyphicon-question-sign ";
        }
    }
    drawField();
}

function drawField() {
    let message = "<div class='row'>";
    for (let i = 0; i < fieldSize; i++) {
        message += "<div class='row'><div class='col-md-2'></div>";
        for (let j = 0; j < fieldSize; j++) {
            message += "<div id='" + id2D[i][j] + "' class='" + class2D[i][j] + " text-center' data='" + image2D[i][j] + "'></div>";
        }
        message += "</div>";
    }
    message += "</div><div class='col-md-2'></div></div>";
    $("#field").html(message);
}