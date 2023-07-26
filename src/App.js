import React, { useState, useEffect } from 'react';
import './App.css';

const projectList = [
    {
        name: "Commas Practice",
        link: "./all-projects/commas-practice/index.html",
        type: "Проект"
    },

    {
        name: "Conditionals. All-in-One",
        link: "./all-projects/conditionals/index.html",
        type: "Проект"
    },
        
    {
        name: "Conditionals Zero",
        link: "./all-projects/conditionals-zero/index.html",
        type: "Проект"
    },
    
    {
        name: "Conditionals Second. Practice",
        link: "./all-projects/conditionals-second/index.html",
        type: "Проект"
    },
    
    {
        name: "HTML. Tags Remover",
        link: "./all-projects/html-stripper/index.html",
        type: "Проект"
    },

    {
        name: "Idiomatic Expressions. Practice",
        link: "./all-projects/idiomatic-expressions/index.html",
        type: "Проект"
    },
    
    {
        name: "Line Breaker",
        link: "./all-projects/line-breaker/index.html",
        type: "Проект"
    },

    {
        name: "Mind Maps. List Style",
        link: "./all-projects/mind-maps-list/index.html",
        type: "Проект"
    },
    
    {
        name: "Diary",
        link: "./all-projects/my-diary/index.html",
        type: "Проект"
    },
    
    {
        name: "Notes",
        link: "./all-projects/notes/index.html",
        type: "Проект"
    },
    
    {
        name: "Present Perfect. Practice",
        link: "./all-projects/present-perfect-practice/index.html",
        type: "Проект"
    },
    
    {
        name: "Reader App",
        link: "./all-projects/reading-app/index.html",
        type: "Проект"
    },
    
    {
        name: "Regex. Practice",
        link: "./all-projects/regex-quiz/index.html",
        type: "Проект"
    },
    
    {
        name: "Russian Questions. Practice",
        link: "./all-projects/russian-questions/index.html",
        type: "Проект"
    },
    
    {
        name: "2/2",
        link: "./all-projects/schedule/index.html",
        type: "Проект"
    },
    
    {
        name: "To-Do App",
        link: "./all-projects/todo-app/index.html",
        type: "Проект"
    },
    
    {
        name: "Towns. Close Towns",
        link: "./all-projects/towns/index.html",
        type: "Проект"
    },
    
    {
        name: "Towns. Game",
        link: "./all-projects/towns-game/index.html",
        type: "Проект"
    },
    
    {
        name: "20%",
        link: "./all-projects/twenty-percents/index.html",
        type: "Проект"
    },
    
    {
        name: "Weather",
        link: "./all-projects/weather-finder/index.html",
        type: "Проект"
    },
    
    {
        name: "Days Distance",
        link: "./all-projects/days-distance/index.html",
        type: "Проект"
    },
    
    {
        name: "Future Perfect. Practice",
        link: "./all-projects/future-perfect-practice/index.html",
        type: "Проект"
    },
    
    {
        name: "Reminder",
        link: "./all-projects/reminder/index.html",
        type: "Проект"
    },
    
    {
        name: "Random Name Generator",
        link: "./all-projects/random-name/index.html",
        type: "Проект"
    },
    
    {
        name: "Health Timer",
        link: "./all-projects/health-timer/index.html",
        type: "Проект"
    },
    
    {
        name: "Time Training",
        link: "./all-projects/time-training/index.html",
        type: "Проект"
    },
    
    {
        name: "Info",
        link: "./all-projects/my-info/index.html",
        type: "Проект"
    },
    
    // Добавьте в этот список все свои проекты
].sort((a, b) => a.name.localeCompare(b.name));

const bookList = [
    {
        name: "Копирайтинг",
        link: "./all-books/copywriting.pdf",
        type: "Книга"
    },

    {
        name: "GPT",
        link: "./all-books/GPT.pdf",
        type: "Книга"
    },
    
    {
        name: "Кант",
        link: "./all-books/kant.pdf",
        type: "Книга"
    },
    
    {
        name: "Маркетинговые методы",
        link: "./all-books/marketing.pdf",
        type: "Книга"
    },

    {
        name: "Богатый Папа и Бедный Папа",
        link: "./all-books/rich-poor.pdf",
        type: "Книга"
    },

    {
        name: "CSS",
        link: "./all-books/secrets.pdf",
        type: "Книга"
    },
    
    {
        name: "Telegram-WhatsApp",
        link: "./all-books/telegram-whatsapp.pdf",
        type: "Книга"
    },
    
    {
        name: "UX",
        link: "./all-books/ux.pdf",
        type: "Книга"
    },

    {
        name: "CSS Дукетт",
        link: "./all-books/duckett.pdf",
        type: "Книга"
    },
    // Добавьте в этот список все свои книги
].sort((a, b) => a.name.localeCompare(b.name));

function splitIntoChunks(array, chunkSize) {
    let chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

function App() {
    const projectChunks = splitIntoChunks(projectList, 6);
    const bookChunks = splitIntoChunks(bookList, 3);

    const handleOnClick = (event, link) => {
        event.preventDefault();
        const randomX = Math.floor(Math.random() * 1000) - 500;  // Generate a random number between -500 and 500
        const randomY = Math.floor(Math.random() * 1000) - 500;  // Generate a random number between -500 and 500
        const flyAwayAnimation = `flyAway ${randomX}px ${randomY}px`;
        event.target.style.animationName = flyAwayAnimation;
        event.target.classList.add('flyAway');
        setTimeout(() => {
            window.open(link, '_blank');
            event.target.classList.remove('flyAway');
        }, 1000);  // 1000 is the duration of the animation in milliseconds
    }
    
        // This function will create a dictionary where key is the first letter of project name, and value is an array of projects starting with that letter
    function getItemsByLetter(items) {
        let itemsByLetter = {}
        for (let item of items) {
            let firstLetter = item.name[0].toUpperCase()
            if (!itemsByLetter[firstLetter]) {
                itemsByLetter[firstLetter] = []
            }
            itemsByLetter[firstLetter].push(item)
        }
        return itemsByLetter
    }
    
    let projectsByLetter = getItemsByLetter(projectList);
    let booksByLetter = getItemsByLetter(bookList);
    
        const handleKeydown = (e) => {
        switch(e.keyCode) {
            case 38: // если нажата клавиша вверх
                handlePrevSlide();
                break;
            case 40: // если нажата клавиша вниз
                handleNextSlide();
                break;
            default:
                break;
        }
    };

    // Добавим состояние для индекса текущего слайда и общего количества слайдов
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = Object.keys(projectsByLetter).length;
    
    useEffect(() => {
        // При монтировании компонента добавляем слушатель
        window.addEventListener('keydown', handleKeydown);

        // При размонтировании компонента удаляем слушатель
        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    }, [currentIndex]); // Пересоздаём слушатель при каждом изменении currentIndex
    

    // Обработчики нажатия на стрелки
    const handleNextSlide = () => {
        if (currentIndex < totalSlides - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const projectSlides = Object.entries(projectsByLetter);
    const bookSlides = Object.entries(booksByLetter);


    return (
      <div className="app">
          <div className="projects-container">
              <h1>Проекты</h1>
              {projectSlides.slice(currentIndex, currentIndex + 1).map(([letter, projects]) => (
                  <div key={letter}>
                      <h2>{letter}</h2>
                      {projects.map((project, index) => (
                          <p key={index}>
                              <a 
                                  href={project.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  onClick={(event) => handleOnClick(event, project.link)}
                              >
                                  {project.name}
                              </a>
                          </p>
                      ))}
                  </div>
              ))}
          </div>
          <div className="books-container">
              <h1>Книги</h1>
              {bookSlides.slice(currentIndex, currentIndex + 1).map(([letter, books]) => (
                  <div key={letter}>
                      <h2>{letter}</h2>
                      {books.map((book, index) => (
                          <p key={index}>
                              <a 
                                  href={book.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  onClick={(event) => handleOnClick(event, book.link)}
                              >
                                  {book.name}
                              </a>
                          </p>
                      ))}
                  </div>
              ))}
          </div>
      </div>
    );
}

export default App;
