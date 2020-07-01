//Код отвечающий за добавление новой заметки

'use strict'


    const list = document.querySelector('.sidebar__note-wrapper');
    const input = document.querySelector('.popup__input');
    const popup = document.querySelector('.popup');
    const btn = document.querySelector('.popup__button');
    const color = document.querySelectorAll('.popup__color-round');

    const yellow = document.getElementById('yellow');
    const red = document.getElementById('red');
    const blue = document.getElementById('blue');
    const lightgreen = document.getElementById('lightgreen');
    const orange = document.getElementById('orange');
    const violate = document.getElementById('violate');
    const darkblue = document.getElementById('darkblue');
    const pink = document.getElementById('pink');
    let selectedColor;

    //в этом массиве хранится объекты с информацией о заметках
    let noteList = {
        noteItems: [
            {color: 'red', name: 'Tutorial'},
            {color: 'blue', name: 'Books'},
            {color: 'yellow', name: 'Shopping'},
        ]
    }

    let notes = noteList.noteItems;

    //класс, создающий новую заметку, используя данные из массива
    class createNote {
        constructor(color, name, id) {
            this.color = color;
            this.name = name;
            this.id = id;
        }
        render() {

            list.innerHTML += `
                <li class="note" id=${this.id}><span class="note__mark ${this.color}"><i class="fas fa-circle"></i></span><span class="note__name">${this.name}</span><span class="note__cross"><i class="fas fa-times"></i></span></li>
                `
        }
    }

    //удаление всех предыдущих записей, создание нового списка заметок с учетом изменений в массиве. id задается согласно порядковому номеру элемента в массиве
    function createDefaultNotes(notes) {
        list.innerHTML = ``
        notes.forEach((item, i) => {
            item.id = i++
            new createNote(
                item.color ,
                item.name ,
                item.id
            ).render();
        })
    }

    // удаление заметки из массива и списка. Использует id элемента чтобы найти и удалить его в массиве
    function removeNote(event) {
        if (!event.target.matches('.node__cross')) {
            const currentNote = event.target.parentNode.parentNode;
            list.removeChild(currentNote);
            console.log(currentNote.id)
            notes.splice(currentNote.id, 1)
        }
    };

    //временный костыль, пока не разберусь как повесить события на элементы с помощью цикла

    darkblue.addEventListener('click', function selectColor() {
        selectedColor = darkblue.id;
        console.log(selectedColor)
        return selectedColor;
    });
    pink.addEventListener('click', function selectColor() {
        selectedColor = pink.id;
        console.log(selectedColor)
        return selectedColor;
    });
    yellow.addEventListener('click', function selectColor() {
        selectedColor = yellow.id;
        console.log(selectedColor)
        return selectedColor;
    });
    red.addEventListener('click', function selectColor() {
        selectedColor = red.id;
        console.log(selectedColor)
        return selectedColor;
    });
    blue.addEventListener('click', function selectColor() {
        selectedColor = blue.id;
        console.log(selectedColor)
        return selectedColor;
    });
    lightgreen.addEventListener('click', function selectColor() {
        selectedColor = lightgreen.id;
        console.log(selectedColor)
        return selectedColor;
    });
    orange.addEventListener('click', function selectColor() {
        selectedColor = orange.id;
        console.log(selectedColor)
        return selectedColor;
    });
    violate.addEventListener('click', function selectColor() {
        selectedColor = violate.id;
        console.log(selectedColor)
        return selectedColor;
    });

    //цикл, вешающий обработчики событий на элементы (круги выбора цвета). Не рабочий, так как я не могу передать переменную selectedColor в функцию обработчика

    // function addListenerForColorRound(color, selectedColor) {
    //     color.forEach((colorRound, i) => {
    //         colorRound.addEventListener('click', (i) => {
    //                 selectedColor = colorRound.id;
    //                 console.log(selectedColor)
    //                 return selectedColor;
    //             });
    //     }, false);
    // }
    //
    // addListenerForColorRound(color, selectedColor)


    list.addEventListener('click', removeNote); //удаление заметок из массива и списка по клику
    //добавление новой заметки, имя берется из введенного значения, цвет получается из значения id элемента round

    popup.addEventListener('submit', function addNote(event) {
        event.preventDefault()
        if (input.value === '') return alert('Необходимо ввести название заметки');
        const currentName = input.value;
        const currentColor = selectedColor;
        notes.push({color: currentColor, name: currentName})
        createDefaultNotes(notes)
        input.value = '';
    });

    createDefaultNotes(notes) //создание списка заметок из изначальной информации в массиве



