const photographerId = new URLSearchParams(window.location.search).get("id");
let namePhotographer;
let mediasList = [];

async function getPhotographer() {
    const data = await fetch("./data/photographers.json");
    const photographers = await data.json();

    const photographer = photographers.photographers.filter(function(photographer) {
        if(photographer.id == photographerId) {
            namePhotographer = photographer.name;
            return photographer;
        }
    });
    return photographer[0];
}

async function getMedias() {
    const data = await fetch("./data/photographers.json");
    let medias = await data.json();
    medias = medias.media.filter((media) => {
        if(media.photographerId == photographerId) {
            return medias;
        }
    })
    return medias;
}

function displayMedia(medias) {
    const photographerMediasSection = document.querySelector(".medias_display");
    photographerMediasSection.innerHTML = "";

    medias?.forEach(media => {
        const photographerMedia = new mediasFactory(media);
        const mediaCardDOM = photographerMedia.getMediaCardDOM();
        photographerMediasSection.appendChild(mediaCardDOM);
        mediasList.push(media);
    })
}

let isOpen = false;
function filterDisplay() {
    const icon = document.querySelector(".icon_filter");
    const filterOptionBox = document.querySelector(".filter_select_options");
    const selected = document.querySelector(".selected");

    selected.onclick = () => {
        if(isOpen) {
            closeBox();
        }else{
            filterOptionBox.getElementsByClassName.display = "flex";
            filterOptionBox.setAttribute("aria-expanded", "true");
            icon.classList.add("icon_rotate");
            filterOptionBox.classList.add("open")
            isOpen = true;
        }
    }
}

function closeBox() {
    const icon = document.querySelector(".icon_filter");
    icon.classList.remove("icon_rotate");
    const filterOptionBox = document.querySelector(".filter_select_options");

    filterOptionBox.style.display = "none";
    filterOptionBox.setAttribute("aria-expanded", "false");
    return isOpen = false;
}

function sortMedias(medias) {
    const filterOptions = document.querySelectorAll(".filter_option");
    const selected = document.querySelector(".selected");

    medias = medias?.sort((media1, media2) => {
        return media2.likes - media1.likes;
    })
    displayMedia(medias);
    displayLightbox(mediasList);

    filterOptions?.forEach(filter => {
        filter.onclick = (e) => {
            switch(e.target.textContent) {
                case "Popularité" :
                    medias = medias?.sort((media1, media2) => {
                        return media2.likes - media1.likes;
                    });
                break

                case "Date" :
                    medias = medias?.sort((media1, media2) => {
                        return new Date(media2.date) - new Date(media1.date)
                    });
                break;

                case "Titre" :
                    medias = medias?.sort((media1, media2) => {
                        return media1.title.localeCompare(media2.title);
                    });
                break
            }

            const buttonSelected = filter.textContent;
            filter.textContent = selected.textContent;
            selected.textContent = buttonSelected;

            closeBox();
            displayMedia(medias);
            incrementLikes();
            displayLightbox(mediasList);
        }
    })
}

async function init() {
    const photographer = await getPhotographer();
    const photographerData = photographerFactory(photographer);
    photographerData.getPhotographerProfile();

    const medias = await getMedias();
    filterDisplay();
    sortMedias(medias);
}

init();