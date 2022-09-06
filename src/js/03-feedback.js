
import throttle from 'lodash.throttle';
const LOCAL_STORAGE_KEY = 'feedback-form-state';
const filterForm = document.querySelector('.feedback-form');


initForm();

filterForm.addEventListener('submit', event => {
  event.preventDefault();
  const formData = new FormData(filterForm);
  localStorage.clear(LOCAL_STORAGE_KEY);
  filterForm.reset();
  formData.forEach((value, name) => console.log(value, name));

});
function onFormChange() {
filterForm.addEventListener('input', event => {
    let userData = localStorage.getItem(LOCAL_STORAGE_KEY);
    userData = userData ? JSON.parse(userData) : {};
    userData[event.target.name] = event.target.value;
  
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(userData));
  });
}
filterForm.addEventListener('change', event => {
  let goFilters = localStorage.getItem(LOCAL_STORAGE_KEY);
  goFilters = goFilters ? JSON.parse(goFilters) : {};
  goFilters[event.target.name] = event.target.value;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(goFilters));
});

function initForm() {
  let goFilters = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (goFilters) {
    goFilters = JSON.parse(goFilters);
    Object.entries(goFilters).forEach(([name, value]) => {
      filterForm.elements[name].value = value;
    });
  }
}
filterForm.addEventListener('input', throttle (onFormChange, 500));