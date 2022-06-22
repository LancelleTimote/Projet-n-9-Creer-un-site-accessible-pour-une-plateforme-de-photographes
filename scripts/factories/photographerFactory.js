function photographerFactory(data) {
    const { id, portrait, name, city, country, tagline, price } = data;
    const picture = `assets/photographers/photographers_profile_photo/${portrait}`;

    //affichage de tous les photographes
    function getUserCardDOM() {
        const article = document.createElement('article');

        const photographerLink = document.createElement('a');
        const photographerUrl = `photographer.html?id=${id}`;
        photographerLink.setAttribute("href", photographerUrl);

        const divImgTitle = document.createElement('div');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de " + name);
        
        const firstLastName = document.createElement('h2');
        firstLastName.textContent = name;
        
        const location = document.createElement('h3');
        location.textContent = city + ", " + country;

        const bio = document.createElement('p');
        bio.textContent = tagline;
        
        const cost = document.createElement('span');
        cost.setAttribute('class', 'prix');
        cost.textContent = price + '€ /jour';

        article.append(photographerLink, location, bio, cost);
        photographerLink.appendChild(divImgTitle);
        divImgTitle.append(img, firstLastName);
        divImgTitle.setAttribute('class', 'centerFlex');

        return (article);
    }

    function getPhotographerProfile() {
        const photographerProfile = document.querySelector(".photograph_header");
        const article = document.createElement("article");
        photographerProfile.prepend(article);

        const firstLastName = document.createElement('h1');
        firstLastName.textContent = name;

        const location = document.createElement('h2');
        location.textContent = city + ", " + country;

        const bio = document.createElement('p');
        bio.textContent = tagline;

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "Photo de " + name);

        article.append(firstLastName, location, bio)
        photographerProfile.append(img);

        return article;
    }

    return { picture, getUserCardDOM, getPhotographerProfile }
}