function mediasFactory(data) {
    const { photographerId, id, title, image, video } = data;

    function getMediaCardDOM() {
        const mediaArticle = document.createElement('article');
        mediaArticle.setAttribute("id", id);
        mediaArticle.className = "media_article";

        if("video" in data) {
            const videoElement = document.createElement('video');
            videoElement.setAttribute("controls", "");
            videoElement.setAttribute("tabindex", "0");
            videoElement.dataset.id = id;
            
            const videoFile = `assets/photographers/${photographerId}/${video}`;
            const sourceVideo = document.createElement('source');
            sourceVideo.setAttribute("src", videoFile);
            sourceVideo.setAttribute("type", "video/mp4");

            videoElement.appendChild(sourceVideo);
            mediaArticle.appendChild(videoElement);
        }else{
            const picture = `assets/photographers/${photographerId}/${image}`;
            const img = document.createElement('img');
            img.setAttribute("src", picture);
            img.setAttribute("alt", title);
            img.setAttribute("tabindex", "0");
            img.dataset.id = id;
            img.className = "media_img";
            mediaArticle.appendChild(img);
        }
    }
    return { getMediaCardDOM }
}