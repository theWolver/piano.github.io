/**
 * Created by Wolverine on 17.09.2019.
 */
function sendDataToTrainingArray(params) {
    let user = document.getElementsByName('current_user')[0].value; //получаем значение $_SESSION['id'] из скрытого поля
    if(user!="")
    {
        //отправляем GET запрос и получаю ответ
        $.ajax({
            method: "GET",     //тип запроса: get,post либо head
            url: "server.php", //url адрес файла обработчика
            data: {            //параметры запроса
                id: params,    //массив нот из localStorage
                user: user,    //значение id_user
                composition: objSelValue1 //значение id_composition
            },
            //response:'text',//тип возвращаемого ответа text либо xml
            success: function (data) {  //возвращаемый результат от сервера
                //$('#table_result').html(data);
            },
            error: function (data) {
                $('#result').html(data);
            }
        });
    }
    else //если по какой-то причине пользователь не авторизован и нет $_SESSION['id'], то страница перенаправит его на Intro.html
    {
        $("#authorization_msg").css("display","block");
        setTimeout(go_Intro, 5000); //анимация длится 4 сек, таймер работает 5 и перенаправляет на Intro.html
        function go_Intro() {
            window.open('Intro.html',"_self");  //_self - открывает новый html в том же окне
        }
    }
}
