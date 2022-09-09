const photographerId = new URLSearchParams(window.location.search).get("id");
let mediasList = [];
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
    const filterOptionsBox = document.querySelector(".filter_select_options");
    const selected = document.querySelector(".selected");
    
    selected.onclick = () => {
        if(isOpen) {
            closeBox();
        }else{
            filterOptionsBox.style.display = "flex";
            filterOptionsBox.setAttribute("aria-expanded", "true");
            icon.classList.add("icon_rotate");
            filterOptionsBox.classList.add("open")
            isOpen = true;
        }
    }
}

function closeBox() {
    const icon = document.querySelector(".icon_filter");
    icon.classList.remove("icon_rotate");
    const filterOptionsBox = document.querySelector(".filter_select_options");
    
    filterOptionsBox.style.display = "none";
    filterOptionsBox.setAttribute("aria-expanded", "false");
    return isOpen = false
}

function incrementLikes() {
    const likesIcon = document.querySelectorAll(".icon_heart");
    const allLikes = document.querySelector(".tag_likes p");

    likesIcon.forEach(like => {
        like.onclick = () => {
            increment(like);
        }

        like.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                increment(like)
            }
        })
    })

    function increment(like) {
        let likeText = like.previousElementSibling;

        if(likeText.classList.contains("liked")) {
            likeText.classList.remove("liked");
            likeText.textContent--;
            allLikes.textContent--;
            like.classList.replace("fa-solid", "fa-regular");
        }else{
            likeText.classList.add("liked");
            likeText.textContent++;
            allLikes.textContent++;
            like.classList.replace("fa-regular", "fa-solid");
        }
    }
}

function allLikes(media) {
    let sum = 0;
    media?.forEach(like => {
        sum += like.likes
    });
    const allLikes = document.querySelector(".tag_likes p");
    allLikes.textContent = sum;
    return sum;
}

function stickyTag(photographer) {
    const tag = document.querySelector(".tag");
  
    const likes = document.createElement("div");
    likes.className = "tag_likes";
    const likesText = document.createElement("p");
    const likesIcon = document.createElement("i");
    likesIcon.className = "fa-solid fa-heart";
    likes.appendChild(likesText);
    likes.appendChild(likesIcon);
  
    const price = document.createElement("span");
    price.textContent = photographer.price + "€/jour";
  
    tag.appendChild(likes);
    tag.appendChild(price);
  
    return tag;
}

function sortMedias(medias) {
    const filterOptions = document.querySelectorAll(".filter_option");
    const selected = document.querySelector(".selected");

    medias = medias?.sort((media1, media2) => {
        return media2.likes - media1.likes;
    });
    displayMedia(medias)
    displayLightbox(mediasList)

    filterOptions?.forEach(filter => {
        filter.onclick = (e) => {
            switch (e.target.textContent) {
                case "Popularité":
                    medias = medias?.sort((media1, media2) => {
                        return media2.likes - media1.likes;
                    });
                break;

                case "Date":
                    medias = medias?.sort((media1, media2) => {
                        return new Date(media2.date) - new Date(media1.date)
                    });
                break;

                case "Titre":
                    medias = medias?.sort((media1, media2) => {
                        return media1.title.localeCompare(media2.title);
                    });
                break;
            }

            const buttonSelected = filter.textContent
            filter.textContent = selected.textContent
            selected.textContent = buttonSelected;

            closeBox()
            displayMedia(medias)
            incrementLikes()
            displayLightbox(mediasList)
        }
    })
}

async function init() {
    const photographer = await getPhotographer();
    const photographerData = photographerFactory(photographer);
    photographerData.getPhotographerProfile();

    const medias = await getMedias();
    sortMedias(medias);
    filterDisplay();
    stickyTag(photographer);
    allLikes(medias);
    incrementLikes();
}

init();