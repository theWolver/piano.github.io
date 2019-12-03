//проверяет с какого девайса зашёл пользователь и выставляет нужный css-блок для отображения гиперссылки
let viber_pk = $('#vb_pk');
let viber_mobile = $('#vb_mb');
window.onload = function()
{
    if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile|MeeGo|mini|Fennec|/i.test(navigator.userAgent))
    {
        // Take the user to a different screen here.
        viber_pk.css("display","none");
        viber_mobile.css("display","inline-block");
    }
    else
    {
        //desktop
        viber_pk.css("display","inline-block");
        viber_mobile.css("display","none");
    }
};
