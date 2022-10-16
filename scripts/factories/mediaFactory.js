function mediasFactory(data) {
    const { photographerId, id, title, image, video, likes } = data;

    function getMediaCardDOM() {
        const mediaArticle = document.createElement('article');
        mediaArticle.setAttribute("id", id);
        mediaArticle.className = "media_article";

        if("video" in data) {
            const videoFile = `assets/photographers/${photographerId}/${video}`;

            const videoElement = document.createElement('video');
            videoElement.className = "media_video";
            videoElement.setAttribute("controls", "");
            videoElement.setAttribute("tabindex", "0");
            videoElement.dataset.id = id;

            const sourceVideo = document.createElement('source');
            sourceVideo.setAttribute("src", videoFile);
            sourceVideo.setAttribute("type", "video/mp4");

            mediaArticle.appendChild(videoElement);
            videoElement.appendChild(sourceVideo);
        }else{
            const picture = `assets/photographers/${photographerId}/${image}`;
            const img = document.createElement("img");
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            img.setAttribute("tabindex", "0");
            img.dataset.id = id;
            img.className = "media_img";
            mediaArticle.appendChild(img);
        }

        const mediaDescription = document.createElement('div');
        mediaDescription.className = "media_description";
        mediaArticle.appendChild(mediaDescription);
        const mediaText = document.createElement("h3");
        mediaText.textContent = title;
        mediaDescription.appendChild(mediaText);

        const mediaLikes = document.createElement("div");
        mediaLikes.className = "media_likes";
        mediaDescription.appendChild(mediaLikes);
        const span = document.createElement("span");
        span.textContent = likes;
        const icon = document.createElement("i");
        icon.className = "fa-regular fa-heart icon_heart";
        icon.setAttribute("tabindex", 0);
        icon.setAttribute("title", "Like icon");
        icon.setAttribute("role","button");
        mediaLikes.appendChild(span);
        mediaLikes.appendChild(icon);

        return mediaArticle;
    }
    return { getMediaCardDOM }
}