/**
 * Created by Wolverine on 21.09.2019.
 */

function createAjaxRegistrationForm(result_form, ajax_form, url) {
    let my_result_form = $('#result_form');
    $.ajax({
        url:     url, //url страницы (intro_ajax_form.php)
        type:     "GET", //метод отправки
        dataType: "html", //формат данных
        data: $("#"+ajax_form).serialize(),  // Сеарилизуем объект
        success: function(response) { //Данные отправлены успешно
            /**
             * @param result         информация про регистрацию
             * @param result.login   поле json-объекта, содержащее значение логина
             * @param result.pass    поле json-объекта, содержащее значение пароля
             */
            let result = $.parseJSON(response);  //тут не должно быть никаких echo с php, кроме ответа с result
            // document.getElementById('result_form').style.opacity = '1';
            let element = document.getElementById("result_form");
            element.classList.remove("run-animation");
            void element.offsetWidth;
            element.classList.add("run-animation");
            my_result_form.css("opacity","1");
            if("login" in result) {
                my_result_form.html('<b style="color: red">Поздравляем с регистрацией!</b><br/>Ваш логин:<b> ' + result.login + '</b> и пароль:<b> ' + result.pass + '</b>');
                $('#login_page').css("display","none");
                my_result_form.css("margin-top","460px"); //компенсирует display=none формы (width=360 + margin-top=100 = 460px)
            }
            else
            {
                if("1" in result)
                    my_result_form.html(result[1]);
                if("2" in result)
                    my_result_form.html(result[2]);
                //$('#result_form').css("animation", "cssAnimation 0s 2.5s forwards");
                my_result_form.css("margin-top","100px"); //восстанавливает прежний margin-top, если до этого был сдвиг на 460px в if
            }
            document.getElementById('login_form').reset();
        },
        error: function(response) { // Данные не отправлены
            console.log(response);
            $('#result_form').html('Ошибка. Данные не отправлены.');
        }
    });
}
