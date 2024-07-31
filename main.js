const generateButton = document.getElementById('generateButton');
const refreshButton = document.getElementById('refreshButton');
const captchaSection = document.getElementById('captchaSection');
let currentCaptchaIndex = 0;
let currentCaptcha = null;
let generating = false; 


const captchaData = [
  { name: 'Country trieste', url: './NR1.png' },
  { name: 'descendeth petionT', url: './NR2.png' },
  { name: 'parnitt tumbling,', url: './NR3.png' },
  { name: 'seiza Ullrich.', url: './NR4.png' },
  { name: 'trieste mondern-day', url: './NR5.png' }
];

generateButton.addEventListener('click', function() {
  if (!generating) {
    generateCaptcha();
  } else {
    cancelGenerate();
  }
});

refreshButton.addEventListener('click', refreshCaptcha);

function generateCaptcha() {
  generating = true; 
  generateButton.textContent = 'Cancel'; 
  captchaSection.innerHTML = '';
  const captcha = createCaptchaElement(captchaData[currentCaptchaIndex]);
  captchaSection.appendChild(captcha);
  refreshButton.style.display = 'inline-block';
  currentCaptcha = captcha;
}

function cancelGenerate() {
  generating = false; 
  generateButton.textContent = 'Generate CAPTCHA'; 
  refreshButton.style.display = 'none'; 
  captchaSection.innerHTML = ''; 
}

function refreshCaptcha() {
  if (currentCaptcha) {
    currentCaptchaIndex = (currentCaptchaIndex + 1) % captchaData.length;
    const newCaptcha = createCaptchaElement(captchaData[currentCaptchaIndex]);
    captchaSection.replaceChild(newCaptcha, currentCaptcha);
    currentCaptcha = newCaptcha;
  }
}

function checkInput(imageName, userInput) {
  return userInput.trim().toLowerCase() === imageName.toLowerCase();
}

function createCaptchaElement(data) {
  const captcha = document.createElement('div');
  captcha.classList.add('captcha');

  const imageElement = document.createElement('img');
  imageElement.src = data.url; 
  imageElement.alt = data.name;

  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.placeholder = 'Type here';

  const confirmButton = document.createElement('button');
  confirmButton.textContent = 'Confirm';
  confirmButton.addEventListener('click', function() {
    const userInput = inputElement.value;
    if (checkInput(data.name, userInput)) {

      alert('CAPTCHA passed!');
      generateButton.textContent = 'Generate CAPTCHA'; 
      refreshButton.style.display = 'none'; 
      captchaSection.innerHTML = ''; 
      generating = false; 
    } else {
     
      captcha.classList.add('shake'); 
      setTimeout(() => captcha.classList.remove('shake'), 500);
    }
  });

  captcha.appendChild(imageElement);
  captcha.appendChild(document.createElement('br')); 
  captcha.appendChild(inputElement);
  captcha.appendChild(document.createElement('br')); 
  captcha.appendChild(confirmButton);

  return captcha;
}