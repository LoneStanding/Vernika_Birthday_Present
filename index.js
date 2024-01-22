import anime from './node_modules/animejs/lib/anime.es.js';

const wrapper = document.getElementById('size_grid');
const wrapper_back = document.getElementById('back');

let columns = Math.floor(document.body.clientWidth / 50),
    rows = Math.floor(document.body.clientHeight / 50),
    toggled = true;

const handleClick = index => {
    toggled = !toggled;

    wrapper_back.classList.toggle('toggled');

    anime({
        targets:'.tile',
        opacity: toggled ? 1 : 0,
        delay: anime.stagger(50, {
            grid: [columns, rows],
            from: index
        })
    })
}

const createTile = index => {
    const tile = document.createElement('div');
    tile.classList.add('tile');
    tile.onclick = e => handleClick(index);
    return tile;
}

const createTiles = quantity => {
    Array.from(Array(quantity)).map((tile, index) => {
        wrapper.appendChild(createTile(index));
    })
}

const createGrid = () => {
    const tile = document.querySelectorAll('.tile');

    tile.forEach(tile => {
        tile.remove();
    });

    columns = Math.floor(document.body.clientWidth / 50);
    rows = Math.floor(document.body.clientHeight / 50);

    wrapper.style.setProperty("--columns", columns);
    wrapper.style.setProperty("--rows", rows);
    
    createTiles(columns * rows);
}
createGrid();
window.onresize = () => createGrid();