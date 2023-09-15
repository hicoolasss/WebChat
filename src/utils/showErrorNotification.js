function showErrorNotfication(errorMessage, errorClassName) {
    const array = ["username_error", "email_error", "password_error"];

    for (let index = 0; index < array.length; index++) {
        const error_check = document.querySelector(`.${array[index]}`);
        if (error_check) {
            document.body.removeChild(error_check);
        }
    }

    const error_notification = document.createElement("div");
    const error_message = document.createTextNode(errorMessage);

    // Добавляем элемент на страницу
    document.body.appendChild(error_notification);

    // Добавляем класс "error" к элементу
    error_notification.classList.add(errorClassName);

    // После того, как элемент добавлен на страницу, добавляем классы анимации
    error_notification.classList.add('magictime', 'puffIn');

    error_notification.appendChild(error_message);
}

export default showErrorNotfication;