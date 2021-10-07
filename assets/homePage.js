let burgerBtn = document.querySelector('#menu__toggle');
let link = document.querySelector('.menu__item');
burgerBtn.addEventListener('click', function () {
    if (burgerBtn.checked) {
        console.log("checked");
        burgerBtn.checked = true;
    } else {
        console.log("unchecked");
        document.body.style.position = "";
    }
})
link.addEventListener('click', function () {
    if (burgerBtn.checked) {
        burgerBtn.style.position = "fixed";
        const menuLinks = document.querySelectorAll('.menu__link');
        for (let i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener('click', function (event) {
                event.preventDefault();

                const blockId = event.target.getAttribute('href').substr(1);
                document.getElementById(blockId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            });
        }
    }
})

document.body.addEventListener('click', function () {
    if (burgerBtn.checked) {
        burgerBtn.checked = false;
    } else burgerBtn.checked = true;
})


var goTopBtn = document.querySelector('.back_to_top');

window.addEventListener('scroll', trackScroll);
goTopBtn.addEventListener('click', backToTop);

function trackScroll() {
    var scrolled = window.pageYOffset;
    var coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
        goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < coords) {
        goTopBtn.classList.remove('back_to_top-show');
    }
}

function backToTop() {
    if (window.pageYOffset > 0) {
        window.scrollBy(0, -80);
        setTimeout(backToTop, 0);
    }
}
