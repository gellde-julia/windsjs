const checkNumInputs = (selector) => {
    const numInputs = document.querySelectorAll(selector);

    //валидация полей в калькуляторе
    numInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
};

export default checkNumInputs;