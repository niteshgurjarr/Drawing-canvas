const canvas = document.getElementById('canvas');
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas(); 

let isDrawing = false;

canvas.addEventListener("pointerdown", startDrawing);
canvas.addEventListener("pointerup", stopDrawing);
canvas.addEventListener("pointermove", draw);
canvas.addEventListener("pointerleave", stopDrawing);

function startDrawing(e) {
    isDrawing = true;
    ctx.beginPath();
    const rect = canvas.getBoundingClientRect();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
}

function draw(e) {
    if (!isDrawing) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.strokeStyle = colorPicker.value;
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
}

function stopDrawing(e) {
    isDrawing = false;
    ctx.beginPath();
}

const colorPicker = document.getElementById("colorPicker");
const brushSize = document.getElementById("brushSize");

const clearBtn = document.getElementById('clearBtn');

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

clearBtn.addEventListener('click', clearCanvas);

const downloadBtn = document.getElementById('downloadBtn');

function downloadImage() {
    const link = document.createElement('a');
    const fileName = fileNameInput.value.trim() || 'my-drawing';

    link.download = fileName + '.png';

    link.href = canvas.toDataURL('image/png');
    link.click();
}

downloadBtn.addEventListener('click', downloadImage);

const fileNameInput = document.getElementById('fileNameInput');

// Prevent touch gestures like scrolling or zooming on the canvas
// This is important for a smooth drawing experience on mobile devices

// When the user touches the canvas (starts drawing), prevent default behaviors
canvas.addEventListener('touchstart', e => e.preventDefault(), { passive: false });

// When the user moves their finger on the canvas, prevent the screen from scrolling
canvas.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

