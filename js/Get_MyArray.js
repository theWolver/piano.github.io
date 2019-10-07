/**
 * Created by Wolverine on 17.09.2019.
 */
    //localStorage.clear(); //ВРЕМЕННО ДЛЯ ТЕСТИРОВАНИЯ!!!
getMyArray(my_array,"user_array","user_array_size");
function getMyArray(my_array,name_array,array_size)
{
    let my_array_size;
    if(my_array=="") //если массив пустой - размер массива = 0.
        my_array_size=0;
    else
        my_array_size=1; //счётчик чисел в строке my_array, он на +1 больше чем запятых, потому =1
    let temp_array="";
    for (let i=0;i<my_array.length;i++)
    {
        if ((i != 0) && (i != my_array.length-1))
            temp_array=temp_array+my_array[i];
        if (my_array[i] == ',')
            my_array_size++;
    }
    my_array=temp_array;
    localStorage.setItem(name_array, my_array);
    localStorage.setItem(array_size, my_array_size);
}
function getMyArray1(my_array,name_array,array_size)
{
    let temp_array="";
    let my_array_size=my_array.length;
    for (let i=0;i<my_array_size;i++)
    {
        temp_array=temp_array+my_array[i]+",";
    }
    temp_array=temp_array.slice(0, -1); //удаляем лишнюю запятую в конце строки
    my_array=temp_array;
    localStorage.setItem(name_array, my_array);
    localStorage.setItem(array_size, my_array_size);
}
let my_note_position = new Map();// создание пустого ассоциативного массива js для координат нот - https://itchief.ru/javascript/associative-arrays
let note_staff_count = 0; //счётчик к-ва кликов пользователя с правами админа по #img при добавлении координат нот в базу
let code_result; //переменная для кодов нот из Composition (array)
let my_result1=[]; //массив для хранения кодов нот (стал глобал переменной, чтобы работало корректно очистка localStorage(object)
let objSelValue1_array = [1, 1]; //вспомогательный массив, который необходим для сохранения текущего и последубщего выбора картинки с нотами
let objSelValue1;  //содержит значение id_composition
let count; //счётчик элементов массива my_result1 и равен также user_array_size в LocalStorage
