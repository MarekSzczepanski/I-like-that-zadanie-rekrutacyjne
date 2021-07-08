$(document).ready(() => {
    const generate_button = document.querySelector("[data-button='generate']");
    const tshirt_section = document.querySelector("[data-section='t-shirt']");
    
    $(generate_button).click(() => {
        $(tshirt_section).fadeIn(1500);
        tshirt_section.classList.add("display-flex");
        tshirt_section.scrollIntoView({behavior: "smooth"});
    });
});

