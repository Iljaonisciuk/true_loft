/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:
 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду
 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, seconds * 1000);
    });
}
/* 11*/
/*
 Задание 2:
 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения
 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 2.2: Элементы полученного массива должны быть отсортированы по имени города
 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();

        xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        xhr.send();
        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                console.log('не пошло');
                reject('Загрузка не удалась');
            } else {
                let Towns = JSON.parse(xhr.responseText);
                Towns.sort(( x, y ) => {
                    if (x.name > y.name) {
                        return 1;
                    }
                    if (x.name < y.name) {
                        return -1;
                    }
                    return 0;
                });
                resolve(Towns);
            }
        })
    })
}

export {
    delayPromise,
    loadAndSortTowns
};