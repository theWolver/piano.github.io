/**
 * Created by Wolverine on 17.09.2019.
 */
// Изменяет viewBox svg-картинки согласно выбору из select
shape = document.getElementsByTagName("svg")[0];  //для изменения viewBox
let sel = document.getElementById("octave");      //наш select
let piano_item = $('.piano-item');
sel.onchange = function ()
{
    let sel_value = this.options[this.selectedIndex].value; //value select'a
    if(sel_value==1){
        shape.setAttribute("viewBox", "1129 50 335 750");
        shape.setAttribute("preserveAspectRatio", "none");
    }
    else if(sel_value==2){
        shape.setAttribute("viewBox", "799 50 992 350");
    }
    else if(sel_value==3)
    {
        shape.setAttribute("viewBox", "0 0 2525 700");
    }
    else if(sel_value==4)
    {
        shape.setAttribute("viewBox", "790 50 350 350");
    }
    else if(sel_value==5)
    {
        shape.setAttribute("viewBox", "1460 50 350 350");
    }

};
// Изменение цвета polygon когда мышка над названием клавиши.
piano_item.hover(
    function(){
        $('.piano polygon[data-id=' + $(this).data('id') + ']').attr('id', 'hover');
    },
    function(){
        $('.piano polygon[data-id=' + $(this).data('id') + ']').attr('id', '');
    }
);

// Клик по названию клавиши - открывается подсказка.
piano_item.on('click', function()
{
    $('.piano-popup').hide();
    $('.piano polygon').attr('class', '');

    let popup = $(this).find('.piano-popup');
    $(popup).css('top', '-' + ($(popup).outerHeight(true) + 15) + 'px');
    $(popup).css('left', '-' + (($(popup).outerWidth(true) / 2) - ($(this).outerWidth(true) / 2)) + 'px');
    $('.piano polygon[data-id=' + $(this).data('id') + ']').attr('class', 'active');
    $(popup).show();
});

// Клик по полигону клавиши - также открывается подсказка.
$('.piano polygon').click(function()
{
    $('.piano-popup').hide();
    $('.piano-item[data-id=' + $(this).data('id') + ']').trigger('click');
});

// Клик вне клавиш все закрывает.
$("body").click(function(e)
{
    if ($(e.target).closest(".piano polygon, .piano-item").length == 0)  //Метод Element.closest() возвращает ближайший родительский элемент
    {
        $(".piano-popup").hide();
        $('.piano polygon').attr('class', '');
    }
});

// Клик по text вызывает звучание ноты и подкраску полигона в lime (нужно, чтобы компенсировать отсутствие звучания при нажатии с help).
$("text").click(function()
{
    $('.piano polygon[data-id=' + $(this).closest(".piano polygon, .piano-item").data('id') + ']').click();
    $('.piano polygon[data-id=' + $(this).closest(".piano polygon, .piano-item").data('id') + ']').attr('id', 'active');
});

// Клик по полигону вызывает звучание ноты.
//-----преобразование строки кодов нот из прошлой тренировки в массив my_result1----
getMyResult1(localStorage.getItem('user_array')); //let my_str = localStorage.getItem('user_array');
function getMyResult1(my_str)
{
    my_result1.length = 0; //очищаем массив
    count = localStorage.getItem('user_array_size');//0;
    let j = 0;
    let temp_str = "";
    for (let i = 0; i < localStorage.getItem('user_array').length; i++) {
        if (my_str[i] != ',')
            temp_str = temp_str + my_str[i];
        else {
            my_result1[j] = parseInt(temp_str);
            j++;
            temp_str = "";
        }
    }
    my_result1[j] = parseInt(temp_str); //для последнего числа из user_array (цикл его не захватывает)
}
//-------------------------------------
window.onload = function()
{
    //делаем display:block для notes_staff, чтобы при первом запуске корректно отобразить его координаты
    // (без этого действия #img.Height будет меньше на высоту блока notes_staff)
    if(my_roots!=1) //если не админ
    {
        let my_notes_staff = $('#notes_staff');
        my_notes_staff.css("display", "block");
    }
    //получаю значения id_composition
    let objSel = document.getElementById("composition");
    let temp_arr = objSel.value.split(','); //разбиваем строку "id_composition,path_to_file" на 2 элемента массива по разделителю ","
    objSelValue1 = temp_arr[0]; //содержит id_composition
    //если пользователь не трогал <select> с выбором композиций, то по умолчанию играется 1-я - id_composition=1
    if (objSelValue1 == 0)
        objSelValue1 = 1;
    code_result = getArrayComposition(objSelValue1);
    return objSelValue1;
};
//---------------------------------------
function SendGet($params, $mus)
{
    if (my_roots != 1) //если не админ
    {
        let areas = document.getElementById('result');
        areas.innerHTML = $params;//====> передаёт код ноты
        my_result1[count] = $params;
        count++;
        /*                           var my_table = document.getElementsByClassName('.table_result');
         my_table.innerHTML=count;
         my_table.innerHTML=my_result;*/
        /*--------------------Временно закомментим вывод данных в таблицу  table_result-------------------
         // Создаём таблицу.
         let table = document.createElement('table');
         // Применяем CSS для таблицы
         table.setAttribute('class', 'article');
         // Вставить новую строку для таблицы с индексом '0'
         let row1 = table.insertRow(0);
         // Вставляем новый столбец для Row1 с индексом '0'
         let row1col1 = row1.insertCell(0);
         row1col1.innerHTML = count;
         // Вставить новый столбец для Row1 по индексу '1'
         let row1col2 = row1.insertCell(1);
         row1col2.innerHTML = $params;
         // Добавляем таблицу в div
         let div = document.getElementById('table_result');
         div.appendChild(table);*/
        // Сериализуем его
        let myMap = JSON.stringify(my_result1);
        // После этого my_result1 принимает строковое значение {"1":"34",...}
        // Запишем в localStorage с ключём object
        localStorage.setItem("object", myMap);
        sendDataToTrainingArray(localStorage.object);

        //---------визуализация div'a notes_staff.-------------
        getMyArray1(code_result["array"], code_result["title"], "array_composition_size" + objSelValue1); //записываем в localStorage значение user_array
        convertCodeResultToXY(my_result1.length-1);  //преобразуем данные из result[array] в координаты x,y
    }
    //озвучивание нажатой ноты
    let music = document.getElementById('player');
    music.src = $mus;
    music.play();
}
