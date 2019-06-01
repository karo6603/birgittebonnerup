// NAV

let dropbtn = document.querySelector(".dropbtn");
let dropcontent = document.querySelector(".dropdown-content");

let menu = document.querySelector("#menu");
let overlay = document.querySelector(".overlay");
let overlaycontent = document.querySelector(".overlaycontent");
let exit = document.querySelector(".closebtn");

menu.addEventListener("click", showOverlay);

function showOverlay() {
    overlay.style.width = "80%";
    overlaycontent.style.display = "block";
    exit.style.display = "block";
    menu.style.visibility = "hidden";

    exit.addEventListener("click", closeOverlay);

}

function closeOverlay() {
    overlay.style.width = "0%";
    overlaycontent.style.display = "none";
    exit.style.display = "none";
    menu.style.visibility = "visible";
}

dropbtn.addEventListener("click", dropDown);

function dropDown() {
    dropcontent.classList.toggle("show");
}


// FILTRERING
