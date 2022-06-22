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

async function init() {
    const photographer = await getPhotographer();
    const photographerData = photographerFactory(photographer);
    photographerData.getPhotographerProfile();
}

init();