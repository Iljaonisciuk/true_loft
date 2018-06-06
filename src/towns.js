/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.
 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 Разметку смотрите в файле towns-content.hbs
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
   */
    const homeworkContainer = document.querySelector('#homework-container');
    homeworkContainer.style = 'margin-left:45%;';
/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
    function loadTowns() {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
            xhr.responseType = 'json';
            xhr.addEventListener('load', () => {
                if (xhr.status >= 400) {
                    console.log(' не то');
                } else {
                    console.log('контент подьехал');
                    const towns = xhr.response;

                    towns.sort(function sortTowns(x, y) {
                        if (x.name < y.name) {
                            return -1;
                        }
                        if (x.name > y.name) {
                            return 1;
                        }
                        return 0;
                    });
                    resolve(towns);
                }
            });
            xhr.send();
        });
    }

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов
 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
   */
    function isMatching(full, chunk) {
        if (full.toLowerCase().indexOf(chunk.toLowerCase()) >= 0) {
            return true;
        }

        return false;
    }
    loadTowns().then(showInput);

    function showInput() {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';
    }

    function showTowns(textElem) {
        const kontent = document.createElement('div');
        kontent.textContent = textElem;
        filterResult.appendChild(kontent);
    }

    /* Блок с надписью "Загрузка" */
    const loadingBlock = homeworkContainer.querySelector('#loading-block');
    /* Блок с текстовым полем и результатом поиска */
    const filterBlock = homeworkContainer.querySelector('#filter-block');
    /* Текстовое поле для поиска по городам */
    const filterInput = homeworkContainer.querySelector('#filter-input');
    /* Блок с результатами поиска */
    const filterResult = homeworkContainer.querySelector('#filter-result');

    filterInput.addEventListener('keyup', function() {
        // это обработчик нажатия кливиш в текстовом поле
        for (let i = 0; i < filterResult.children.length; i++) {
            filterResult.removeChild(filterResult.children[i]);
            i--;
        }
        const str = filterInput.value;
        if (str != '') {
            loadTowns().then(towns => {
                for (const town in towns) {
                    if (isMatching(towns[town].name, str)) {
                        const newDiv = document.createElement('div');

                        newDiv.innerHTML = towns[town].name;
                        filterResult.appendChild(newDiv);
                    }
                }
            })
        }
    });
export {
    loadTowns,
    isMatching
};