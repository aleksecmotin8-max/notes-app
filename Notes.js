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
};
const deleteContextMenu = ()=>{
      const element = document.querySelector('#context-menu');
      if(element!==null){
      element.remove();}
};
const funkFieldMiniDiv =(arr,container)=>{
   arr.forEach((item)=>{
        const miniDiv = document.createElement('div');
        const heading = document.createElement('h3')
        const pText = document.createElement('p');
        
        heading.textContent = item.head.slice(0,100);
        pText.textContent = item.text.slice(0,20);
       
        miniDiv.appendChild(heading);
        miniDiv.appendChild(pText)
       container.appendChild(miniDiv);

        miniDiv.addEventListener('click',()=>{
            state.statePage = 'edit';
            state.currentNoteId = item.id
           renderStatePage()
          });
           miniDiv.addEventListener('contextmenu',(event)=>{
            event.preventDefault();
            event.stopPropagation();
            state.currentNoteId = item.id ;
            showContextMenu(event)
        });
        
     });
      
     app.appendChild(container);

}
const funkButtonSearch =()=>{
    state.statePage = 'search';
    renderStatePage()
}
const funkButtonPlus =()=>{
    state.statePage = 'add'
    renderStatePage()
}
const findById = (requiredId)=>{
      return  state.notes.find((item)=>{
        return item.id === requiredId
       });
}
const funkButtonDelete =(requiredId)=>{
       let findedObjIndex = state.notes.findIndex((item)=>{
        return item.id === requiredId
       })
       state.notes.splice(findedObjIndex,1);
    deleteContextMenu();
       renderStatePage();
};
const funkbuttonFavorite = (requiredId) =>{
       let findedObj =  findById(requiredId);
     findedObj.favorite = !findedObj.favorite;
     deleteContextMenu();
     renderStatePage()
}
const funkButtonPinned = (requiredId) =>{
       let findedObj =  findById(requiredId);
       findedObj.pinned = !findedObj.pinned;
      deleteContextMenu();
       renderStatePage()
}
const showContextMenu =(event)=>{
    deleteContextMenu();
   let requiredId = state.currentNoteId;

   let divContextMenu = document.createElement('div');
   divContextMenu.id='context-menu'
   
   let buttonDelete = document.createElement('button');
   let buttonPinned = document.createElement('button');
   let buttonFavorite = document.createElement('button');

   buttonDelete.textContent = 'Delete';
   buttonPinned.textContent = 'Pinned';
   buttonFavorite.textContent = 'Favorie'

    divContextMenu.style.position = 'fixed';
    divContextMenu.style.left = event.clientX + 'px';
    divContextMenu.style.top = event.clientY + 'px';

   buttonDelete.addEventListener('click',()=>funkButtonDelete(requiredId));
   buttonPinned.addEventListener('click',()=>funkButtonPinned(requiredId));
   buttonFavorite.addEventListener('click',()=>funkbuttonFavorite(requiredId));
   divContextMenu.addEventListener('click',(event)=>{
    event.stopPropagation();
   })
  
   

   divContextMenu.appendChild(buttonDelete);
   divContextMenu.appendChild(buttonFavorite);
   divContextMenu.appendChild(buttonPinned);
   document.body.appendChild(divContextMenu);

};

const renderSearchScreen = ()=>{
    let searchDiv = document.createElement('div');
    let searchDivForMiniDiv = document.createElement('div')

    let searchInput = document.createElement('input');

    let buttonCancel = document.createElement('button');

    buttonCancel.textContent = 'cancel';

     buttonCancel.addEventListener('click',()=>{

        state.statePage = 'field';
        renderStatePage();
        
    })

    searchDiv.appendChild(searchInput);
    searchDiv.appendChild(searchDivForMiniDiv);
    searchDiv.appendChild(buttonCancel);
   
    app.appendChild(searchDiv);

    searchInput.addEventListener('input',()=>{
       
        searchDivForMiniDiv.replaceChildren()

           let query =  searchInput.value.toLowerCase();
    let filteredNotes= state.notes.filter((item)=>{
        return item.text.toLowerCase().includes(query)
    });
   

   funkFieldMiniDiv(filteredNotes,searchDivForMiniDiv);
 
  
    })
   
 

}
   
const renderEditNotes = ()=>{
let findedObj = state.notes.find((item)=>{
    return item.id === state.currentNoteId
})
let editDiv = document.createElement('div');
let headingInput = document.createElement('input');
let textArea = document.createElement('textarea');

headingInput.value = findedObj.head;
textArea.value = findedObj.text;

let buttonEscape = document.createElement('button');

   buttonEscape.textContent = ' <- ' ;
   

 buttonEscape.addEventListener('click',()=>{
       state.statePage = 'field'
    let input = textArea.value.trim()
    if (input !== ''){
       findedObj.text = textArea.value;
       findedObj.head = headingInput.value 
    }
    renderStatePage()
   });
  editDiv.appendChild(buttonEscape);
  editDiv.appendChild(headingInput);
  editDiv.appendChild(textArea);
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
    let buttonSearch = document.createElement('button');

    buttonSearch.textContent = ' search '
    buttonPlus.textContent = ' + ';
    
    mainFieldDiv.appendChild(buttonSearch);
    mainFieldDiv.appendChild(buttonPlus);
    mainFieldDiv.appendChild(divForMiniDiv)
    app.appendChild(mainFieldDiv);

   funkFieldMiniDiv(state.notes,divForMiniDiv);

    buttonPlus.addEventListener('click',funkButtonPlus);
    buttonSearch.addEventListener('click',funkButtonSearch)
}
const renderStatePage = () =>{
        app.replaceChildren();
    if (state.statePage === 'field'){
        renderNotesField()
    }else if (state.statePage === 'edit'){
        renderEditNotes()
    }else if (state.statePage ==='add'){
        renderAddNotes()
 }else if (state.statePage==='search'){
    renderSearchScreen()
 }
}
document.addEventListener('contextmenu',(event)=>{
   event.preventDefault();
   deleteContextMenu();
   })
   
renderStatePage()   