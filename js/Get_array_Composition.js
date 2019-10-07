/**
 * Created by Wolverine on 17.08.2019.
 */
let my_roots =  document.getElementsByName('current_roots')[0].value; //получаем значение $_SESSION['roots'] из скрытого поля
function getArrayComposition(objSelValue1)
{
//запрашиваю через AJAX координаты нот по array для данной композиции из таблицы Composition и сохраняем их в LocalStorage
    $.ajax({
        url: "Get_array_Composition.php", //url адрес файла обработчика
        type: "GET",     //тип запроса: get,post либо head
        data: {            //параметры запроса
            composition: objSelValue1 //значение id_composition
        },
        //response:'text',//тип возвращаемого ответа text либо xml
        //возвращаемый результат от сервера
        success: function (response){
            //if(objSelValue1==2)
            //    alert("qwe");
            code_result = JSON.parse(response);
            console.log(code_result);
            console.log(code_result["array"]);
            console.log(code_result["array"][0]);
            console.log(code_result["array"][1]);
            console.log(code_result["title"]);
            console.log(code_result["width"]);
            console.log(code_result["height"]);
            convertCodeResultToXY(my_result1.length-1); //-1 т.к. нумерация с нуля
            return code_result;
            },
        error: function (response) {
            $('#result').html(response);       //ТУТ ВОПРОС НАСЧЁТ НАЛИЧИЯ RETURN'A И ЧТО ВООБЩЕ БУДЕТ ВЫВОДИТЬ?
        }
    });
}

function convertCodeResultToXY(index)
{
    if(my_roots!=1) //если не админ
    {
        //преобразуем данные из code_result[array] в координаты x,y
        let img = document.getElementById("img");
        //let img_width = img.clientWidth;
        //alert("clientWidth= "+img_width);
        let my_width = code_result["width"]; //1116 - данные о clientWidth, с которыми записывались координаты клика мыши x,y
        let my_height = code_result["height"]; //1358 - данные о clientHeight -//-
        let my_notes_staff = $('#notes_staff');

        let rep = code_result["array"][index].replace(/"/g, ""); //добавил для очистки координат от лишних кавычек если они в формате "1,"x,y""

        let result_array_split = rep.split(','); //разбиваю по "," каждый элемент массива на составляющие коорд. x и y
        let x = parseInt(result_array_split[1] * img.clientWidth / my_width);   //0 - если передаём координаты вида "x,y", а не "1,"x,y""
        let y = parseInt(result_array_split[2] * img.clientHeight / my_height); //1
        //console.log(x +'-'+ y);
        my_notes_staff.css("display", "block");
        my_notes_staff.css("left", x - parseInt(7 * img.clientWidth / my_width)); //смещаем по x,y значение left/top прямоугольника #notes_staff на размер половины его width/height
        my_notes_staff.css("top", y - parseInt(37 * img.clientHeight / my_height));
        let xx = parseInt(15 * img.clientWidth / my_width);
        let yy = parseInt(75 * img.clientHeight / my_height);
        //alert(xx +'-'+ yy);
        my_notes_staff.css("width", xx);
        my_notes_staff.css("height", yy);
        //позволяет прокрутить #img до позиции высоты расположения #notes_staff
        /*let inner = $('#inner');
        inner.scrollTop(y-my_notes_staff.height());*/

        if(count==0) //если была выбрана другая картинка - сброс позиции блока notes_staff
        {
            my_notes_staff.css("left", 0);
            my_notes_staff.css("top", 0);
        }
    }
}

