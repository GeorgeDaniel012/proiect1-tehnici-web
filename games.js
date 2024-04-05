function changeThemeMode(){
    if(localStorage.getItem("theme") == "light"){
        document.getElementsByClassName("thememode")[0].src = "assets/modes/light_mode.png";
        localStorage.setItem("theme", "dark");

        document.querySelectorAll("p", "h1", "h2", "h3", "a").forEach((elem) => {
            elem.style.color = "#DDDDDD";
        });
        document.querySelectorAll(".pBorder").forEach((elem) => {
            elem.style.color = "black";
            elem.style.backgroundColor = "#DDDDDD"
        });
        document.querySelectorAll(".game").forEach((elem) => {
            elem.style.borderColor = "#DDDDDD";
            elem.style.backgroundColor = "#DDDDDD";
        });
        document.body.style.backgroundColor = "black";
    }
    else{
        document.getElementsByClassName("thememode")[0].src = "assets/modes/dark_mode.png";
        localStorage.setItem("theme", "light");

        document.querySelectorAll("p", "h1", "h2", "h3", "a").forEach((elem) => {
            elem.style.color = "#222222";
        });
        document.querySelectorAll(".pBorder").forEach((elem) => {
            elem.style.color = "white";
            elem.style.backgroundColor = "#222222"
        });
        document.querySelectorAll(".game").forEach((elem) => {
            elem.style.borderColor = "#222222";
            elem.style.backgroundColor = "#222222";
        });
        document.body.style.backgroundColor = "white";
    }
}

function changeColors(){
    let colors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
    let cr = document.getElementById("copyright-text");
    cr.style.color = `rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;
    cr.style.border = `${Math.random() * 5}px solid rgb(${colors[0]}, ${colors[1]}, ${colors[2]})`;

    if(getComputedStyle(cr).getPropertyValue("color").match(/\d+/g)[0] > 200){
        cr.style.borderStyle = "dotted";
    }
}

window.onload = function(){
    //tema site-ului
    let theme_image = document.getElementsByClassName("thememode")[0];
    if(localStorage.getItem("theme") == "light" || localStorage.getItem("theme") == undefined){ 
        theme_image.setAttribute('src', "assets/modes/dark_mode.png");
        localStorage.getItem("theme") == "light";
    }
    else{
        theme_image.setAttribute('src', "assets/modes/light_mode.png");
        document.querySelectorAll("p", "h1", "h2", "h3", "a").forEach((elem) => {
            elem.style.color = "#DDDDDD";
        });
        document.querySelectorAll(".pBorder").forEach((elem) => {
            elem.style.color = "black";
            elem.style.backgroundColor = "#DDDDDD"
        });
        document.querySelectorAll(".game").forEach((elem) => {
            elem.style.borderColor = "#DDDDDD";
            elem.style.backgroundColor = "#DDDDDD";
        });
        document.body.style.backgroundColor = "black";
    }

    //event listnere pentru schimbarea temei
    theme_image.addEventListener('click', changeThemeMode);
    theme_image.addEventListener('keydown', (event) => {
        console.log("aaa");
        if(event.code == "KeyM"){
            changeThemeMode();
        }
    })

    //schimbarea culorii textului de copyright
    setInterval(changeColors, 2500);
}