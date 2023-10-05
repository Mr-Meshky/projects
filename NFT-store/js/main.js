const menuIcon = document.querySelector(".hamburger-icon"),
    menu = document.querySelector(".hamburger-menu"),
    body = document.querySelector("body");

let num = 0;
menuIcon.addEventListener('click', () => {
    num++;
    if (num % 2 == 0) {
        menu.classList.toggle('show-menu');

        if (body.style.overflowY == "hidden") {
            body.style.overflowY = "auto";
        } else {
            body.style.overflowY = "hidden";
        }
    }
})