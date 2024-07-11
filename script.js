let data = "";
let finalData = [];
let offset = 0;
const main = document.querySelector("main");
const search = document.getElementById('searchbar');
const select = document.getElementById('filter');
const loadButton = document.getElementById('load');

async function getDataFromAPI(url) {
    const response = await fetch(url);
    const result = await response.json();
    return result;
}

async function loadData() {
    data = await getDataFromAPI("https://pokeapi.co/api/v2/pokemon?limit=20&offset=" + offset);
    console.log(data);
    offset += 20;  

    for (const obj of data.results) {
        const temp = await getDataFromAPI(obj.url);
        finalData.push(temp);
    }
    showData(finalData);
}

window.addEventListener("load", loadData);

loadButton.addEventListener("click", loadData);

function showData(pokemons) {
    main.innerHTML = "";

    pokemons.forEach(getData => {
        const flipcard = document.createElement("div");
        flipcard.classList.add("flip-card");

        const flipcardinner = document.createElement("div");
        flipcardinner.classList.add("flip-card-inner");

        const flipcardfront = document.createElement("div");
        flipcardfront.classList.add("flip-card-front");

        const flipcardback = document.createElement("div");
        flipcardback.classList.add("flip-card-back");

        const mydiv = document.createElement("div");
        mydiv.classList.add("parent");
        mydiv.classList.add(getData.name);
        mydiv.classList.add(getData.types[0].type.name);

        const id = document.createElement("span");
        id.innerHTML = "ID: " + getData.id;

        const type = document.createElement("p");
        type.innerHTML = "Type: " + getData.types[0].type.name;

        const name = document.createElement("h3");
        name.innerHTML = getData.name;

        const myimage = document.createElement("img");
        myimage.src = getData.sprites.other.dream_world.front_default;

        const backpara = document.createElement("p");
        backpara.innerHTML =
            "<span>Height:" + getData.height +
            "</span><br> <span>Weight:"
            + getData.weight +
            "</span><br> <span>HP:"
            + getData.stats[0].base_stat +
            "</span><br> <span>Attack:"
            + getData.stats[1].base_stat +
            "</span><br> <span>Defense:"
            + getData.stats[2].base_stat +
            "</span><br> <span>Special Attack:"
            + getData.stats[3].base_stat +
            "</span><br> <span>Special Defense:"
            + getData.stats[4].base_stat +
            "</span><br> <span>Speed:"
            + getData.stats[5].base_stat +
            "</span>"

        flipcardfront.append(myimage, name, id, type);
        flipcardback.append(backpara);

        flipcardinner.append(flipcardfront, flipcardback);
        flipcard.append(flipcardinner);
        mydiv.append(flipcard);
        main.append(mydiv);

        
    });
}

search.addEventListener('input', myfunction);
select.addEventListener('change', myfunction);

function myfunction() {
    const searchBar = search.value.toLowerCase();
    const selectBar = select.value;

    const filteredData = finalData.filter(getData => {
        const samename = getData.name.toLowerCase().includes(searchBar);
        const sametype = !selectBar || getData.types.some(info => info.type.name === selectBar);
        return samename && sametype;
    });

    showData(filteredData);
}