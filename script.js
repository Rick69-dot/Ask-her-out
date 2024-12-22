function nextPage() {
    window.location.href = "yes.html";
    }
            
            function moveButton() {
    var button = document.getElementById('noButton');
    var container = document.querySelector('.container'); // Get the container element
    var buttonWidth = button.offsetWidth;
    var buttonHeight = button.offsetHeight;

    // Get the container's width and height
    var containerWidth = container.offsetWidth;
    var containerHeight = container.offsetHeight;

    // Ensure the button stays within the container's boundaries
    var x = Math.random() * (containerWidth - buttonWidth); // Keep button inside container width
    var y = Math.random() * (containerHeight - buttonHeight); // Keep button inside container height

    // Set the new position of the "No" button inside the container
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

const canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const TOTAL = 100
const petalArray = []

const petalImg = new Image()
petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png'
petalImg.addEventListener('load', () => {
  for (let i = 0; i < TOTAL; i++) {
    petalArray.push(new Petal())
  }
  render()
})

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  petalArray.forEach(petal => petal.animate())
  window.requestAnimationFrame(render)
}

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})

let mouseX = 0
function touchHandler(e) {
  mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth
}
window.addEventListener('mousemove', touchHandler)
window.addEventListener('touchmove', touchHandler)

// Petal class
class Petal {
  constructor() {
    this.x = Math.random() * canvas.width
    this.y = (Math.random() * canvas.height * 2) - canvas.height
    this.w = 25 + Math.random() * 15
    this.h = 20 + Math.random() * 10
    this.opacity = this.w / 40
    this.flip = Math.random()

    this.xSpeed = 1.5 + Math.random() * 2
    this.ySpeed = 1 + Math.random() * 1
    this.flipSpeed = Math.random() * 0.03
  }

  draw() {
    if (this.y > canvas.height || this.x > canvas.width) {
      this.x = -petalImg.width
      this.y = (Math.random() * canvas.height * 2) - canvas.height
      this.xSpeed = 1.5 + Math.random() * 2
      this.ySpeed = 1 + Math.random() * 1
      this.flip = Math.random()
    }
    ctx.globalAlpha = this.opacity
    ctx.drawImage(
      petalImg, 
      this.x, 
      this.y, 
      this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), 
      this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
    )
  }

  animate() {
    this.x += this.xSpeed + mouseX * 5
    this.y += this.ySpeed + mouseX * 2
    this.flip += this.flipSpeed
    this.draw()
  }
}
