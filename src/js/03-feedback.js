import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-message';
const refs ={
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('textarea'),
}

refs.form.addEventListener('submit', onFormSubmit);
refs.textarea.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea()
/*
- Зупиняємо поведінку по змовчуванню
- Забираємо повідомлення з хранилища
- очищуємо форму
*/
function onFormSubmit(event){
    event.preventDefault();
    console.log('відправляємо форму');

    event.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}

/*
- дістаємо значення поля
- зберігаємо його в хранилищі
- МОжно добавити throttle
*/
function onTextareaInput(event){
    const message = event.target.value;
    localStorage.setItem(STORAGE_KEY, message);
}


/*
- Получаем значения из хранилища
- если там что то было, обновляем DOM
*/
function populateTextarea() {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    if(savedMessage){
        console.log(savedMessage);
        refs.textarea.value = savedMessage;
    }
}
// форма локал сторейдж для всех инпутов 
const formData = {};
refs.form.addEventListener('input', event =>{
formData[event.target.name] = event.target.value;
console.log(formData);

})

