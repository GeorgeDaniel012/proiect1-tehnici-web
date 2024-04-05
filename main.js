function submitForm(event){
    event.stopPropagation();
    event.preventDefault();
    let formData = new FormData(event.target);
    let elem = document.getElementById("submitstatus");
    if(elem != undefined){
        elem.parentNode.removeChild(elem);
    }
    elem = document.createElement('p');
    elem.id = "submitstatus";
    if(formData.get("username").match("\\b[0-9]")){
        elem.innerHTML = "Username cannot start with a number!";
    }
    else if(formData.get("username").match("^\\s*$")){
        elem.innerHTML = "Username cannot be empty!";
    }
    else if(formData.get("useremail").match("^\\s*$")){
        elem.innerHTML = "Email cannot be empty!";
    }
    else if(formData.get("gender") == "Please select gender"){
        elem.innerHTML = "Please select a gender!";
    }
    else{
        elem.innerHTML = `You are now subscribed! Date subscribed: ${new Date().toLocaleDateString()}`;
    }
    document.getElementById("form-section").appendChild(elem);
    setTimeout(() => {
        let elem2 = document.getElementById("submitstatus");
        if(elem2 != undefined){
            elem2.parentNode.removeChild(elem2);
        }
    }, 5000);
}

function changeThemeMode(){
    if(localStorage.getItem("theme") == "light"){
        document.getElementsByClassName("thememode")[0].src = "assets/modes/light_mode.png";
        localStorage.setItem("theme", "dark");

        document.querySelectorAll("p", "h1", "h2", "h3").forEach((elem) => {
            elem.style.color = "#DDDDDD";
        });
        document.querySelectorAll(".pBorder").forEach((elem) => {
            elem.style.color = "black";
            elem.style.backgroundColor = "#DDDDDD"
        });
        document.querySelectorAll(".news").forEach((elem) => {
            elem.style.borderColor = "#DDDDDD";
        });
        document.querySelectorAll(".news-title").forEach((elem) => {
            elem.style.color = "white";
        });
        document.querySelectorAll(".news:nth-of-type(2n+1) .news-title").forEach((elem) => {
            elem.style.color = "black";
            elem.style.backgroundColor = "#DDDDDD";
        });
        document.querySelector("form").style.color = "white";
        document.body.style.backgroundColor = "black";
    }
    else{
        document.getElementsByClassName("thememode")[0].src = "assets/modes/dark_mode.png";
        localStorage.setItem("theme", "light");

        document.querySelectorAll("p", "h1", "h2", "h3").forEach((elem) => {
            elem.style.color = "#222222";
        });
        document.querySelectorAll(".pBorder").forEach((elem) => {
            elem.style.color = "white";
            elem.style.backgroundColor = "#222222"
        });
        document.querySelectorAll(".news").forEach((elem) => {
            elem.style.borderColor = "#222222";
        });
        document.querySelectorAll(".news-title").forEach((elem) => {
            elem.style.color = "black";
        });
        document.querySelectorAll(".news:nth-of-type(2n+1) .news-title").forEach((elem) => {
            elem.style.color = "white";
            elem.style.backgroundColor = "#222222";
        });
        document.querySelector("form").style.color = "black";
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
    //form
    let form = document.getElementsByTagName("form")[0];
    form.addEventListener('submit', submitForm);

    //tema site-ului
    let theme_image = document.getElementsByClassName("thememode")[0];
    if(localStorage.getItem("theme") == "light" || localStorage.getItem("theme") == undefined){ 
        theme_image.setAttribute('src', "assets/modes/dark_mode.png");
        localStorage.getItem("theme") == "light";
    }
    else{
        theme_image.setAttribute('src', "assets/modes/light_mode.png");
        document.querySelectorAll("p", "h1", "h2", "h3").forEach((elem) => {
            elem.style.color = "#DDDDDD";
        });
        document.querySelectorAll(".pBorder").forEach((elem) => {
            elem.style.color = "black";
            elem.style.backgroundColor = "#DDDDDD"
        });
        document.querySelectorAll(".news").forEach((elem) => {
            elem.style.borderColor = "#DDDDDD";
        });
        document.querySelectorAll(".news-title").forEach((elem) => {
            elem.style.color = "white";
        });
        document.querySelectorAll(".news:nth-of-type(2n+1) .news-title").forEach((elem) => {
            elem.style.color = "black";
            elem.style.backgroundColor = "#DDDDDD";
        });
        document.querySelector("form").style.color = "white";
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

    //fetch si generarea de news
    fetch("./news.json").then((response) => response.json()).then((json) => {
        console.log(json);
        json.forEach((news) => {
            document.getElementsByClassName("news-container")[0].innerHTML +=
            `<div class="news">
                <p class="news-title">${news.title}</p>
                <p class="news-date">Date: ${news.date}</p>
                <div class="news-preview">
                    <p>${news.content}</p>
                </div>
            </div>`
        })
    })

    //schimbarea culorii textului de copyright
    setInterval(changeColors, 2500);
}