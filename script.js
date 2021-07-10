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

    const tshirt_phrases = document.querySelectorAll("[data-span='tshirt-phrase']");
    const add_phrases_to_tshirt = () => {
        for (let i=0; i<tshirt_phrases.length; i++) {
            tshirt_phrases[i].textContent = phrases_arr[i];
            tshirt_phrases[i].style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
        }
    }

    const tshirt_phrases_frame = (e, isAccordion) => {
        const active_phrase = document.querySelector(".active-phrase");
        if (isAccordion) {
            for (let i=0; i<tshirt_phrases.length; i++) {
                tshirt_phrases[i].classList.remove("active-phrase");
                if (tshirt_phrases[i].textContent === isAccordion) {
                    tshirt_phrases[i].classList.add("active-phrase");
                }
            }
        }
        else {
            if (active_phrase) {
                active_phrase.classList.remove("active-phrase");
            }
            e.target.classList.add("active-phrase");
            accordion_switch(null, e.target.textContent);
        }
    }
    for (let i=0; i<tshirt_phrases.length; i++) {
        tshirt_phrases[i].addEventListener("click", (e) => tshirt_phrases_frame(e));
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


    const accordion_arrows = document.querySelectorAll("[data-image='arrow']")
    const accordion_switch = (e, isTriggeredByTshirtPhrase) => {
        const accordion_active_part = document.querySelector(".accordion-active");
        if (isTriggeredByTshirtPhrase) {
            for (let i=0; i<accordion_phrases.length; i++) {
                accordion_phrases[i].parentNode.classList.remove("accordion-active");
                if (accordion_phrases[i].textContent === isTriggeredByTshirtPhrase) {
                    accordion_phrases[i].parentNode.classList.add("accordion-active");
                }
            }
        }
        else {
            if (accordion_active_part && accordion_active_part !== e.target.parentNode.parentNode) {
                accordion_active_part.classList.toggle("accordion-active");
            }
            e.target.parentNode.parentNode.classList.toggle("accordion-active");
            tshirt_phrases_frame(null, e.target.parentNode.parentNode.childNodes[1].textContent);
        }
    }
    for (let i=0; i<accordion_arrows.length; i++) {
        accordion_arrows[i].addEventListener("click", accordion_switch);
    }

    const position = { x: 0, y: 0 }
    interact(".draggable").draggable({
        listeners: {
            start (event) {
                console.log(event.type, event.target);
            },
            move (event) {
                position.x += event.dx;
                position.y += event.dy;
                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            },
        }
    })
});

