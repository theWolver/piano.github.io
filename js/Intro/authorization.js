/**
 * Created by Wolverine on 21.09.2019.
 */
function createAjaxAuthorizationForm(result_form, ajax_form, url, my_element) {
    let my_result_form = $('#result_form');
    $.ajax({
        url:     url,//"http://localhost:63342/test_php/module_global_sendAJAX.php", //url страницы (module_global_sendAJAX.php)
        type:     "GET", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize()+ '&' + my_element.name + '=' + my_element.value, // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            let result = $.parseJSON(response);  //тут не должно быть никаких echo с php, кроме ответа с result
            if("login" in result)
            {
                localStorage.removeItem("my_str");  //очищаем localStorage-переменную за ненадобностью перед уходом со страницы
                window.open('index_with_scheme.php',"_self");  //_self - открывает новый html в том же окне
            }
            else
            {
                let element = document.getElementById("result_form");
                element.classList.remove("run-animation");
                void element.offsetWidth;
                element.classList.add("run-animation");
                my_result_form.css("opacity","1");

                if("1" in result) {
                    my_result_form.html(result[1]);
                }
                if("2" in result) {
                    my_result_form.html(result[2]);
                }
                if("3" in result) {
                    my_result_form.html(result[3]);
                }
                my_result_form.css("margin-top","100px"); //восстанавливает прежний margin-top, если до этого был сдвиг на 460px в if
            }
            document.getElementById('login_form').reset();
        },
        error: function(response) { // Данные не отправлены
            console.log(response);
            my_result_form.html('Ошибка. Данные не отправлены.');
        }
    });
}
