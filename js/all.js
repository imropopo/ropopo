$(function () {
    const clothingContainer = document.querySelector('.clothingItem');
    const allClothingItems = Object.values(clothingContent).flat();
    const navItems = document.querySelectorAll('nav li');
    let currentFilters = {};

    function renderClothingItems(items) {
        clothingContainer.innerHTML = '';
        const fragment = document.createDocumentFragment();
        items.forEach(item => {
            const figure = createClothingItem(item);
            fragment.appendChild(figure);
        });
        clothingContainer.appendChild(fragment);
    }

    function createClothingItem(item) {
        const figure = document.createElement('figure');
        figure.innerHTML = `
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
                <figcaption>${item.name}${item.enchant ? '<mark></mark>' : ''}</figcaption>
            </div>
            <div class="itemOpen">
                <div class="title ${item.enchant ? 'has-enchant' : ''}">
                    ${item.name}${item.enchant ? '<mark></mark>' : ''}
                    <span>${item.enchant}</span>
                </div>
                <div class="itemPic">
                    <img src="${item.itemUrl}">
                </div>
                <div class="from">點選出處
                    ${item.source ? `
                        <div class="formLink">
                            ${item.source.map(source => `
                                <a href="${source.url}" target="_blank">
                                    <img src="img/iconFrom.svg">
                                </a>
                            `).join('')}
                        </div>` : ''}
                </div>
            </div>`;
        return figure;
    }

    // 使用事件委托来处理 .hamWrapper 元素的点击事件
    clothingContainer.addEventListener('click', function (event) {
        const hamWrapper = event.target.closest('.hamWrapper');
        if (hamWrapper) {
            const relatedElements = hamWrapper.parentElement.querySelectorAll('.hamWrapper, .ham, .title, .item, .from, .itemPic, figcaption');
            relatedElements.forEach(element => {
                element.classList.toggle('is-active');
            });
        }
    });

    // 点击导航项时更新筛选条件并重新渲染服装项目
    navItems.forEach(item => {
        item.addEventListener('click', function () {
            this.classList.toggle('selected');
            currentFilters = updateFilters();
            const filteredItems = allClothingItems.filter(item => filterItem(item, currentFilters));
            renderClothingItems(filteredItems);
        });
    });

    // 过滤单个项目
    function filterItem(item, filters) {
        for (const key in filters) {
            if (filters.hasOwnProperty(key) && filters[key] !== 'all') {
                if (key === 'position') {
                    if (!filters[key].includes(item[key])) {
                        return false;
                    }
                } else if (key === 'enchant' && item[key] === '') {
                    return false;
                } else if (filters[key] !== item[key]) {
                    return false;
                }
            }
        }
        return true;
    }

    // 更新筛选条件
    function updateFilters() {
        const filters = {};
        navItems.forEach(item => {
            if (item.classList.contains('selected')) {
                const position = item.getAttribute('data-position');
                const enchant = item.getAttribute('data-enchant');
                if (position && position !== 'all') {
                    filters['position'] = (filters['position'] || []).concat(position);
                }
                if (enchant && enchant === 'enchant') {
                    const nonEmptyEnchantItems = allClothingItems.filter(item => item['enchant'] !== '');
                    if (nonEmptyEnchantItems.length > 0) {
                        filters['enchant'] = 'enchant';
                    }
                }
            }
        });
        return filters;
    }

    // 初始渲染所有服装项目
    renderClothingItems(allClothingItems.filter(item => filterItem(item, currentFilters)));
});