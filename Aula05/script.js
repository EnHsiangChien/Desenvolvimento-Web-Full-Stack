const carouselImages = document.querySelector('.carousel-images')
const images = carouselImages.querySelectorAll('img') 
const prevButton = document.querySelector('.prev')
const nextButton = document.querySelector('.next')
let currentIndex = 0

function showImage(index){
    const offset = -index * 100
    carouselImages.style.transform = `translateX(${offset}%)`
}

prevButton.addEventListener('click', () =>{
    currentIndex = (currentIndex === 0) ? images.length -1 : currentIndex -1
    showImage(currentIndex)
})

nextButton.addEventListener('click', () =>{
    currentIndex = (currentIndex === images.length -1) ? 0 : currentIndex +1
    showImage(currentIndex)
})