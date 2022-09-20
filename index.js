document.addEventListener('DOMContentLoaded', () => {
    // use fetch to reach out to the PokeAPI
    // we are using a paramter here with `limit`
    // notice how limit=150 is after the `?`
    fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
    // if this is successful it will resolve and be passed to a `.then()`
    // intake a `res` or response from the fetch and cahnge to JSON
    .then(res => res.json())
    // since the last `.then()` is returning the JSON we can console.log it to make sure we are getting back what we are looking for
    // after console.logging it and seeing the expected response, we can insert our onGetPokemonSuccess function to display the results of our fetch request on the page
    .then(onGetPokemonSuccess)
    // if this fails for whatever reason it will be rejected and passed to the `.catch()`
    // here the error is being passed 
    .catch(console.error)
})

// select the container we are going to be inserting the Pokemon into
const container = document.querySelector('#container')
// select the container for showing a single pokemon
const singlePokemon = document.querySelector('#single-pokemon')
// select the button to see all the Pokemon
const seeAllPokemon = document.querySelector('#see-all-pokemon')
// select the form
const form = document.querySelector('#form')

//create a function to handle the success of the `fetch` request
const onGetPokemonSuccess = (pokeArray) => {
    //loop over all Pokemon
    pokeArray.results.forEach(pokemon => {
        //create a `div` to house each Pokemon
        const pokeCard = document.createElement('div')
        // adding pokemon-card class
        pokeCard.classList.add('pokemon-card')
        // innerText to be the Pokemon's name
        pokeCard.innerText = pokemon.name
        // append all divs to the container
        container.appendChild(pokeCard)
        // ADDING IN THE BELOW TO SET UP FOR SHOWING A SINGLE POKEMON
        // set the url to a data attribute inside of this div using a setter method
        // data attribute needs to start with `data-*`
        pokeCard.setAttribute('data-url', pokemon.url)
        //add an event listener
        pokeCard.addEventListener('click', showPokemon)
    })
}

const showPokemon = (event) => {
    //getting the `data-url` that we set in our on success function
    const pokeURL = event.target.getAttribute('data-url')
    // making an API call
    fetch(pokeURL)
        // turn our response object into JSON
        .then(res => res.json())
        // console.logging the success / our response
        .then(onShowPokemonSuccess)
        // handle for failure
        .catch(console.error)
}

const onShowPokemonSuccess = (pokemon) => {
    // while there is something in the single-pokemon `div`
    while(singlePokemon.firstChild) {
        // remove it
        singlePokemon.removeChild(singlePokemon.firstChild)
    }
    // hide the container to change the view from all to one
    container.style.display = 'none'
    // create a `div` for the single pokemon
    const pokeDex = document.createElement('div')
    // add a class
    pokeDex.classList.add('single-pokemon')
    // craft some HTML with innerHTMl
    pokeDex.innerHTML= `<h1>${pokemon.name}</h1>
    <img src="${pokemon.sprites.front_default}" />`
    // add our new div (pokeDex) to the single-pokemon `div`
    singlePokemon.appendChild(pokeDex)
}


// create an event listener that gives the 'See all Pokemon' button functionality
seeAllPokemon.addEventListener('click', () => {
    //removing any single Pokemon that may be there
    while(singlePokemon.firstChild) {
        singlePokemon.removeChild(singlePokemon.firstChild)
    }
    // turning back on the display
    // notice how we don't have to make another API call
    container.style.display = 'flex'
})

// create an event listener on the form that listens for the submission
form.addEventListener('submit', event => {
    // prevent the default refresh
    // 99.9% of the time you will need to preent default behavior
    event.preventDefault()
    // since this is a sbumit event I can target each `input` using their `id`
    // here there is an `input` element in this form with an `id` of the `input`
    // you can refere to it and use dot notation to access the value
    const pokeNumber = input.value

    // make a fetch request for a single pokemon using the number submited in the form
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNumber}`)
    // if this is successful, turn it into json
        .then(res => res.json())
        // take that json and handle it
        // we will reuse our function that handles a single pokemon
        .then(onShowPokemonSuccess)
        .catch(console.error)
})