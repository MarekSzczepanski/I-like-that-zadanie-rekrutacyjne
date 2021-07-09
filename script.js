$(document).ready(() => {
    const generate_button = document.querySelector("[data-button='generate']");
    const fade_animation = () => {
        const tshirt_section = document.querySelector("[data-section='t-shirt']");

        $(tshirt_section).fadeIn(1500);
        tshirt_section.classList.add("display-flex");
        tshirt_section.scrollIntoView({behavior: "smooth"});
    }
    generate_button.addEventListener("click", fade_animation);
    

    let phrases_arr = [];
    const phrase_spans = document.querySelectorAll("[data-span='phrase']");

    const add_button = document.querySelector("[data-button='add']");
    const phrase_input = document.querySelector("[data-input='typing']");
    const generate_button_container = document.querySelector("[data-container='button-generate']");
    const phrases_container = document.querySelector("[data-container='phrases']");
    const add_phrase = () => {
        if (phrase_input.value && phrases_arr.length < 3) {
            generate_button_container.classList.remove("display-none");
                phrases_arr.push(phrase_input.value);
                for (let i=0; i<phrase_spans.length; i++) {
                    if (phrase_spans[i].classList.contains("display-none")) {
                        phrase_spans[i].childNodes[1].textContent = phrase_input.value;
                        phrase_spans[i].classList.remove("display-none");
                        phrases_container.appendChild(phrase_spans[i]);
                        break;
                    }
                }
                phrase_input.value = "";

        }
    }
    add_button.addEventListener("click", add_phrase);


    const phrase_delete_buttons = document.querySelectorAll("[data-button='delete-phrase']");
    const delete_phrase = (e) => {
        e.target.parentNode.classList.add("display-none");
        phrases_arr = phrases_arr.filter(x => x !== e.target.previousElementSibling.textContent);
        for (let i=0; i<phrases_arr.length; i++) {
            phrase_spans[i].childNodes[1].textContent = phrases_arr[i];
        }
    }
    for (let i=0; i<phrase_delete_buttons.length; i++) {
        phrase_delete_buttons[i].addEventListener("click", delete_phrase);
    }
});

