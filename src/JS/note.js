//Код отвечающий за добавление новой заметки

'use strict'


    const list = document.querySelector('.sidebar__note-wrapper'); //Левое меню со всеми заметками

    const inputPopup = document.querySelector('.popup__input'); // Поле ввода во всплывающем окне
    const popup = document.querySelector('.popup'); // Всплывающее окно
    const colors = document.querySelector('.popup__colors'); //массив с цветными кругами во всплывающем окне

    const title = document.querySelector('.notes-details__title-wrapper') // Обертка с названием заметки и кнопкой редактирования
    const details = document.querySelector('.notes-details__items'); // запись в заметке
    const detailsAddBtn = document.querySelector('.notes-details__add'); // кнопка добавления новой записи
    const editTitleBtn = document.querySelector('.notes-details__edit-title'); //кнопка "редактировать"

    const editTitleWrapper = document.querySelector('.notes-details__title-edit-wrapper'); // обертка с названием заметки и кнопкой "редактировать"
    const inputTitleWrapper = document.querySelector('.notes-details__title-input-wrapper'); // обертка с полем ввода нового названия заметки и кнопками

    const cancelTitleBtn = document.querySelector('.notes-details__cancel'); // кнопка отмены нового названия заметки
    const editTitleForm = document.querySelector('.notes-details__title-input-wrapper'); // форма ввода нового названия заметки
    const inputTitle = document.querySelector('.notes-details__input'); // поле ввода для нового названия заметки

    const addDetailForm = document.querySelector('.notes-details__add-wrapper'); //
    const cancelDetailBtn = document.querySelector('.notes-details__cancel-detail'); //кнопка "отмена" для отмены добавления новой записи
    const inputDetail = document.querySelector('.notes-details__input-detail'); //поле ввода новой записи в заметке

    let selectedColor; // выбранный на текущий момент цвет (из списка цветных кругов во всплывающем окне)
    let currentNoteId = 0; // Id текущей заметки, отображаемой на главном экране и выделенной в боковом меню. По умолчанию вызывается заметка Tutorial
    let currentNoteDetails; // текущая

    //в этом массиве хранится объекты с информацией о заметках
    let noteList = {
        noteItems: [
            {Active: null,color: 'red', name: 'Tutorial', details: [
                    {checked: false, detailText: 'Click on "add note" to create empty note'},
                    {checked: false, detailText: 'Enter a name and select a color for the note'}
                ]},
            {Active: null, color: 'blue', name: 'Books', details: []},
            {Active: null, color: 'yellow', name: 'Shopping', details: []},
        ]
    }

    let notes = noteList.noteItems;

    //класс, создающий новую заметку, используя данные из массива
    class createNote {
        constructor(color, name, id, Active) {
            if (name.length > 15) {
                name = `${name.substring(0,15)}...`
            }
            this.color = color;
            this.name = name;
            this.id = id;
            this.Active = Active;
        }
        render() {
            list.innerHTML += `
                <li class="note ${this.Active}" id="${this.id}"><span class="note__mark ${this.color}">
                <i class="fas fa-circle"></i></span><span class="note__name">${this.name}</span>
                <span class="note__cross"><i class="fas fa-times"></i></span></li>
                `
        }
    }

    //класс, генерирующий заголовок из массива и окрашивающий его в выбранный цвет
    class createNoteTitle {

        constructor(name, color) {
            if (name.length > 25) {
                name = `${name.substring(0,25)}...`
            }
            this.name = name;
            this.color = color;
        }

        render() {
            title.innerHTML += `
            <h2 class="notes-details__title notes-details__title_${this.color}">${this.name}</h2>`
        }
    }

    class createNoteDetails {
        constructor(text, id) {
            this.text = text;
            this.id = id;
        }
        render() {
            details.innerHTML += `
                <li class="detail" id="${this.id}"><input type="checkbox" class="detail__input">
                    <div class="detail__content">${this.text}</div>
                    <div class="detail__remove"><i class="fas fa-times"></i></div>
                </li>
                        `
        }
    }

    //удаление всех предыдущих записей, создание нового списка заметок с учетом изменений в массиве. id задается согласно порядковому номеру элемента в массиве
    function createNotes(notes) {
        list.innerHTML = ``
        notes.forEach((item, i) => {
            item.id = i;
            if (item.id == currentNoteId) { // проверка активной по умолчанию записи. При запуске страницы активной является запись Tutorial
                item.Active = 'note_active'
            } else {
                item.Active = ''
            }
            new createNote(
                item.color ,
                item.name ,
                item.id,
                item.Active
            ).render();
        })
    }

    function createNotesDetailsPage(notes) {
        title.innerHTML = ``
        details.innerHTML = ``
        notes.forEach((item) => {
            if (item.id == currentNoteId){ // поиск нужного объекта по id
                new createNoteTitle(
                    item.name ,
                    item.color
                ).render();
            }
        })
        notes.forEach((item, i) => {
            if (item.id == currentNoteId){ // поиск нужного объекта по id
                if (item.details !== undefined) {
                    item.details.forEach((item, i) => { // получение деталей заметки из объекта
                        item.id =  i + 'D' //одинаковых индексов быть не может, поэтому для записей создается индекс с приставко D
                        new createNoteDetails(
                            item.detailText,
                            item.id
                        ).render();
                    })
                }
            }
        })
    }

    // удаление заметки из массива и списка. Использует id элемента чтобы найти и удалить его в массиве
    function removeNote(event) {
        if (event.target.parentNode.classList != 'note__cross') {
            return;
        }
        else {
            const currentNote = event.target.parentNode.parentNode;
            const nextNoteId = +currentNote.id + 1
            // console.log('current note is ' + currentNote.id)
            // console.log('next note is ' + nextNoteId)
            list.removeChild(currentNote);
            notes.splice(currentNote.id, 1)

            const nextNote = [notes.find((item, i, arr) => {
                console.log('current note is ' + item.id)
                console.log('next note is ' + nextNoteId)
                if (item.id == nextNoteId) {
                    console.log(item)
                    return item;
                }
            })];
            // console.log(nextNote)
        }
    };

    //выбор заметки, ее выделение, вывод на экран информации о ней
    function selectNote(event) {
        const currentNote = event.target.closest('.note');
        list.childNodes.forEach((note, i) => {
            if (note.id !== undefined) {
                note.classList.remove('note_active')
            }
        })
        if (currentNote) {
            currentNoteId = currentNote.id;
            currentNote.classList.add('note_active')
        }
    };

    function selectNextNote(NextNote) {
    const currentNote = event.target.closest('.note');
    list.childNodes.forEach((note, i) => {
        if (note.id !== undefined) {
            note.classList.remove('note_active')
        }
    })
    if (currentNote) {
        currentNoteId = currentNote.id;
        currentNote.classList.add('note_active')
    }
};

    //удаление записи из массива и списка
    function removeDetail(event) {
    if (event.target.parentNode.classList != 'detail__remove') {
        return;
    }
    else {
        const currentDetail = event.target.parentNode.parentNode;
        details.removeChild(currentDetail);
        notes.forEach((note, i) => {
            if (note.id == currentNoteId){ // поиск нужного объекта по id
                const currentNote = note;
                currentNote.details.forEach((detail,i) => {
                    let trueDetailId = currentDetail.id.replace(/D/g, ''); //расшифровка id. Соответствует номеру записи в массиве
                    console.log(trueDetailId)
                    currentNote.details.splice(trueDetailId.id, 1)
                })
            }
        })

    }
};

    function toggleTitleEditVisibility() { // скрытие названия, появление окна редактирования названия и наоборот
        editTitleWrapper.classList.toggle('notes-details__title-edit-wrapper_inactive');
        inputTitleWrapper.classList.toggle('notes-details__title-input-wrapper_inactive');
        notes.forEach((note) => {
            if (note.id == currentNoteId) {
                const oldName = note.name;
                inputTitle.value = oldName;
            }
        })
    };

    function toggleAddVisibility() { // скрытие кнопки добавления записи, появление окна редактирования записи и наоборот
        addDetailForm.classList.toggle('notes-details__add-wrapper_active');
        detailsAddBtn.classList.toggle('notes-details__add_active');
    };


    function addNote(event) {
        event.preventDefault()
        if (inputPopup.value === '') return alert('Необходимо ввести название заметки'); // проверка на наличие названия
        if (selectedColor === undefined) return alert('Необходимо выбрать цвет заметки'); // проверка на наличие цвета
        const currentName = inputPopup.value;
        const currentColor = selectedColor;
        notes.push({Active: false, color: currentColor, name: currentName, details: []})
        createNotes(notes)
        inputPopup.value = ''; //сброс информации после добавления заметки
    }

    function addDetail(event) {
        event.preventDefault()
        if (inputDetail.value === '') return false; // проверка на наличие названия
        const currentEnteredDetail = inputDetail.value;
        notes.forEach((note, i) => {
            if (note.id == currentNoteId) {
                console.log(i)
                currentNoteDetails = note.details
                currentNoteDetails.push({checked: false, detailText: currentEnteredDetail, id: 0})
            }
        })
        // currentNoteDetails.push({checked: false, detailText: currentDetail})
        createNotesDetailsPage(notes)
        inputDetail.value = ''; //сброс информации после добавления заметки
    }

    function changeName(event) {
        event.preventDefault()
        if (inputTitle.value === '') return false; // проверка на наличие названия
        const newName = inputTitle.value;
        notes.forEach((note) => {
            if (note.id == currentNoteId) {
                note.name = newName;
            }
        })
        createNotes(notes)
        createNotesDetailsPage(notes)
        inputTitle.value = ''; //сброс информации после добавления заметки
        toggleTitleEditVisibility()
    }

    createNotes(notes); //создание списка заметок из изначальной информации в массиве
    createNotesDetailsPage(notes);

    //временный костыль, пока не разберусь как повесить события на элементы с помощью цикла

    function selectColor(event) {
        colors.childNodes.forEach((color, i) => {
            if (color.classList !== undefined) {
                color.classList.remove('popup__color-round_active')
            }
        })
        event.target.classList.add('popup__color-round_active')
        selectedColor = event.target.id;
    };

    list.addEventListener('click', removeNote); //удаление заметок из массива и списка по клику
    list.addEventListener('click', selectNote); //пометка выбранной заметки
    list.addEventListener('click', () => createNotesDetailsPage(notes)); //открытие информации о выбранной заметке на главном экране
    details.addEventListener('click', removeDetail)

    detailsAddBtn.addEventListener('click', toggleAddVisibility) // вызов формы редактирования названия заметки
    cancelDetailBtn.addEventListener('click', toggleAddVisibility) // отмена редактирования названия заметки


    editTitleBtn.addEventListener('click', toggleTitleEditVisibility) // вызов формы создания новой записи
    cancelTitleBtn.addEventListener('click', toggleTitleEditVisibility) // отмена создания новой записи

    // ввод новой заметки во всплывающем оке
    popup.addEventListener('submit', () => addNote(event));
    addDetailForm.addEventListener('submit', () => addDetail(event));
    editTitleForm.addEventListener('submit', () => changeName(event));




