/**
 * Created by Wolverine on 17.09.2019.
 */

let composition = document.getElementById('composition');
composition.addEventListener("change", setMyComposition, false);
//сохраняет в LocalStorage значение нот, сыгранных в прошлые разы для композиции текущим пользователем
function setMyComposition()
{
    //обнуляем значения массива из LocalStorage, который хранит данные с координатами кликов по #img пользователя с админ правами
    localStorage.removeItem("my_note_position"); //удаляем ключ my_note_position из localStorage
    my_note_position.clear(); //очищаем Map()
    note_staff_count = 0; //обнуляем счётчик нажатий на #img

    //меняю фон в соответствии с выбором композиции из <option>
    let objSel = document.getElementById("composition");
    let temp_arr = objSel.value.split(','); //разбиваем строку "id_composition,path_to_file" на 2 элемента массива по разделителю ","
    objSelValue1 = temp_arr[0]; //содержит id_composition
    let objSelValue2 = temp_arr[1]; //содержит path_to_file
    let objImg = $('#img');
    objImg.css("background","url("+objSelValue2+") no-repeat top center");
    objImg.css("background-size","contain");

    objSelValue1_array[1]=objSelValue1; //заменяем будущее в прошлом значение на текущее знач. картинки
    count=0;                  //очищаем счётчик для массива my_result1
    my_result1.length = 0;    //очистка массива с кодами сыгранных нот для предыдущей картинки

    //запрашиваю через AJAX данные по user_array для данной композиции из таблицы Training
    let user = document.getElementsByName('current_user')[0].value; //получаем значение $_SESSION['id'] из скрытого поля
    $.ajax({
        type: "GET",     //тип запроса: get,post либо head
        url: "Get_users_array.php", //url адрес файла обработчика
        data: {            //параметры запроса
            user: user,               //значение id_user
            composition: objSelValue1 //значение id_composition
        },
        //response:'text',//тип возвращаемого ответа text либо xml
        success: function (response){
            let result = JSON.parse(response); //возвращаемый результат от сервера
            getMyArray(result,"user_array","user_array_size"); //записываем в localStorage значение user_array
            getMyResult1(localStorage.getItem('user_array'));
            if(objSelValue1_array[0]!=objSelValue1_array[1])
            {
                code_result = getArrayComposition(objSelValue1);
                objSelValue1_array[0]=objSelValue1_array[1]; //новый выбор становится на первую позицию массива - текущий выбор картинки нот, а следующий выбор станет на 2-ю
            }
        },
        error: function (response) {
            $('#result').html(response);
        }
    });
    return objSelValue1;
}
