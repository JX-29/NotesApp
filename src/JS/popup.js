//код, отвечающий за появление и скрытие модального окна

'use strict'

document.addEventListener('DOMContentLoaded', () => {

    const popup = document.querySelector(".popup")
    const cross = document.querySelector(".popup__cross")
    const add = document.querySelector(".sidebar__add")

    function showPopup() {
        popup.classList.toggle('popup_active');
        add.classList.toggle('sidebar__add_active');
    }

    add.addEventListener('click', showPopup);
    cross.addEventListener('click', showPopup);
});