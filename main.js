const generateButton = document.getElementById('generateButton');
const refreshButton = document.getElementById('refreshButton');
const captchaSection = document.getElementById('captchaSection');
let currentCaptchaIndex = 0;
let currentCaptcha = null;
let generating = false; 


const captchaData = [
  { name: 'morning route', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fNNytWbWOc8ATCWLr7YrQrDLtcM7B5MUPw&s' },
  { name: 'hello sus', url: 'https://www.wikihow.com/images/thumb/6/60/Use-Google-Step-31-Version-2.jpg/-crop-342-184-246px-Use-Google-Step-31-Version-2.jpg.webp' },
  { name: 'trwkbc', url: 'https://media.licdn.com/dms/image/C4D12AQHbVR_yBPCqOQ/article-cover_image-shrink_600_2000/0/1609347993048?e=2147483647&v=beta&t=q7QCA7TVpcDyTAoA6od6h1pyMrNTAwnCbirCW4Y7ulk' },
  { name: 'sayhello', url: 'https://media.istockphoto.com/id/1143353612/photo/serious-young-caucasian-woman-showing-stop-gesture-with-her-hand.jpg?s=1024x1024&w=is&k=20&c=7oO8cT5sIxP9j7sEy9UzVSx0AW5uioMWclQKEk4B4dk=' },
  { name: 'tomms', url: 'https://edu.google.com/coursebuilder/courses/pswg/1.2/assets/notes/Lesson4.1/images/image06.png' }
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