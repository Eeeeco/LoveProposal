let highestZ = 1;

class Paper {
    holdingPaper = false;
    mouseTouchX = 0;
    mouseTouchY = 0;
    mouseX = 0;
    mouseY = 0;
    prevMouseX = 0;
    prevMouseY = 0;
    velX = 0;
    velY = 0;
    rotation = Math.random() * 30 - 15;
    currentPaperX = 0;
    currentPaperY = 0;
    rotating = false;

    init(paper) {
        // Mouse move event for desktop
        document.addEventListener('mousemove', (e) => {
            if (!this.rotating) {
                this.mouseX = e.clientX;
                this.mouseY = e.clientY;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }
            const dirX = e.clientX - this.mouseTouchX;
            const dirY = e.clientY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }
            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        });

        // Mouse down event for desktop
        paper.addEventListener('mousedown', (e) => {
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;
            if (e.button === 0) {
                this.mouseTouchX = this.mouseX;
                this.mouseTouchY = this.mouseY;
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
            }
            if (e.button === 2) {
                this.rotating = true;
            }
        });

        // Mouse up event for desktop
        window.addEventListener('mouseup', () => {
            this.holdingPaper = false;
            this.rotating = false;
        });

        // Touch start event for mobile
        paper.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Prevent default touch actions (scrolling, zooming)
            if (this.holdingPaper) return;
            this.holdingPaper = true;
            paper.style.zIndex = highestZ;
            highestZ += 1;

            const touch = e.touches[0]; // Get the first touch point
            this.mouseTouchX = touch.clientX;
            this.mouseTouchY = touch.clientY;
            this.prevMouseX = touch.clientX;
            this.prevMouseY = touch.clientY;
        });

        // Touch move event for mobile
        paper.addEventListener('touchmove', (e) => {
            e.preventDefault(); // Prevent default touch actions (scrolling, zooming)
            if (!this.rotating) {
                const touch = e.touches[0];
                this.mouseX = touch.clientX;
                this.mouseY = touch.clientY;
                this.velX = this.mouseX - this.prevMouseX;
                this.velY = this.mouseY - this.prevMouseY;
            }
            const dirX = this.mouseX - this.mouseTouchX;
            const dirY = this.mouseY - this.mouseTouchY;
            const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
            const dirNormalizedX = dirX / dirLength;
            const dirNormalizedY = dirY / dirLength;
            const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
            let degrees = 180 * angle / Math.PI;
            degrees = (360 + Math.round(degrees)) % 360;
            if (this.rotating) {
                this.rotation = degrees;
            }
            if (this.holdingPaper) {
                if (!this.rotating) {
                    this.currentPaperX += this.velX;
                    this.currentPaperY += this.velY;
                }
                this.prevMouseX = this.mouseX;
                this.prevMouseY = this.mouseY;
                paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
            }
        });

        // Touch end event for mobile
        window.addEventListener('touchend', () => {
            this.holdingPaper = false;
            this.rotating = false;
        });
    }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
});

const noButton = document.getElementById("no-btn");
const yesButton = document.getElementById("yes-btn");
const popup = document.getElementById("popup");

noButton.addEventListener("mouseover", () => {
    noButton.style.position = "absolute";
    noButton.style.left = Math.random() * 80 + "vw";
    noButton.style.top = Math.random() * 80 + "vh";
});

yesButton.addEventListener("click", () => {
    popup.style.display = "block";
});

// Hide the popup initially
popup.style.display = "none";
