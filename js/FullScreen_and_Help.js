/**
 * Created by Wolverine on 17.09.2019.
 */
// переводит сайт в полноэкранный режим
let flag=0;
document.getElementById('button').addEventListener('click', function()
{
    if ((screenfull.enabled)&&(flag==0))
    {
        screenfull.request();
        flag=1;
    }
    else
    {
        screenfull.exit();
        flag=0;
    }
});
// отображает/скрывает подсказки-названия нот
let help=0;
document.getElementById('help').addEventListener('click', function()
{
    if (help==0)
    {
        $('.piano-item').css("display","block");
        help=1;
    }
    else
    {
        $('.piano-item').css("display","none");
        help=0;
    }
});
