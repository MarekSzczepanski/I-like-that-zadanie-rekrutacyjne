$(document).ready(() => {
    let phrases_arr = [];
    const phrase_spans = document.querySelectorAll("[data-span='phrase']");
    const generate_button_container = document.querySelector("[data-container='button-generate']");


    const add_event_loop = (target, func) => {
        for (let i=0; i<phrase_spans.length; i++) {
            target[i].addEventListener("click", func);
        }
    }


    const add_button = document.querySelector("[data-button='add']");
    const phrase_input = document.querySelector("[data-input='typing']");
    const phrases_container = document.querySelector("[data-container='phrases']");
    const add_phrase = () => {
        if (phrase_input.value && phrases_arr.length < 3 && !phrases_arr.includes(phrase_input.value)) {
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
    add_event_loop(phrase_delete_buttons, delete_phrase);


    const fade_animation = () => {
        const tshirt_section = document.querySelector("[data-section='t-shirt']");

        $(tshirt_section).fadeIn(1500);
        tshirt_section.classList.add("display-flex");
        tshirt_section.scrollIntoView({behavior: "smooth"});
    }

    const accordion_phrases = document.querySelectorAll("[data-info='accordion-phrase']");
    const tshirt_phrases = document.querySelectorAll("[data-info='tshirt-phrase']");
    const add_phrases_to_target = (target) => {
        for (let i=0; i<target.length; i++) {
            target[i].parentNode.classList.add("display-none");
            if (phrases_arr[i]) {
                target[i].textContent = phrases_arr[i];
                target[i].parentNode.classList.remove("display-none");
                if (target === tshirt_phrases) {
                    tshirt_phrases[i].style.color = "#" + Math.floor(Math.random()*16777215).toString(16);
                }
            }
        }
    }


    const generate_button = document.querySelector("[data-button='generate']");
    const generate_phrases = () => {
        fade_animation();
        add_phrases_to_target(accordion_phrases);
        add_phrases_to_target(tshirt_phrases);
    }
    generate_button.addEventListener("click", generate_phrases);
    

    const accordion_arrows = document.querySelectorAll("[data-info='arrow']");
    const accordion_parts = document.querySelectorAll("[data-container='accordion-part']");
    const phrase_switch = (e, phrases_to_check) => {
        const active_switches = document.querySelectorAll(".active-switch");
        const remove_active_phrases = () => {
            for (let i=0; i<active_switches.length; i++) {
                active_switches[i].classList.remove("active-switch");
            }
        }
        if (e.target.classList.contains("active-switch") || e.target.parentNode.parentNode.classList.contains("active-switch")) {
            remove_active_phrases();
            return;
        }
        remove_active_phrases();
        let active_text;
        const activate_chosen_phrase = () => {
            if (e.target.dataset.info === "arrow") {
                e.target.parentNode.parentNode.classList.add("active-switch");
                active_text = e.target.parentNode.previousElementSibling.textContent;
            }
            else {
                e.target.classList.add("active-switch");
                active_text = e.target.textContent;
            }
        }
        const activate_mirror_phrase = () => {
            for (let i=0; i<phrases_to_check.length; i++) {
                if (phrases_to_check[i].textContent === active_text 
                || phrases_to_check[i].childNodes[1] && phrases_to_check[i].childNodes[1].textContent === active_text) {
                    phrases_to_check[i].classList.add("active-switch");
                }
            }
        }
        activate_chosen_phrase();
        activate_mirror_phrase();
    }
    add_event_loop(accordion_arrows, (e) => phrase_switch(e, tshirt_phrases));
    add_event_loop(tshirt_phrases, (e) => phrase_switch(e, accordion_parts));

    const position = { x: 0, y: 0 }
    interact("[data-draggable]").draggable({
        listeners: {
            move (event) {
                position.x += event.dx;
                position.y += event.dy;
                event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
            },
        }
    })
});

