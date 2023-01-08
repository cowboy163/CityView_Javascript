/*
 * Auther: Frank Jia
 * Title: city view
 * Date: 2022-09-6
 */

// 1. get all the dom elements to use for rendering
// 2. fetch pictures from backend
// 3. render them
let objs = {
    body: null,
    inputCity: null,
    btnSearch: null,
    carousel: null,
    prev: null,
    next: null,
    page: {
        cursor: 1,
        total: 1,
    }
}

let data = {
    client_id: null,
    access_key: 'cwyvC60VQ7X4lO3CWABSxOIXXKf9oluz3lrP5KJNjg4',
    get_url: 'https://api.unsplash.com/',
    background_index: 0,
}
const unsplashKey = "cwyvC60VQ7X4lO3CWABSxOIXXKf9oluz3lrP5KJNjg4"
// easy to find
objs.body = document.querySelector('body')
objs.inputCity = document.querySelector('.searchBar input')
objs.btnSearch = document.querySelector('.searchBar button')
objs.carousel = document.querySelector('.carousel .gallery')
objs.prev = objs.carousel.parentNode.querySelector(('.prev'))
objs.next = objs.carousel.parentNode.querySelector('.next')
// define api
data.client_id = 'client_id=' + data.access_key
const fetchData = () => {
    const newCity = objs.inputCity.value.trim().toLowerCase() || 'macbook'
    data.background_index = 0
    fetch(data.get_url + 'search/photos/?' + data.client_id + `&query=${newCity}&orientation=landscape&page=${objs.page.cursor}`)
        .then(response => response.json())
        .then(data => {
            //todo: render image carousel
            // console.log('data raw', data)
            // fault-tolerant processing, consider if the data doesn't exist
            renderImages(data.results)
            objs.page.total = data.total_pages
        })
}

const renderImages = (arrImages) => {
    // set background image with the new data got
    setBackground(arrImages[data.background_index])
    // create carousel
    createCarousel(arrImages)
    updateActive()
}

const createCarousel = (arrImages) => {
    let index = 0
    clearContent()
    arrImages.forEach(item => {
        let div = document.createElement('div')
        div.className = 'imgContainer'
        let img = item.urls.regular
        div.style.background =`url(${img}) no-repeat center center fixed`
        div.dataset.imgIndex = String(index++)
        div.style.animation = 'fade-in 1s forwards'
        div.style.animationDelay = `${0.1 * Number(index)}s`
        objs.carousel.appendChild(div)
        div.addEventListener('click', function() {
            setBackground(item)
            data.background_index = this.dataset.imgIndex
            updateActive()
        })
        div.addEventListener('mouseenter', e => {
            setBackground(item)
        })
        div.addEventListener('mouseleave', e => {
            setBackground(arrImages[data.background_index])
        })
    })
}

const updateActive = () => {
    let items = objs.carousel.children

    for(let i = 0; i < items.length; i++) {
       if(items[i].classList.contains('active')) {
           items[i].classList.remove('active')
       }
    }
    items[data.background_index].classList.add('active')
}

const setBackground = image => {
    const img = image.urls.full
    objs.body.style.background = `url(${img}) no-repeat center center fixed`
}

const cbKeyDown = e => {
    if(e.keyCode === 13) {
        fetchData()
    }
}

const cbArrowKeyDown = e => {
    if(e.key === 'ArrowLeft') {
        objs.prev.click()
    }
    if(e.key === 'ArrowRight') {
        objs.next.click()
    }
}

const clearContent = () => {
    objs.carousel.innerHTML = ''
}

const cbPrevClick = () => {
    if(objs.page.cursor > 1) {
        objs.page.cursor--
        fetchData()
    }
}

const cbNextClick = () => {
    if(objs.page.cursor < objs.page.total) {
        objs.page.cursor++
        fetchData()
    }
}
fetchData()
objs.btnSearch.addEventListener('click', fetchData)
objs.inputCity.addEventListener('keydown', cbKeyDown)
objs.prev.addEventListener('click', cbPrevClick)
objs.next.addEventListener('click', cbNextClick)
addEventListener('keydown', cbArrowKeyDown)

