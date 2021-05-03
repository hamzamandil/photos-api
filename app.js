const auth = '563492ad6f91700001000001df357319b37d4abc94f097985372a8dd'
const gallery = document.querySelector('.gallery')
const searchInput = document.querySelector('.search-input')
const form = document.querySelector('.search-form')
let searchValue
const more = document.querySelector('.more')
let page = 1
let fetchLink
let currentSearch

searchInput.addEventListener('input', updateInput)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    currentSearch = searchValue
    searchPhotos(searchValue)
})

more.addEventListener('click', loadMore)

function updateInput(e) {
    searchValue = e.target.value
}

async function curatedPhotos(){
    fetchLink = 'https://api.pexels.com/v1/curated?per_page=15&page=1'
    const dataFetch = await fetch(
        fetchLink, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth
            }
        }
    )
    const data = await dataFetch.json()
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `<div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}>`
        gallery.appendChild(galleryImg)
    });
}

async function searchPhotos(query) {
    gallery.innerHTML = ''
    searchInput.value = ''
    fetchLink = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`
    const dataFetch = await fetch(
        fetchLink, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth
            }
        }
    )
    const data = await dataFetch.json()
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `<div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}>`
        gallery.appendChild(galleryImg)
    });
}

async function loadMore(){
    page += 1
    if(currentSearch) {
        fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
    } else {
        fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=1${page}`
    }
    const dataFetch = await fetch(
        fetchLink, 
        {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: auth
            }
        }
    )
    const data = await dataFetch.json()
    data.photos.forEach(photo => {
        const galleryImg = document.createElement('div')
        galleryImg.classList.add('gallery-img')
        galleryImg.innerHTML = `<div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src=${photo.src.large}>`
        gallery.appendChild(galleryImg)
    });
}

curatedPhotos()