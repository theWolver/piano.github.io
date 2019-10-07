/**
 * Created by Wolverine on 21.09.2019.
 */
let my_login_page = document.getElementById('login_page'); //переменная для display = block/none div'a с id="login_page"
let form = document.getElementById('login_form'); //привязывает форму по id к переменной form, которая используется как параметр в onclick в <li>
function showBlockMenu(param, block, el, str)
{
    //если сработал вызов showBlockMenu и div'a не было, то
    if ((document.getElementById(param).style.display == 'none') || (document.getElementById(param).style.display == ""))
    {
        //если это login_page мы закидываем в localStorage идентификатор str формы и
        if (param == "login_page")
        {
            //el.classList.remove('formHidden');
            el.name = str;
            localStorage.setItem("my_str", str);
            let my_str = localStorage.getItem('my_str');
            //если str будет = 1, то это форма авторизации, и надо проверить существует ли сессия - проверяем это:
            if (my_str == 1) {
                $.ajax({
                    url: "check_session_id.php",
                    type: "GET",
                    dataType: "html",
                    success: function (response) {
                        let result = $.parseJSON(response);
                        if (result == 1)    //есди сессия есть и там есть id - открываем сразу файл index_with_scheme.php
                            window.open('index_with_scheme.php', "_self");
                        else                //иначе показываем div формы авторизации
                            my_login_page.style.display = 'block';
                    }
                });
            }
            else    //аналогично если str=2 - это div формы регистрации, его обязательно показываем
                my_login_page.style.display = 'block';
        }
        else        //если это не login_page - то обязательно показываем этот div
            document.getElementById(param).style.display = block;
    }
    else  //это срабатывает если блок уже был виден (display = block) - мы его скрываем по клику
        document.getElementById(param).style.display = 'none';
}

$( document ).ready(function() {
    $("#btn").click(
        function(){
            let my_str = localStorage.getItem('my_str');
            if (my_str == 1)
                createAjaxAuthorizationForm('result_form', 'login_form', 'module_global_sendAJAX.php', this); //авторизация
            if (my_str == 2)
                createAjaxRegistrationForm('result_form', 'login_form', 'intro_ajax_form.php'); //регистрация
            return false;
        }
    );
});