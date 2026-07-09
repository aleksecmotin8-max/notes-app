let tasks = [];
let nextId = 1;
let currentFilter = 'all';

const all = document.createElement('div');
const initialDiv = document.createElement('div');
const changetDiv = document.createElement('div');

const input = document.createElement('input');
const buttonAdd = document.createElement('button');
const inputSearch = document.createElement('input');
const buttonAll = document.createElement('button');
const buttonActive = document.createElement('button');
const buttonCompleted = document.createElement('button');
const buttonClearComplited = document.createElement('button');
const pState = document.createElement('p');

buttonAdd.textContent = 'Add';
buttonAll.textContent = 'All';
buttonActive.textContent = 'Active';
buttonCompleted.textContent = 'completed';
buttonClearComplited.textContent = 'clear Complited';
all.classList.add('app');
initialDiv.classList.add('controls');
changetDiv.classList.add('tasls-list');

input.classList.add('input');
inputSearch.classList.add('input');

buttonAdd.classList.add('button');
buttonActive.classList.add('button');
buttonAll.classList.add('button');
buttonCompleted.classList.add('button');
buttonClearComplited.classList.add('button')
const startProgramRender = () => {
    document.body.appendChild(all);

    all.appendChild(initialDiv);
    all.appendChild(changetDiv);

    initialDiv.appendChild(input);
    initialDiv.appendChild(buttonAdd);
    initialDiv.appendChild(inputSearch);
    initialDiv.appendChild(buttonCompleted);
    initialDiv.appendChild(buttonAll);
    initialDiv.appendChild(buttonActive);
    initialDiv.appendChild(buttonClearComplited);
    initialDiv.appendChild(pState);
};
const setFilter = (filterName)=>{
    currentFilter = filterName;
    renderCurrentView();
    renderfilterButtons()
}
const renderfilterButtons = () =>{
    buttonActive.classList.remove('active-filter');
    buttonAll.classList.remove('active-filter');
    buttonCompleted.classList.remove('active-filter');
    if (currentFilter === 'all'){
        buttonAll.classList.add('active-filter');
    }
    if(currentFilter === 'active'){
        buttonActive.classList.add('active-filter');
    }
    if(currentFilter ==='completed'){
        buttonCompleted.classList.add('active-filter')
    }
}
const renderCounter = () => {
    let counter = tasks.reduce((acc, item) => {
        acc.all++;

        if (item.done === false) {
            acc.remainig++;
        } else {
            acc.completed++;
        }

        return acc;
    }, {
        all: 0,
        completed: 0,
        remainig: 0
    });

    pState.textContent =
        'all ' + counter.all +
        ' | complited ' + counter.completed +
        ' | remainig ' + counter.remainig;
};

const ClearComplitedTask = () => {
    tasks = tasks.filter((item) => {
        return item.done === false;
    });

    updateApp();
};

const updateApp = () => {
    tasksSave();
    renderCurrentView();
    renderCounter();
};

const removeTask = (currentTaskId) => {
    tasks = tasks.filter((item) => {
        return item.id !== currentTaskId;
    });

    updateApp();
};

const tasksSave = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('nextId', JSON.stringify(nextId));
};

const tasksLoad = () => {
    const getTask = localStorage.getItem('tasks');
    const getId = localStorage.getItem('nextId');

    if (getTask !== null) {
        const trueGetTask = JSON.parse(getTask);
        tasks = trueGetTask;
    }

    if (getId !== null) {
        const trueGetId = JSON.parse(getId);
        nextId = trueGetId;
    }
};

const addTask = () => {
    let normalInput = input.value.trim();

    if (normalInput !== '') {
        tasks.push({
            text: normalInput,
            done: false,
            id: nextId
        });

        nextId++;
        input.value = '';
        updateApp();
    }
};

const toggleTask = (currentTaskId) => {
    let findedObj = tasks.find((item) => {
        return item.id === currentTaskId;
    });

    if (findedObj === undefined) {
        return;
    } else {
        findedObj.done = !findedObj.done;
        updateApp();
    }
};

const renderCurrentView = () => {
    let query = inputSearch.value.toLowerCase();

    let filtered = tasks.filter((item) => {
        return item.text.toLowerCase().includes(query);
    });

    if (currentFilter === 'all') {
    }

    if (currentFilter === 'completed') {
        filtered = filtered.filter((item) => {
            return item.done === true;
        });
    }

    if (currentFilter === 'active') {
        filtered = filtered.filter((item) => {
            return item.done === false;
        });
    }

    renderTasks(filtered);
};

const renderTasks = (arr) => {
    changetDiv.innerHTML = '';

    arr.forEach((currentTask) => {
        const miniDiv = document.createElement('div');
        const p = document.createElement('p');
        const buttonRemove = document.createElement('button');
        const buttonDone = document.createElement('button');
        miniDiv.classList.add('task-card');
        p.classList.add('task-text')

        p.textContent = currentTask.text;

        if (currentTask.done) {
           miniDiv.classList.add('done-task');
        }

        buttonRemove.textContent = 'Remove';
        buttonDone.textContent = currentTask.done ? 'cancel' : 'done';

        buttonDone.addEventListener('click', () => {
            toggleTask(currentTask.id);
        });

        buttonRemove.addEventListener('click', () => {
            removeTask(currentTask.id);
        });

        miniDiv.appendChild(p);
        miniDiv.appendChild(buttonRemove);
        miniDiv.appendChild(buttonDone);
        changetDiv.appendChild(miniDiv);
    });
};

buttonAdd.addEventListener('click', () => {
    addTask();
});

input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

inputSearch.addEventListener('input', () => {
    renderCurrentView();
});

buttonAll.addEventListener('click', () => {
   setFilter('all')
});

buttonActive.addEventListener('click', () => {
   setFilter('active')
});

buttonCompleted.addEventListener('click', () => {
   setFilter('completed')
});

buttonClearComplited.addEventListener('click', () => {
    ClearComplitedTask();
});

tasksLoad();
startProgramRender();
renderCurrentView();
renderCounter();
renderfilterButtons();