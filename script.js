let score = 0
moonSpeed = 50
document.getElementById("rocket").style.display = "none"
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

        if (parseInt(document.getElementById("Moon").style.left) > spaceWidth + spaceLeft - 170) {
            moonLeft *= -1;
        }
        if (parseInt(document.getElementById("Moon").style.left) < spaceLeft + 20) {
            moonLeft *= -1;
        }
        if (parseInt(document.getElementById("Moon").style.top) > (spaceElement.offsetHeight - document.getElementById("Moon").offsetWidth)) {
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
    let rocket = document.getElementById("rocket")
    let moon = document.getElementById("Moon")
    if (rocket.style.display == "none") {
        let x = event.clientX;
        rocket.style.top = '800px'
        rocket.style.display = "block"
        rocket.style.left = x - 37 + "px"
        rocketInterval = setInterval(function () {
            let rocketCenterX = rocket.offsetLeft + rocket.offsetWidth / 2
            let rocketCenterY = rocket.offsetTop + rocket.offsetHeight / 2
            let moonCenterX = moon.offsetLeft + moon.offsetWidth / 2
            let moonCenterY = moon.offsetTop + moon.offsetHeight / 2
            const distance = Math.sqrt((rocketCenterX - moonCenterX) * (rocketCenterX - moonCenterX) + (rocketCenterY - moonCenterY) * (rocketCenterY - moonCenterY));
            console.log(distance, (rocket.offsetWidth / 2 + moon.offsetWidth / 2))
            if (distance < (rocket.offsetWidth / 2 + moon.offsetWidth / 2)) {
                Hit()
            }
            rocket.style.top = parseInt(window.getComputedStyle(document.getElementById('rocket')).top) - 5 + 'px'
            if (parseInt(rocket.style.top) < 0) {
                rocket.style.display = "none"
                clearInterval(rocketInterval);
                console.log('cleared')
                if (score > localStorage.getItem("BestScore")) {
                    localStorage.setItem("BestScore", score)
                }
                GameEnd()
            }
        }, 7)
    }
});
let rockLevel = 0
function Hit() {
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
    if (parseInt(score / 50) > rockLevel) {
        rockLevel++
        AddRock()
    }
    moonSpeed--
    document.getElementById("score").innerHTML = score
}
let rocksMove;
function AddRock() {
    let rock = document.createElement("div");
    rock.className = 'rock'
    rock.innerHTML = `<img src="rock.gif" alt="">`
    document.getElementById("space").appendChild(rock)
    rock.style.top = document.getElementById("Moon").offsetTop + `px`
    rock.style.left = document.getElementById("Moon").offsetLeft + `px`
    let rockTopSpeed = (Math.random() * 2) * 2;
    let rockLeftSpeed = (Math.random() * 2) * 2;
    rockLeftSpeed *= Math.random() < 0.5 ? 1 : -1;
    rockTopSpeed *= Math.random() < 0.5 ? 1 : -1;
    let rockLeft = rock.offsetLeft;
    let rockTop = rock.offsetTop;
    rocksMove = setInterval(function () {
        let rocket = document.getElementById("rocket")
        let rocketCenterX = rocket.offsetLeft + rocket.offsetWidth / 2
        let rocketCenterY = rocket.offsetTop + rocket.offsetHeight / 2
        let rockCenterX = rock.offsetLeft + rock.offsetWidth / 2
        let rockCenterY = rock.offsetTop + rock.offsetHeight / 2
        const distance = Math.sqrt((rocketCenterX - rockCenterX) * (rocketCenterX - rockCenterX) + (rocketCenterY - rockCenterY) * (rocketCenterY - rockCenterY));
        console.log(distance, (rocket.offsetWidth / 2 + rock.offsetWidth / 2))
        if (distance < (rocket.offsetWidth / 2 + rock.offsetWidth / 2)) {
            explodeRocket()
            GameEnd()
        }
        rockLeft += rockLeftSpeed;
        rockTop += rockTopSpeed;
        rock.style.left = rockLeft + "px";
        rock.style.top = rockTop + "px";
        let spaceElement = document.getElementById("space");
        let spaceWidth = spaceElement.offsetWidth;
        let spaceHeight = spaceElement.offsetHeight;
        if (rockLeft > (spaceWidth + 50) || rockLeft <= spaceElement.offsetLeft) {
            rockLeftSpeed *= -1;
        }
        if (rockTop > (spaceHeight - 50) || rockTop <= 0) {
            rockTopSpeed *= -1;
        }
    }, 5);
}
function explodeRocket() {
    document.getElementById("moonImg").style.filter = "sepia(100%) saturate(200%) hue-rotate(0deg) brightness(40%) "
    stopMoonMove()
    clearInterval(rocketInterval);
    document.getElementById("explosion").style.display = "block"
    document.getElementById("explosion").style.top = document.getElementById("rocket").offsetTop - 60 + `px`
    document.getElementById("explosion").style.left = document.getElementById("rocket").offsetLeft - 60 + `px`
    document.getElementById("rocket").style.top = '900px'
    document.getElementById("rocket").style.left = '0px'
    document.getElementById("rocket").style.display = "none"
    let random = Math.floor(Math.random() * 3) + 1
    let explosionSound = new Audio("explosion-" + random + ".mp3")
    explosionSound.play()
    setTimeout(function () {
        document.getElementById("moonImg").style.filter = "drop-shadow(1px 1px 30px #fff"
        document.getElementById("score").style.color = "#fff"
        document.getElementById("explosion").style.display = "none"
        MoonMove()
    }, 600)
}
function GameEnd() {
    clearInterval(rocksMove)
    stopMoonMove()
    let GameTitle = document.getElementById("gameEnd")
    document.getElementById("rocket").style.display = "block"
    document.getElementById("gameScore").innerHTML = 'Score : ' + score
    document.getElementById("bestScore").innerHTML = 'Best Score : ' + localStorage.getItem("BestScore")
    GameTitle.style.bottom = '45%'
}
