const addMovieModal=document.getElementById('add-modal')
const startAddMovieButton=document.getElementById('add-movie')
const backdrop=document.getElementById('backdrop');
const cancelAddMovieButton=addMovieModal.querySelector('button:first-of-type')
const confirmAddMovieButton=cancelAddMovieButton.nextElementSibling;
const userInputs=document.querySelectorAll('input')
const deleteMovieModal=document.getElementById('delete-modal')
const entryTextsection=document.getElementById('entry-text')
const toggleBackdrop=()=>{
    backdrop.classList.toggle('visible')
}

const movies=[]

const updateUi=()=>{
    if(movies.length===0){
        entryTextsection.style.display='block'
        entryTextsection.closest('main').style.display='block'
    }else{
        entryTextsection.style.display='none'
        entryTextsection.closest('main').style.backgroundColor='white'
    }
}

const clearMovieInputs=()=>{
    for(const input of userInputs){
        input.value='';
    }
}

const deleteMovieHandler=(movieId)=>{
    let movieIndex=0;
    for(const movie of movies){
        if(movie.id===movieId){
            break;
        }
    movieIndex++
    }
    movies.splice(movieIndex,1);
    const listRoot=document.getElementById('movie-list');
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    // deleteMovieModal.classList.remove('visible');
    updateUi();

}

const closeMovieDeletionModal=()=>{
    toggleBackdrop()
    deleteMovieModal.classList.remove('visible');
}

const startdeleteMovieHandler=(movieId)=>{

    deleteMovieModal.classList.add('visible');
    const cancelDeletionButton=deleteMovieModal.querySelector('.btn--passive');
    let confirmDeletionButton=deleteMovieModal.querySelector('.btn--danger');

    confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

    confirmDeletionButton=deleteMovieModal.querySelector('.btn--danger');

    cancelDeletionButton.removeEventListener('click',closeMovieDeletionModal)


    cancelDeletionButton.addEventListener('click',closeMovieDeletionModal)
    confirmDeletionButton.addEventListener('click',deleteMovieHandler.bind(null,movieId))
    toggleBackdrop();
    // deleteMovie(movieId)
}

const renderNewMovieElement=(id,title,imageUrl,rating)=>{
    const newMovieElement=document.createElement('li');
    newMovieElement.className='movie-element'
    newMovieElement.innerHTML=`
    <div class="movie-element__image">
     <img src="${imageUrl}" alt="${title}">
    </div>
     <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating}/5</p>
    </div>
    `;
    newMovieElement.addEventListener('click',startdeleteMovieHandler.bind(null,id))
    const listRoot=document.getElementById('movie-list');
    listRoot.append(newMovieElement)
}
const closeMovieModal=()=>{
    addMovieModal.classList.remove('visible');
}
const showMovieModal=()=>{
    addMovieModal.classList.add('visible');
    toggleBackdrop()
}

// const toggleMovieModal=()=>{
//     addMovieModal.classList.toggle('visible');
//     toggleBackdrop()
// }
const cancelAddMovieHandler=()=>{
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
}
const AddMovieHandler=()=>{
    const titleValue=userInputs[0].value;
    const imageUrlValue=userInputs[1].value;
    const ratingValue=userInputs[2].value;


    if(titleValue.trim()===''||imageUrlValue.trim()===''||ratingValue.trim()===''||ratingValue<1||ratingValue>5){
        return alert('Incorrect Data')
    }
    const newMovie={
        id:Math.random().toString(),
        title:titleValue,
        image:imageUrlValue,
        rating:ratingValue
    }
    movies.push(newMovie)
    console.log(movies)
    closeMovieModal()
    toggleBackdrop();
    clearMovieInputs()
    renderNewMovieElement(newMovie.id,newMovie.title,newMovie.image,newMovie.rating)
    updateUi()
}

const backdropClickHandler=()=>{
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
}

startAddMovieButton.addEventListener('click',showMovieModal);
backdrop.addEventListener('click',backdropClickHandler)
cancelAddMovieButton.addEventListener('click',cancelAddMovieHandler)
confirmAddMovieButton.addEventListener('click',AddMovieHandler)