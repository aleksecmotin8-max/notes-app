let state ={
    notes:[],
    statePage : 'field',
   currentNoteId : null
};
const app = document.querySelector('#app');
const createNote =(text,head)=>{
    let newNote = 
    {
        id:crypto.randomUUID(),
        text:text,
        head:head,
        favorite:false,
        pinned:false
    }
    state.notes.push(newNote);
}
const funkButtonPlus =()=>{
    state.statePage = 'add'
    renderStatePage()
}
const renderEditNotes = ()=>{
let findedObj = state.notes.find((item)=>{
    return item.id === state.currentNoteId
})
let editDiv = document.createElement('div');
let headingInput = document.createElement('input');
let textArea = document.createElement('textarea');

headingInput.value = findedObj.head;
textArea.textContent = findedObj.text;

let buttonEscape = document.createElement('button');

   buttonEscape.textContent = ' <- ' ;
   

 buttonEscape.addEventListener('click',()=>{
       state.statePage = 'field'
    let input = textArea.value.trim()
    if (input !== ''){
        createNote(input,headingInput.value)
    }
    renderStatePage()
   });
  editDiv.appendChild(buttonEscape);
  editDiv.appendChild(headingInput);
  editDiv.appendChild(textArea);
  editDiv.appendChild(headingInput);
  app.appendChild(editDiv);
};
const renderAddNotes = () => {
   let mainAddDiv = document.createElement('div');

   let headingInput = document.createElement('input')
   let textArea = document.createElement('textarea')

   let buttonEscape = document.createElement('button');

   buttonEscape.textContent = ' <- ' ;
   
   mainAddDiv.appendChild(headingInput)
   mainAddDiv.appendChild(textArea);
   mainAddDiv.appendChild(buttonEscape);
   app.appendChild(mainAddDiv);

   buttonEscape.addEventListener('click',()=>{
       state.statePage = 'field'
    let input = textArea.value.trim()
    if (input !== ''){
        createNote(input,headingInput.value)
    renderStatePage()
    }
   });
} 
    
const renderNotesField = ()=>{
    let mainFieldDiv = document.createElement('div');
    let divForMiniDiv = document.createElement('div')

    let buttonPlus = document.createElement('button');

    buttonPlus.textContent = ' + ';
    
    mainFieldDiv.appendChild(buttonPlus);
    app.appendChild(mainFieldDiv);

    state.notes.forEach((item)=>{
        const miniDiv = document.createElement('div');
        const heading = document.createElement('h3')
        const pText = document.createElement('p');
    
        heading.textContent = item.head.slice(0,100);
        pText.textContent = item.text.slice(0,20);
       
        miniDiv.appendChild(heading);
        miniDiv.appendChild(pText)
        divForMiniDiv.appendChild(miniDiv);
         app.appendChild(divForMiniDiv)

        miniDiv.addEventListener('click',()=>{
            state.statePage = 'edit';
            state.currentNoteId = item.id
           renderStatePage()

          });
        
     })

    buttonPlus.addEventListener('click',funkButtonPlus);
}
const renderStatePage = () =>{
        app.replaceChildren();
    if (state.statePage === 'field'){
        renderNotesField()
    }else if (state.statePage === 'edit'){
        renderEditNotes()
    }else if (state.statePage ==='add'){
        renderAddNotes()
 }
}
renderStatePage()