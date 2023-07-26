const cityForm = document.getElementById('city-form');
const cityInput = document.getElementById('city-input');
const cityList = document.getElementById('city-list');
const clearListButton = document.getElementById('clear-list');

const answerForm = document.getElementById('answer-form');
const answerInput = document.getElementById('answer-input');
const currentCity = document.getElementById('current-city');
const scoreElement = document.getElementById('score');

const startGameButton = document.getElementById('start-game');
const endGameButton = document.getElementById('end-game');

let cities = [];
let currentCityIndex = 0;
let score = 0;
let correctCities = [];

cityForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const cityNames = cityInput.value.trim().split('\n');
    cityNames.forEach((cityName) => {
        cityName = cityName.trim();
        if (cityName) {
            cities.push(cityName);
            const listItem = document.createElement('li');
            listItem.textContent = cityName;
            cityList.appendChild(listItem);
        }
    });
    cityInput.value = '';
});

clearListButton.addEventListener('click', () => {
    cities = [];
    cityList.innerHTML = '';
});

answerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const answer = answerInput.value.trim();
    const cityIndex = cities.indexOf(answer);
    
    if (cityIndex !== -1) {
        // Город найден, увеличиваем счет
        score++;
        scoreElement.querySelector('span').textContent = score;

        // Добавляем город в список верно названных
        correctCities.push(answer);

        // Удаляем город из списка доступных городов
        cities.splice(cityIndex, 1);

        if (cities.length === 0) {
            endGame();
        }
    } else {
        // Город не найден, уменьшаем счет
        score--;
        scoreElement.querySelector('span').textContent = score;
    }
    answerInput.value = '';
});

startGameButton.addEventListener('click', () => {
    if (cities.length > 0) {
        cityList.style.display = 'none'; // Скрываем список городов
        currentCityIndex = 0;
        
        // Сброс стилей для зачеркнутых городов
        const cityListItems = cityList.querySelectorAll('li');
        cityListItems.forEach((item) => {
            item.classList.remove('correct');
        });

        // Восстановление списка городов
        cities = Array.from(cityListItems).map(item => item.textContent.trim());
    }
});


endGameButton.addEventListener('click', () => {
    endGame(true);
});

function endGame(forceEnd = false) {
    if (forceEnd) {
        alert('Игра принудительно завершена. Ваши очки обнуляются.');
        score = 0;
    } else {
        alert('Игра окончена! Ваш счет: ' + score);
    }
    scoreElement.querySelector('span').textContent = score;
    cityList.style.display = 'block'; // Показываем список городов после окончания игры

    // Сброс стилей для зачеркнутых городов
    const cityListItems = cityList.querySelectorAll('li');
    cityListItems.forEach((item) => {
        if (correctCities.includes(item.textContent.trim())) {
            item.classList.add('correct');
        } else {
            item.classList.remove('correct');
        }
    });
}



