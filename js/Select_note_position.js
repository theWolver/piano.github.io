/**
 * Created by Wolverine on 06.06.2019.
 */
let image = document.getElementById("img");
image.addEventListener("click", calcImgClick, false);
function calcImgClick(e)
//document.getElementById('img').onclick = function(e)
{
    let my_notes_staff_admin=$('#notes_staff_admin');
    my_notes_staff_admin.css("left", 0); //обнуление left и top для блока notes_staff_admin, чтобы .position()
    my_notes_staff_admin.css("top", 0);  //корректно находил следущюее значение в 19 и 20 стр кода
    //определяем координаты (x,y) клика мышки по id=#img и сохраняем в LocalStorage
    let x = e.offsetX==undefined?e.layerX:e.offsetX;
    let y = e.offsetY==undefined?e.layerY:e.offsetY;
    note_staff_count++;
    //console.log(x +'-'+ y);

    my_note_position.set(note_staff_count,x+','+y);// добавить в массив одну пару "ключ-значение"
    localStorage.my_note_position = JSON.stringify(Array.from(my_note_position.entries())); //сериализовали объект в строку и записали его в хранилище.
    console.log(note_staff_count);
    console.log("my_note"+localStorage.my_note_position);
    for (let pair of my_note_position) {

        //НАДО ДОБАВИТЬ ПРОВЕРКУ НА ТО, КОГДА note_staff_count НЕ СОВПАДАЕТ С КОЛ-ВОМ ДОБАВЛЕННЫХ НОТ В localStorage.my_note_position
        //и выдать сообщение типо - координаты ноты не восприняты, повторите нажатие (счётчик при этом уменьшить на 1)
        console.log(pair.length);
        //console.log(`Ключ = ${pair[0]}, значение = ${pair[1]}`);
    }
    //после каждого нажатия визуализируем подсветкой область вокруг выбранной ноты
    //$('#notes_staff_admin').offset({top:y - document.getElementById('inner').scrollTop -37, left:x -7}); //хороший вариант,
    //учитывает прокрутку, но .offset() берёт от края окна, а не от родителя (div inner'a), поэтому нужно через .position()
    let my_left = my_notes_staff_admin.position().left+x-7;
    let my_top = my_notes_staff_admin.position().left+y-37;
    //alert(my_left+' & '+my_top);
    my_notes_staff_admin.css("left", my_left);
    my_notes_staff_admin.css("top", my_top);

    //http://jsfiddle.net/wzxkgedp/
}
//---------------------------------------------------------------------------------------------------------

let submit = document.getElementById("submit");
submit.addEventListener("click", showSubmitButtonClick, false);
function  showSubmitButtonClick()
//submit.onclick = function()
{
    alert("эта ф-ция не должна срабатывать при каждом нажатии на картинку! Работает только по Submit!!!");
    let objSel = document.getElementById("composition");
    let temp_arr="";
    if(objSel.value=="0") {
        let val = objSel.options[1].value;
        temp_arr = val.split(',');
    }
    else
        temp_arr = objSel.value.split(','); //разбиваем строку "id_composition,path_to_file" на 2 элемента массива по разделителю ","

    let id = temp_arr[0];//содержит id_composition
    let params = localStorage.my_note_position; // содержит массив координат всех нот
    let n = my_note_position.size; //к-во пар элементов в массиве
    alert(n);

    let img = document.getElementById("img");
    let img_width = img.clientWidth;
    let img_height = img.clientHeight;

    $.ajax({
        method: "GET",     //тип запроса: get,post либо head
        url: "Save_note_array.php", //url адрес файла обработчика
        data: {            //параметры запроса
            id: id,        //значение id_composition
            mass: params,  //массив координат нот из localStorage
            count: n,       //к-во нот в композиции
            my_width: img_width, //ширина видимой области окна
            my_height: img_height //высота видимой области окна
        },
        //response:'text',//тип возвращаемого ответа text либо xml
        success: function (data) {  //возвращаемый результат от сервера
            let authorization_msg = $('#authorization_msg');
            authorization_msg.css("display", "block");
            authorization_msg.html(data); //table_result
        },
        error: function (data) {
            $('#authorization_msg').html(data);
        }
    });
    my_note_position.clear(); //после занесения в базу координат нот для выбранной id_composition - очищаем массив.
    note_staff_count=0; //обнуляем счётчик кликов по #img
    localStorage.removeItem("my_note_position"); //удаляем ключ my_note_position из localStorage
}
//---------------------------------------------------------------------------------------------------------

let reset = document.getElementById("reset_button");
reset.addEventListener("click", showResetButtonClick, false);
function showResetButtonClick()
//reset.onclick = function()
{
    //сбрасываем весь прогресс тренировки (очистка localStorage и массива params в записи в таблице Training
    let my_arr="";      //очищаем массив
    note_staff_count=0; // обнуляем счётчик кликов по #img
    localStorage.removeItem("object"); //очищаем localStorage с ключём = object

    count=0; //очищаем счётчик для массива my_result1
    my_result1.length = 0; //очищаем от значений массив кодов сыгранных нот

    sendDataToTrainingArray(my_arr);
    //сброс текущей позиции #notes_staff в начальную (left=0, top=0)
    let my_notes_staff = $('#notes_staff');
    my_notes_staff.css('left', 0);
    my_notes_staff.css('top', 0);
    return my_result1;
}
//---------------------------------------------------------------------------------------------------------

let back = document.getElementById("back_button");
back.addEventListener("click", showBackButtonClick, false);
function showBackButtonClick()
//back.onclick = function()
{
    //если сыграна хотя бы одна нота
    if(count>1)
    {
        count--;
        my_result1.length--;

        let my_massive = JSON.stringify(my_result1);
/*---------
        my_massive = localStorage.object; //получаю текущий масссив кодов сыгранных нот из localStorage
        //удаляю из него последнюю ноту (парсинг строки с конца с удалением всех символов с конца включая 1-ю запятую)
        //console.log("my_massive= "+my_massive); //[61,61,57,61,55,461,51,51]
        let my_str_length = my_massive.length; //получаем длину строки массива кодов нот
        let last_comma = my_massive.lastIndexOf(","); //определяем последнее вхождение "," в строку
        last_comma = my_str_length - last_comma; //определяем сколько символов с конца до этой запятой
        my_massive = my_massive.slice(0, -last_comma) + "]"; //обрезаем последний код ноты + "," и добавляем "]"
        //my_massive=my_massive.substring(0, my_massive.length - last_comma); //аналогично slice
 ----------*/
        localStorage.setItem("object", my_massive);
        sendDataToTrainingArray(my_massive);

        //let my_result_note_code = code_result["array"]; // значение массива координат нот с Composition для визуализации сдвига #notes_staff
        //console.log("my_massive= " + my_result_note_code);

        //преобразуем данные из result[array] в координаты x,y
        convertCodeResultToXY(count-1); //тут count-1 потому что нумерация идёт с нуля
    }
    else
    {
       // count--; //уменьшаем на 1 кол-во нажатых нот, таким образом сдвигаясь по индексам массива на 1 влево
        localStorage.removeItem("object"); //очищаем localStorage с ключём = object
        let my_massive="";
        sendDataToTrainingArray(my_massive);
        count=0;
        my_result1.length = 0;
        //сброс текущей позиции #notes_staff в начальную (left=0, top=0)
        let my_notes_staff = $('#notes_staff');
        my_notes_staff.css('left', 0);
        my_notes_staff.css('top', 0);
    }
    return count;
}