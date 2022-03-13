
const NUM_CELLS = 4;
const IDS_ALL = [];
const GRID_OBJ = document.querySelector(".grid");
const HU = Math.trunc( Math.random()*360 / 20 ) *20;

document.documentElement.style.setProperty('--num-cells', NUM_CELLS);

for (let k = 0; k < NUM_CELLS*NUM_CELLS; k++) {
    IDS_ALL.push(k);

    let cell = document.createElement("div");
    cell.classList.add("cell");
    GRID_OBJ.append(cell);
}

createTile();
createTile();

function getAvailableIds() {

    let tiles = [...GRID_OBJ.querySelectorAll(".tile")];

    if (tiles.length == 0) return IDS_ALL.map(x => x);

    let busyIds = [];
    tiles.forEach(tile => {
        let i = tile.style.getPropertyValue('--i');
        let j = tile.style.getPropertyValue('--j');
        let index = parseInt(i) + parseInt(j)*NUM_CELLS;
        busyIds.push(index);
    });

    let availableIds = [];
    IDS_ALL.forEach(id => {
        if (!busyIds.includes(id)) availableIds.push(id);
    });

    return availableIds;
}

function createTile () {

    let availableIds = getAvailableIds();

    if (availableIds.length == 0) return;

    let id = Math.trunc( Math.random()*availableIds.length );
    let positionInGrig = availableIds[id];
    let i = positionInGrig % NUM_CELLS;
    let j = Math.trunc( positionInGrig / NUM_CELLS );
    
    let value;
    if (Math.random() < 0.2) value = 4;
    else value = 2;

    let color = ( Math.log2(value) - 1)*(20 - 80)/(11-1) + 80;
    let fontColor = color >= 50 ? 10 : 90;
    
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.setProperty('--i', i);
    tile.style.setProperty('--j', j);
    tile.style.setProperty('background-color', `hsl(${HU}, 50%, ${color}%)`);
    tile.style.setProperty('color', `hsl(${HU}, 50%, ${fontColor}%)`);
    tile.textContent = value;
    GRID_OBJ.append(tile);
}

document.addEventListener('keydown', (e) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
    moveTiles(e.key);
});

function moveTiles(key) {

    let tiles = [...GRID_OBJ.querySelectorAll(".tile")];
    if ( tiles.length == 0) return;

    let mainDir, seconDir, dir;

    if (key === "ArrowLeft") {
        mainDir = "j"; seconDir = "i"; dir =  1;
    } else if (key === "ArrowRight") {
        mainDir = "j"; seconDir = "i"; dir = -1;
    } else if (key === "ArrowUp") {
        mainDir = "i"; seconDir = "j"; dir =  1;
    } else if (key === "ArrowDown") {
        mainDir = "i"; seconDir = "j"; dir = -1;
    }

    for (let j = 0 ; j < NUM_CELLS ; j++) {
        let tilesInJ = tiles.filter(tile => parseInt( tile.style.getPropertyValue(`--${mainDir}`) ) == j );
        tilesInJ.sort((a,b) => {
            if (parseInt(a.style.getPropertyValue(`--${seconDir}`)) > parseInt(b.style.getPropertyValue(`--${seconDir}`))) return dir;
            if (parseInt(a.style.getPropertyValue(`--${seconDir}`)) < parseInt(b.style.getPropertyValue(`--${seconDir}`))) return -dir;
            return 0;
        });
        if (tilesInJ.length != 0) {

            let edgePosition;
            if (dir == -1) edgePosition = NUM_CELLS - 1;
            else edgePosition = 0;
            
            for (let i = 0 ; i < tilesInJ.length ; i++ ) {
                tilesInJ[i].style.setProperty(`--${seconDir}`, edgePosition);
                edgePosition += dir;
            }
        }
    }
}

