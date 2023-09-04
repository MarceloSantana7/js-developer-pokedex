function getPokemonModal(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    return fetch(url).then(response => {
        return response.json()
    }).then(resp => resp);
}

document.body.addEventListener('click', function (event) {
    // Verifica se o evento veio de um elemento com classe 'pokemon'
    if (event.target.matches('.pokemon')) {

        const pokemonId = event.target.getAttribute('data-id');

        const pokemon = async (pokemonId) => {
            return getPokemonModal(pokemonId)
        };

        pokemon(pokemonId).then(result => {
            document.querySelector(".modal-header img").setAttribute('src', result.sprites.other.home.front_default);
            document.querySelector(".modal .name").innerHTML = result.name;
            document.querySelector(".modal .number").innerHTML = result.id;
            
            console.log(result.types);
            let types = result.types.map( typeSlot => {
                return `<li class="type ${typeSlot.type.name}">${typeSlot.type.name}</li>`
            }).join('');
            console.log(types);
            document.querySelector(".modal .types").innerHTML = types;
        })


        const modal = document.querySelector(".modal");
        modal.classList.add('show');
    }

    if (event.target.matches('.modal button')) {
        const modal = document.querySelector(".modal");
        modal.classList.remove('show');
    }
});