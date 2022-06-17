const photographerId = new URLSearchParams(window.location.search).get("id");
let namePhotographer;

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

async function init() {
    const photographer = await getPhotographer();
    const photographerData = photographerFactory(photographer);
    photographerData.getPhotographerProfile();
}

init();