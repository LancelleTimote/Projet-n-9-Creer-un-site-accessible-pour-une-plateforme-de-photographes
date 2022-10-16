const lightboxContainer = document.createElement("div");
lightboxContainer.className = "lightbox_container";
lightboxContainer.style.display = "none";
lightboxContainer.setAttribute("aria-hidden", "true");
document.body.appendChild(lightboxContainer);

let index = 0;

function displayLightbox(mediasList) {
    const mediasDom = document.querySelectorAll(".media_img, .media_video");

    mediasDom.forEach(media => {
        media.onclick = (e) => {
            let currentMediaTarget = e.target;
            let currentMedia = mediasList.find((media) => media.id == currentMediaTarget.dataset.id)
            index = parseInt(e.target.getAttribute('data_id'));
            lightboxDOM(currentMedia, index, mediasList)
        }

        //Keyboard event
        media.addEventListener("keydown", (e) => {
            if(e.key === "Enter") {
                let currentMediaTarget = e.target;
                let currentMedia = mediasList.find((media) => media.id == currentMediaTarget.dataset.id)
                index = parseInt(e.target.getAttribute('data_id'));
                lightboxDOM(currentMedia, index, mediasList)
            }
        })
    })
}

function lightboxDOM(currentMedia, index, mediasList) {
    const { photographerId, title, image, video } = currentMedia

    lightboxContainer.style.display = "block";
    lightboxContainer.setAttribute("aria-hidden", "false");

    const lightboxModal = document.createElement("div");
    lightboxModal.className = "lightbox_modal";
    lightboxContainer.appendChild(lightboxModal);

    const lightboxPrevious = document.createElement("button");
    lightboxPrevious.className = "lightbox_previous";
    lightboxModal.appendChild(lightboxPrevious);
    const previousIcon = document.createElement("i");
    previousIcon.className = "fa-solid fa-chevron-left";
    lightboxPrevious.appendChild(previousIcon);

    const lightboxMedia = document.createElement("div");
    lightboxMedia.className = "lightbox_media";
    lightboxModal.appendChild(lightboxMedia);

    if("image" in currentMedia) {
        const lightboxImage = document.createElement("img");
        lightboxImage.className = "lightbox_image";
        lightboxImage.setAttribute("src", `assets/photographers/${photographerId}/${image}`);
        lightboxImage.setAttribute("alt", title);
        lightboxImage.dataset.id = index;
        lightboxMedia.appendChild(lightboxImage);
    }else{
        const lightboxVideo = document.createElement("video");
        const lightboxSourceVideo = document.createElement("source")
        lightboxVideo.className = "lightbox_video";
        lightboxVideo.setAttribute("alt", title);
        lightboxVideo.setAttribute("controls", "");
        lightboxVideo.dataset.id = index;
        lightboxSourceVideo.setAttribute("src", `assets/photographers/${photographerId}/${video}`);
        lightboxSourceVideo.setAttribute("type", "video/mp4");
        lightboxMedia.appendChild(lightboxVideo);
        lightboxVideo.appendChild(lightboxSourceVideo);
    }

    const lightboxTitle = document.createElement("h3");
    lightboxTitle.className = "lightbox_title";
    lightboxTitle.textContent = title;
    lightboxMedia.appendChild(lightboxTitle);

    const lightboxClose = document.createElement("button");
    lightboxClose.className = "lightbox_close";
    lightboxModal.appendChild(lightboxClose);
    const closeIcon = document.createElement("i");
    closeIcon.className = "fa-solid fa-xmark";
    lightboxClose.appendChild(closeIcon);

    const lightboxNext = document.createElement("button");
    lightboxNext.className = "lightbox_next";
    lightboxModal.appendChild(lightboxNext);
    const nextIcon = document.createElement("i");
    nextIcon.className = "fa-solid fa-chevron-right";
    lightboxNext.appendChild(nextIcon);

    eventHandler(mediasList, currentMedia);
}

function eventHandler(mediasList, currentMedia) {
    const lightboxClose = document.querySelector(".lightbox_close");
    const lightboxPrevious = document.querySelector(".lightbox_previous");
    const lightboxNext = document.querySelector(".lightbox_next");

    lightboxClose.onclick = () => {
        closeLightbox();
    }

    lightboxPrevious.onclick = () => {
        displayPrevious(mediasList, currentMedia);
    }

    lightboxNext.onclick = () => {
        displayNext(mediasList, currentMedia);
    }

    document.addEventListener("keydown", (e) => {
        if(e.key === "ArrowLeft") {
            displayPrevious(mediasList, currentMedia);
        } else if(e.key === "ArrowRight") {
            displayNext(mediasList, currentMedia);
        } else if(e.key === "Escape") {
            closeLightbox();
        }
    })
}

function closeLightbox() {
    const lightboxContainer = document.querySelector(".lightbox_container");
    lightboxContainer.style.display = "none";
    lightboxContainer.children[0].remove();
    lightboxContainer.setAttribute("aria-hidden", "true");
}

function displayNext(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);
    if(index === mediasList.length - 1) {
        currentMedia = mediasList[0]
    }else{
        currentMedia = mediasList[index + 1]
    }

    lightboxContainer.innerHTML = "";

    lightboxDOM(currentMedia, index, mediasList)
}

function displayPrevious(mediasList, currentMedia) {
    const index = mediasList.findIndex((element) => element.id == currentMedia.id);
    if(index === 0) {
        currentMedia = mediasList[mediasList.length - 1]
    }else{
        currentMedia = mediasList[index - 1]
    }

    lightboxContainer.innerHTML = "";

    lightboxDOM(currentMedia, index, mediasList)
}