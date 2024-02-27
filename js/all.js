$(function () {

    // ******* 【動態加入服飾資料】 *******
    // 獲得包含服飾資料的容器
    let clothingContainer = document.querySelector('.clothingItem');

    for (const type in clothingContent) {
        if (clothingContent.hasOwnProperty(type)) {
            clothingContent[type].forEach(function (item) {
                // 建立 figure 元素
                let figure = document.createElement('figure');

                // 建立內部元素
                let innerHtml = `
                    <div class="hamWrapper">
                        <div class="ham">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    <div class="itemClose">
                        <div class="item">
                            <img src="img/ArchbishopColor0.png" alt="祭司">
                            <img class="hair" src="img/Hair7White.png" alt="頭髮">
                            <img class="hat" src="${item.wearingUrl}" alt="${item.name}">
                        </div>
                        <figcaption>${item.name}<mark></mark></figcaption>
                    </div>
                    <div class="itemOpen">
                        <div class="title">
                            ${item.name}<mark></mark>
                            <span>${item.enchant}</span>
                        </div>
                        <div class="itemPic">
                            <img src="${item.itemUrl}">
                        </div>
                        <div class="from">點選出處
                        ${
                            item.source ? `
                                <div class="formLink">
                                    <a href="${item.source}" target="_blank">
                                        <img src="img/iconFrom.svg">
                                    </a>
                                </div>
                            ` : ''
                        }
                        </div>
                    </div>`;

                figure.innerHTML = innerHtml;

                // 將 figure 元素加入容器中
                clothingContainer.appendChild(figure);

                // ******* 【漢堡選單】 *******
                // 取得剛剛添加的 .hamWrapper 元素
                let hamWrapper = figure.querySelector('.hamWrapper');

                // 建立監聽事件，使漢堡個別作用
                hamWrapper.addEventListener('click', function () {
                    /// 在當下的 figure中找.ham, .title, .item, .from, .itemPic, figcaption元素 切換
                    let relatedElements = figure.querySelectorAll('.hamWrapper, .ham, .title, .item, .from, .itemPic, figcaption');
                    relatedElements.forEach(function (element) {
                        element.classList.toggle('is-active');
                    });
                });
            });
        }
    }
});