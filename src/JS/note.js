//Код отвечающий за добавление новой заметки

'use strict'


    const list = document.querySelector('.sidebar__note-wrapper');
    const input = document.querySelector('.popup__input');
    const popup = document.querySelector('.popup');
    const btn = document.querySelector('.popup__button');
    const color = document.querySelectorAll('.popup__color-round');

    let noteList = {
        noteItems: [
            {color: 'red', name: 'Tutorial'},
            {color: 'blue', name: 'Books'},
            {color: 'yellow', name: 'Shopping'},
        ]
    }



    let notes = noteList.noteItems;






    // function addNote(event) {
    //     event.preventDefault()
    //     if (input.value === '') return alert('Необходимо ввести название заметки')
    //     color =
    //     new createNote()
    // };

    function selectColor() {
        const colorIs = color.classList.matches
        switch (color) {
            case colorIs('popup__color-round_darkblue'):
                alert('Пиздец');
                break;
        }
    }

    function removeNote(event) {
        if (!event.target.matches('.node__cross')) {
            const currentNote = event.target.parentNode.parentNode;
            list.removeChild(currentNote);
            console.log(currentNote.id)
            notes.splice(currentNote.id, 1)
        }
    };

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

    function createDefaultNotes(notes) {
        notes.forEach((item, i) => {
            item.id = i++
            new createNote(
                item.color ,
                item.name ,
                item.id
            ).render();
        })
    }

    createDefaultNotes(notes)
    // popup.addEventListener('submit', addNote);
    list.addEventListener('click', removeNote);
    color[1].addEventListener('click', selectColor);

