let score = 0
moonSpeed = 50
document.getElementById("rocket").style.display = "none"
//document.getElementById("Moon").style.left = "50%"
//document.getElementById("Moon").style.top = "0px"
//console.log(parseInt(document.getElementById("Moon").style.left))
let moonInterval
MoonMove()
let moonLeft = 10
let moonTop = 10
function MoonMove() {
    moonInterval = setInterval(function () {
        document.getElementById("Moon").style.left = parseInt(document.getElementById("Moon").offsetLeft) + moonLeft + "px"
        document.getElementById("Moon").style.top = parseInt(document.getElementById("Moon").offsetTop) + moonTop + "px"
        let spaceElement = document.getElementById("space");
        let spaceWidth = spaceElement.offsetWidth;
        let spaceLeft = spaceElement.offsetLeft;

        if (parseInt(document.getElementById("Moon").style.left) > spaceWidth + spaceLeft - 150) {
            moonLeft *= -1;
        }
        if (parseInt(document.getElementById("Moon").style.left) < spaceLeft) {
            moonLeft *= -1;
        }
        if (parseInt(document.getElementById("Moon").style.top) > (690 - document.getElementById("Moon").offsetWidth)) {
            moonTop *= -1;
        }
        if (parseInt(document.getElementById("Moon").style.top) < 1) {
            moonTop *= -1;
        }
    }, moonSpeed)

}
function stopMoonMove() {
    clearInterval(moonInterval);
}

document.addEventListener("click", function (event) {
    if (document.getElementById("rocket").style.display == "none") {
        let x = event.clientX;
        document.getElementById("rocket").style.top = '800px'
        document.getElementById("rocket").style.display = "block"
        document.getElementById("rocket").style.left = x - 37 + "px"
        rocketInterval = setInterval(function () {
            document.getElementById("rocket").style.top = parseInt(window.getComputedStyle(document.getElementById('rocket')).top) - 5 + 'px'


            if (parseInt(document.getElementById("rocket").style.top) < 0) {
                document.getElementById("rocket").style.display = "none"
                clearInterval(rocketInterval);
                console.log('cleared')
                stopMoonMove()
                clearInterval(rocketInterval);
                clearInterval(checkWin);
                //console.log(localStorage.getItem("BestScore"))
                if (score > localStorage.getItem("BestScore")) {
                    localStorage.setItem("BestScore", score)
                }
                alert(`Game Over!
Your Score :  `+ score + `
Best Score :  ` + localStorage.getItem("BestScore"))
                location.reload()
            }
        }, 1)
    } else {
        console.log("alo", document.getElementById("rocket").style.display)
    }
});
//console.log(document.documentElement.scrollHeight, document.getElementById("rocket").style.display)
let checkWin;
CheckWin()
function CheckWin() {
    checkWin = setInterval(function () {
        let moonTop = window.getComputedStyle(document.getElementById('Moon')).top;
        let moonLeft = window.getComputedStyle(document.getElementById('Moon')).left;
        let rocketTop = window.getComputedStyle(document.getElementById('rocket')).top;
        let rocketLeft = window.getComputedStyle(document.getElementById('rocket')).left;
        if (
            parseInt(rocketTop) >= parseInt(moonTop) && parseInt(rocketTop) <= parseInt(moonTop) + 150
            &&
            parseInt(rocketLeft) + 70 >= parseInt(moonLeft) && parseInt(rocketLeft) < parseInt(moonLeft) + 145
        ) {
            HitCheck()
        }
        ///console.log('rocketTop', parseInt(rocketTop), "moonTop", parseInt(moonTop) + 150);
        //console.log('rocketLeft', parseInt(rocketLeft), "moonLeft", parseInt(moonLeft));

    }, 100)
}
let rockLevel = 0
function HitCheck() {
    moonLeft *= Math.random() < 0.5 ? 1 : -1;
    moonTop *= Math.random() < 0.5 ? 1 : -1;
    switch (parseInt(parseInt(window.getComputedStyle(document.getElementById('rocket')).bottom) / 100)) {
        case 0:
            score++
            break;
        case 2:
            score--
            break;
        case 3:
            document.getElementById("score").style.color = "#ffb300"
            break;
        case 4:
            document.getElementById("score").style.color = "#ff8400"
            break;
        case 5:
            document.getElementById("score").style.color = "#f00"
            break;
        case 6:
            document.getElementById("score").style.color = "#9f0000"
            break;
        case 7:
            document.getElementById("score").style.color = "#6f0000"
            break;

        default:
            break;
    }
    score += parseInt(parseInt(window.getComputedStyle(document.getElementById('rocket')).bottom) / 100)
    explodeRocket()


    //console.log(parseInt(score / 30))
    if (parseInt(score / 10) > rockLevel) {
        rockLevel++
        AddRock()
        clearInterval(rocksMove);
        RocksMove();
    }
    moonSpeed--
    document.getElementById("score").innerHTML = score
}
let rocksMove;

RocksMove();
function RocksMove() {
    let rocks = document.getElementById("space").querySelectorAll('.rock');

    rocks.forEach(function (rock) {
        let rockTopSpeed = (Math.random() * 2 + 1) + 5;
        let rockLeftSpeed = (Math.random() * 2 + 1) + 5;
        rockLeftSpeed *= Math.random() < 0.5 ? 1 : -1;
        rockTopSpeed *= Math.random() < 0.5 ? 1 : -1;
        let rockLeft = rock.offsetLeft;
        let rockTop = rock.offsetTop;

        rocksMove = setInterval(function () {
            rockLeft += rockLeftSpeed;
            rockTop += rockTopSpeed;

            rock.style.left = rockLeft + "px";
            rock.style.top = rockTop + "px";
            let rocketTop = window.getComputedStyle(document.getElementById('rocket')).top;
            let rocketLeft = window.getComputedStyle(document.getElementById('rocket')).left;
            //console.log("left:", rock.style.left, "top:", rock.style.top)
            if (
                parseInt(rocketTop) >= parseInt(rockTop) && parseInt(rocketTop) <= parseInt(rockTop) + 45
                &&
                parseInt(rocketLeft) + 50 >= parseInt(rockLeft) && parseInt(rocketLeft) < parseInt(rockLeft) + 45
            ) {
                explodeRocket()
                alert(`Game Over!
Your Score :  `+ score + `
Best Score :  ` + localStorage.getItem("BestScore"))
                location.reload()

            }
            let spaceElement = document.getElementById("space");
            let spaceWidth = spaceElement.offsetWidth;
            let spaceHeight = spaceElement.offsetHeight;

            if (rockLeft >= (spaceWidth - 50) || rockLeft <= 0) {
                rockLeftSpeed *= -1;
            }

            if (rockTop >= (spaceHeight - 50) || rockTop <= 0) {
                rockTopSpeed *= -1;
            }

        }, 30);
    });
}
function AddRock() {

    document.getElementById("space").innerHTML += `
        <div class="rock" style = "left: `+ document.getElementById("Moon").offsetLeft + `px;
    
        top: `+ document.getElementById("Moon").offsetTop + `px;"><img src="rock.gif" alt=""></div>
    `

}
function explodeRocket() {
    //clearInterval(rocksMove);
    document.getElementById("moonImg").style.filter = "sepia(100%) saturate(10000%) hue-rotate(0deg) brightness(50%)"
    clearInterval(checkWin);
    stopMoonMove()
    clearInterval(rocketInterval);
    document.getElementById("explosion").style.display = "block"
    document.getElementById("rocket").id = "explodeRocket"

    let random = Math.floor(Math.random() * 3) + 1
    let explosionSound = new Audio("explosion-" + random + ".mp3")
    explosionSound.play()

    setTimeout(function () {
        document.getElementById("moonImg").style.filter = "none"
        document.getElementById("score").style.color = "#fff"
        document.getElementById("explosion").style.display = "none"
        document.getElementById("explodeRocket").id = "rocket"
        document.getElementById("rocket").style.top = '900px'
        document.getElementById("rocket").style.left = '0px'
        document.getElementById("rocket").style.display = "none"
        MoonMove()
        CheckWin()
        //RocksMove();

    }, 500)
}
