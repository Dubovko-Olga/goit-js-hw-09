
const STORAGE_KEY = 'feedback-form-state';


const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageTextarea = form.elements.message;


let formData = {
  email: '',
  message: '',
};

loadFormData();


form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});


form.addEventListener('submit', event => {
  event.preventDefault();

 
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('🚀 Form data submitted:', formData);


  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});


function loadFormData() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return;

  try {
    const parsed = JSON.parse(saved);
    if (parsed.email) {
      emailInput.value = parsed.email;
      formData.email = parsed.email;
    }
    if (parsed.message) {
      messageTextarea.value = parsed.message;
      formData.message = parsed.message;
    }
  } catch (error) {
    console.error('❌ Error loading form data:', error);
  }
}
