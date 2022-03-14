
let startingX, startingY, endingX, endingY;
let moving = false;
function touchstart(evt) {
    startingX = evt.touches[0].clientX;
    startingY = evt.touches[0].clientY;
}
function touchmove(evt) {
    moving = true;
    endingX = evt.touches[0].clientX;
    endingY = evt.touches[0].clientY;
}
function touchend() {
    if (!moving || block) return;
    let touchDirection;
    if ( Math.abs(endingX - startingX) > Math.abs(endingY - startingY) ) {
        if ( endingX > startingX ) touchDirection = "ArrowRight";
        else touchDirection = "ArrowLeft";
    } else {
        if ( endingY > startingY ) touchDirection = "ArrowDown";
        else touchDirection = "ArrowUp";
    }
    handleInteraction(touchDirection);
    moving = false;
}