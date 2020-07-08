const burger = document.querySelector('.burger'); // Поле ввода во всплывающем окне
const sidebar = document.querySelector('.sidebar');

    burger.addEventListener('click', () => {
        burger.classList.toggle('burger_active')
        sidebar.classList.toggle('sidebar_active')
    })