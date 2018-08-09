$(document).ready(function () {

    const generateId = namespace => `${namespace}-${Date.now()}-${Math.ceil(Math.random()*100)}`

    const createListString = name =>
        `<div class="mdl-card mdl-shadow--2dp" id="${generateId('list')}">
            <div class="mdl-card__title">
                <h2 class="mdl-card__title-text">${name}</h2>
            </div>
            <div class="mdl-card__supporting-text tasks">
            </div>
            <div class="mdl-card__actions mdl-card--border addTaskWrapper">
                <input class="mdl-textfield__input" type="text" name="sample" placeholder="Add task">
            </div>
            <div class="mdl-card__menu listHeader">
                <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                    <i class="material-icons">clear</i>
                </button>
            </div>`

    const createTaskItem = texto =>
        `<div class="task taskCard" id="${generateId('task')}">
            <div class="menuTask">
                <label class="mdl-button mdl-js-button mdl-button--icon">
                    <i class="material-icons">clear</i>
                </label>
                <input type="checkbox" name="check" value="true">
            </div>
            <div class="text" contenteditable="true">${texto}</div>
        </div>`

    const appendNewList = (value) => {
        // creamos el nodo .list
        let list = $(createListString(value));
        // añadimos el node al DOM si value no está vacío
        (value === '') ? console.log('Lista vacía'): $('.lists').append(list)
    }

    const appendNewTask = (event, value) => {
        //creamos el nodo .task
        let task = $(createTaskItem(value));

        //Acceder a la lista task y añadimos el node al DOM si el valor no está vacío
        (value === '') ? console.log('Tarea vacía'): $(event.target.parentNode.parentNode.querySelector('.tasks')).append(task);
    }


    // Listeners
    //Inserta Listas
    $(document).on('keyup', '.addListWrapper input', function (event) {
        if (event.keyCode === 13) {
            appendNewList(($(this).val()).trim());
            $(this).val('')
        }
    })

    //Borra Listas
    $(document).on('click', '.listHeader button', function (event) {
        let listNode = $(event.target.parentNode.parentNode.parentNode);
        listNode.detach();
    })

    //Inserta tareas
    $(document).on('keyup', '.addTaskWrapper input', function (event) {
        if (event.keyCode === 13) {
            appendNewTask(event, ($(this).val()).trim());
            $(this).val('');
        }
    })

    //Borra tareas
    $(document).on('click', '.tasks i', function (event) {
        let tasknode = $(event.target.parentNode.parentNode.parentNode);
        tasknode.detach();
    })
})