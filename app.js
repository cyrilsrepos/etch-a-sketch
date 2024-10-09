console.log('Hello World!');

let DSP = document.getElementById('displayUnit');
let resolution = "8"; // Default resolution
const widthUnit = getComputedStyle(document.documentElement).getPropertyValue('--displaySize');
const width = parseInt(widthUnit);

let buttons = document.querySelectorAll('.btn');

// Add event listeners to buttons
buttons.forEach(button => {
    button.addEventListener('click', (event) => {
        const key = event.target.getAttribute('data-btn');
        if (key === 'clr') {
            removeAllChildren(DSP);
            buttonManager(0);
        } else {
            drawCells(parseInt(key));
        }
    });
});

// Function to remove all children from a parent element
function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// Initial drawing of cells
drawCells(resolution);

// Function to manage button states
function buttonManager(n) {
    buttons.forEach(button => {
        let id = button.dataset.btn;
        if (n == id) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Function to draw cells based on resolution
function drawCells(resolution) {
    removeAllChildren(DSP);
    const cellDimension = width / resolution;

    buttonManager(resolution);

    for (let i = 0; i < resolution; i++) {
        let cellRow = document.createElement('div');
        cellRow.style.height = `${cellDimension}px`;
        DSP.appendChild(cellRow);

        for (let j = 0; j < resolution; j++) {
            let cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.height = `${cellDimension}px`;
            cell.style.width = `${cellDimension}px`;
            cellRow.appendChild(cell);
            
            // Initialize painting functionality for each cell
            initializeCellPainting(cell);
        }
    }
}

// Function to initialize painting functionality for a cell
function initializeCellPainting(cell) {
    let isMouseDown = false;

    // Mouse events
    cell.addEventListener('mousedown', () => toggleCellColor(cell));
    
    // Touch events
    cell.addEventListener('touchstart', (event) => {
        event.preventDefault(); // Prevent default touch behavior
        isMouseDown = true;
        toggleCellColor(cell); // Paint immediately on touch start
    });

    // Painting while mouse/touch is down
    cell.addEventListener('mouseenter', () => {
        if (isMouseDown) toggleCellColor(cell);
    });

    // Mouse and touch end events to stop painting
    document.addEventListener('mouseup', () => isMouseDown = false);
    document.addEventListener('touchend', () => isMouseDown = false);

    // Prevent scrolling while painting on mobile
    document.addEventListener('touchmove', (event) => {
        event.preventDefault();
        if (isMouseDown) toggleCellColor(cell);
    });
}

// Function to toggle the color of a cell
function toggleCellColor(cell) {
    if (cell.style.backgroundColor === 'white' || !cell.style.backgroundColor) {
        cell.style.backgroundColor = 'red';
    } else {
        cell.style.backgroundColor = 'white';
    }
}

// Set initial background color for cells
document.querySelectorAll('.cell').forEach(cell => {
    cell.style.backgroundColor = 'white';
});
