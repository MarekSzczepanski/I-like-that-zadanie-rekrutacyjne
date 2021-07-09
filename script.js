$(document).ready(() => {
    let phrases_arr = [];
    const phrase_spans = document.querySelectorAll("[data-span='phrase']");

    const generate_button = document.querySelector("[data-button='generate']");
    const fade_animation = () => {
        const tshirt_section = document.querySelector("[data-section='t-shirt']");

        $(tshirt_section).fadeIn(1500);
        tshirt_section.classList.add("display-flex");
        tshirt_section.scrollIntoView({behavior: "smooth"});
    }

    const accordion_phrases = document.querySelectorAll("[data-div='accordion-phrase']");
    const add_phrases_to_accordion = () => {
        for (let i=0; i<accordion_phrases.length; i++) {
            accordion_phrases[i].parentNode.classList.add("display-none");
            if (phrases_arr[i]) {
                accordion_phrases[i].textContent = phrases_arr[i];
                accordion_phrases[i].parentNode.classList.remove("display-none");
            }
        }
    }

    const tshirt_phrases = document.querySelectorAll("[data-div='tshirt-phrase']");
    const add_phrases_to_tshirt = () => {
        for (let i=0; i<tshirt_phrases.length; i++) {
            tshirt_phrases[i].textContent = phrases_arr[i];
            tshirt_phrases[i].style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
    }

    const generate_phrases = () => {
        fade_animation();
        add_phrases_to_accordion();
        add_phrases_to_tshirt();
    }
    generate_button.addEventListener("click", generate_phrases);
    

    const generate_button_container = document.querySelector("[data-container='button-generate']");

    const add_button = document.querySelector("[data-button='add']");
    const phrase_input = document.querySelector("[data-input='typing']");
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
       
        phrases_arr = phrases_arr.filter(x => x !== e.target.previousElementSibling.textContent);
        for (let i=0; i<phrases_arr.length+1; i++) {
           phrase_spans[i].classList.remove("display-none");
           phrase_spans[i].childNodes[1].textContent = phrases_arr[i];
           if (phrase_spans[i].childNodes[1].textContent === "") {
               phrase_spans[i].classList.add("display-none");
           }
           if (!phrases_arr.length) {
                generate_button_container.classList.add("display-none");
           }
        }
    }
    for (let i=0; i<phrase_delete_buttons.length; i++) {
        phrase_delete_buttons[i].addEventListener("click", delete_phrase);
    }
});

