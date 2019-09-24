/**
 * Created by Wolverine on 21.09.2019.
 */
$(document).ready(function()
{
    let videobackground = new $.backgroundVideo($('body'),
        {
            "align": "centerXY",
            "width": 1280,
            "height": 720,
            "path": "media/",                      //папка с видео
            "filename": "floating_musical_notes",  //название файла видео
            "types": ["mp4"],         //форматы видео - ,"ogg","webm"
            "preload": true,                       //предзагрузка
            "autoplay": true,                      //автовоспроизведение
            "loop": true,                           //повтор
            "muted": "muted"                        //запуск видео без звука - в хроме запретили звук при autoplay'e, https://toster.ru/q/575884
        });
});
