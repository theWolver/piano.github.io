/**
 * Created by Wolverine on 05.07.2019.
 */
let exit = document.getElementById("exit");
exit.addEventListener("click", showIntro, false);
//exit.onclick = function()
function showIntro() {
    $.ajax({
        method: "GET",     //тип запроса: get,post либо head
        url: "out.php", //url адрес файла обработчика
       /* data: {            //параметры запроса
            id: id,        //значение id_composition
            mass: params,  //массив нот из localStorage
            count: n       //к-во нот в композиции
        },*/
        //response:'text',//тип возвращаемого ответа text либо xml
        success: function () {  //возвращаемый результат от сервера
           // $('#table_result').html(data);
            window.open('index.html',"_self");  //_self - открывает новый html в том же окне
        },
        error: function (data) {
            $('#result').html(data);
        }
    });
}

