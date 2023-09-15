function deleteErrorNotification() {
    const array = ["username_error", "email_error", "password_error"];

    for (let index = 0; index < array.length; index++) {
        const error_check = document.querySelector(`.${array[index]}`);
        if (error_check) {
            error_check.classList.remove("tinUpIn");
            error_check.classList.remove("magictime");
            error_check.classList.add("error");
            error_check.classList.add("tinUpOut");
            setTimeout(() => {
                if (error_check.parentElement) {
                    error_check.parentElement.removeChild(error_check);
                }
            }, 1000); // Добавляем короткую задержку перед удалением
        }
    }
}


export default deleteErrorNotification;