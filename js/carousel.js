/*
 * Author: Frank Jia
 * Title: carousel
 * Date: 2022-08-30
 */

const imgs = [
    "https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220829-apple-watch-en.jpg",
    "https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220228-whs-pickup-en.jpg",
    "https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220829-macbook-en.jpg",
    "https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220822-home-relaxation-en1.jpg",
    "https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-hero-220829-backyard-en.jpg",
    "https://mobilecontent.costco.com/live/resource/img/ca-homepage/d-220829-1001-23-ASC-en.jpg",
]
const descs = [
    "Apple Watch",
    "Warehouse Pickup",
    "Apple MacBook",
    "Relax at Home",
    "Patio, Lawn & Garden",
    "Member-only Savings"
]
const data = {
    imgs,
    descs,
    index: 0,
    maxLength: imgs.length,
    timer: undefined
}
const objs = {
    img: document.querySelector('.carousel img'),
    btn: document.querySelector('.carousel .btnBar'),
    nextPage: document.querySelector('.carousel .next'),
    prevPage: document.querySelector('.carousel .prev'),
    btnArr: []
}

const render = index => {
    if(objs.btnArr) {
        objs.btnArr.forEach(item => item.className = '')
    }
    objs.img.src = data.imgs[index]
    objs.btnArr[index].className = 'active'
}

const cbBtnClick = e => {
    let index = data.descs.findIndex(value => value === e.target.innerText)
    render(index)
    data.index = index
}

const timerStart = () => {
    data.timer = setInterval(cbNextPage, 2 * 1000)
}

const cbTimerStop = () => {
    clearInterval(data.timer)
    data.timer = undefined
}

const cbNextPage = () => {
    data.index = data.index === data.maxLength - 1? 0 : data.index + 1
    render(data.index)
}
const cbPrevPage = () => {
    data.index = data.index === 0? data.maxLength - 1 : data.index - 1
    render(data.index)
}

const carousel = () => {
    data.imgs.forEach((item, index) => {
        let btn = document.createElement('button')
        btn.innerHTML = data.descs[index]
        objs.btn.appendChild(btn)
        objs.btnArr.push(btn)
    })
    render(data.index)
    objs.btn.addEventListener('click', cbBtnClick)
    objs.btn.parentElement.addEventListener('mouseenter', cbTimerStop)
    objs.btn.parentElement.addEventListener('mouseleave', timerStart)
    objs.nextPage.addEventListener('click', cbNextPage)
    objs.prevPage.addEventListener('click', cbPrevPage)
}


carousel()
timerStart()