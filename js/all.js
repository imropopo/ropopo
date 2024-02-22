$(function () {
    // 漢堡選單
    $('.hamWrapper').on('click', function () {  
        $('.ham, .hamWrapper, .title, .item, .from, .itemPic, figcaption').toggleClass('is-active');
    });
});