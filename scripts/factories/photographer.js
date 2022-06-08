function photographerFactory(data) {
    const { id, portrait, name, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    //affichage de tous les photographes
    function getUserCardDOM() {
        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const cityCountry = document.createElement('span');
        cityCountry.textContent = city.concat(', ', country);
        const bio = document.createElement('p');
        bio.textContent = tagline;
        const cost = document.createElement('div');
        cost.setAttribute('class', 'prix');
        cost.textContent = price + '€ /jour';
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(cityCountry);
        article.appendChild(bio);
        article.appendChild(cost);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}