function photographerFactory(data) {
    const { id, portrait, name, city, country, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    //affichage de tous les photographes
    function getUserCardDOM() {
        const article = document.createElement('article');

        const ahref = document.createElement('a');
        ahref.setAttribute('class', 'link');
        ahref.setAttribute('aria-label', 'Show '+ name +' Profile');
        ahref.setAttribute('href', 'photographer.html?id=' + id);

        const divImgTitle = document.createElement('div');
        
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        
        const h2 = document.createElement('h2');
        h2.textContent = name;
        
        const cityCountry = document.createElement('h3');
        cityCountry.textContent = city.concat(', ', country);

        const bio = document.createElement('p');
        bio.textContent = tagline;
        
        const cost = document.createElement('span');
        cost.setAttribute('class', 'prix');
        cost.textContent = price + '€ /jour';

        article.append(ahref, cityCountry, bio, cost);
        ahref.appendChild(divImgTitle);
        divImgTitle.append(img, h2);
        divImgTitle.setAttribute('class', 'centerFlex');

        return (article);
    }
    return { getUserCardDOM }
}