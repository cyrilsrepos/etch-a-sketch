console.log('Hello World!');

let DSP = document.getElementById('displayUnit');
let resolution = "8";
const widthUnit = getComputedStyle(document.documentElement).getPropertyValue('--displaySize');
const width = parseInt(widthUnit);

let set64 = document.getElementById('64');
let set256 = document.getElementById('256');
let set576 = document.getElementById('576');
let reset = document.getElementById('Clr');

// set64.addEventListener('click', () => {
//     removeAllChildren(DSP);
//     resolution = 8;
//     drawCells(8);
// })

let buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const key = event.target.getAttribute('data-btn');
        if (key==='clr') {
            removeAllChildren(DSP);
            buttonManager(0);
        } else {
            drawCells(parseInt(key));
        }
    });
});

function removeAllChildren(parent) {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// resolution = prompt('Input Resolution');
drawCells(resolution);

function buttonManager (n) {
    console.log(n);
    buttons.forEach(button => {
        let id = button.dataset.btn;
        if (n==id) {
            button.classList.add('active');
        }

        else {
            button.classList.remove('active');
        }
    });
}

function drawCells(resolution) {
    removeAllChildren(DSP);
    const cellDimension = width / resolution;
    
    buttonManager(resolution);

    for(i = 0; i < resolution; i++) {
        let cellRow = document.createElement('div');
        cellRow.id = 'cellRow';

        cellRow.style.height = `${cellDimension}rem`;
        DSP.appendChild(cellRow); 
    
        for(j = 0; j < resolution; j++) {
            let cell = document.createElement('div');
            cell.id = 'cell';
            cell.classList.add(`cell`);

            cell.style.height = `${cellDimension}rem`;
            cell.style.width = `${cellDimension}rem`;
            cellRow.appendChild(cell); 
        }
    }

    const cells = document.querySelectorAll('.cell');
    let isMouseDown = false;
    
    document.addEventListener('mousedown', () => {
        isMouseDown = true;
    });
    
    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
    
    cells.forEach(cell => {
        cell.style.backgroundColor = 'white';
        cell.addEventListener('mouseenter', () => {
            if (isMouseDown) {
                if (cell.style.backgroundColor === 'white') {
                    cell.style.backgroundColor = 'red';
                } else {
                    cell.style.backgroundColor = 'white';
                }
            }
        });
    
        cell.addEventListener('mousedown', () => {
            if (cell.style.backgroundColor === 'red') {
                cell.style.backgroundColor = 'white';
            } else {
                cell.style.backgroundColor = 'red';
            }
        });
    });

}



