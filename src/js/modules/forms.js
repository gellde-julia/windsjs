const forms = () => {

    const form = document.querySelectorAll('form'),
        inputs = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

//валидация номера телефона
    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
    
    const message = {
        loading: 'Loading...',
        success: 'Thank you!',
        failure: 'Something was wrong'
    };

    const postData = async (url, data) => { //async и await нужны, чтобы js дождался ответа от сервера
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });
    };
    
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();//чтобы при отправке данных страница не перезагружалась

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('assets/server.php', formData)
            .then(res => {
                statusMessage.textContent = message.success;
            })
            .catch(() => statusMessage.textContent = message.failure)
            .finally(() => {
                clearInputs();
                setTimeout( () => {
                    statusMessage.remove();
                }, 5000);
            });

        });
    });
};

export default forms;