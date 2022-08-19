let tags2 = document.querySelector(".tags2");

// Вывести библиотеку, создать новый спан, внутри написать title из библиотеки, добавить класс tag для общей стилизации, можно так же добавить каждому свой уникальный класс на примере data-tag. ниже добавляем атрибут data-tag со значениями Object.keys(tags)[i](rock, electro и тд) и последнее помещаем внутрь tags2 наши спаны.
for(let i = 0; i < Object.keys(tags).length; i++) {
	console.log(Object.keys(tags)[i]);
	let newSpan = document.createElement("span");
	newSpan.innerHTML = tags[Object.keys(tags)[i]]["title"];
	newSpan.classList.add("tag");
	newSpan.setAttribute("data-tag", Object.keys(tags)[i]);
	tags2.appendChild(newSpan);

	//Как получить длину массива
	console.log(Object(tags[Object.keys(tags)[i]]["links"]).length)

	// Меняет отступы и размер шрифта, в зависимости от длины массива
    newSpan.style.fontSize = `${12 + (Object(tags[Object.keys(tags)[i]]["links"]).length*0.4)}px`;
    newSpan.style.padding = `${5 + (Object(tags[Object.keys(tags)[i]]["links"]).length*0.2)}px`;

}

let buttonTags2 = document.querySelectorAll(".tag");

buttonTags2.forEach(function(element) {
	element.onclick = showLink;
});

//тут все так же как было, ничего не менял.
function showLink() {
	let tagDate = this.dataset.tag;
	for(let i = 0; i < Object.keys(tags).length; i++) {
		if (Object.keys(tags)[i] == tagDate) {
			let arLinks = Object(tags[Object.keys(tags)[i]]["links"]);
			var randomLink = arLinks[Math.floor(Math.random()*arLinks.length)];
			console.log(randomLink);

            window.open(randomLink, "_self"); // открыть в том же окне, если в новом тогда "_self" меняем на "_blank", путь ссылки должен быть полный, меняется в файле tags.js

		}
	};
};


var $tabs = function (target) {
      var
        _elemTabs = (typeof target === 'string' ? document.querySelector(target) : target),
        _eventTabsShow,
        _showTab = function (tabsLinkTarget) {
          var tabsPaneTarget, tabsLinkActive, tabsPaneShow;
          tabsPaneTarget = document.querySelector(tabsLinkTarget.getAttribute('href'));
          tabsLinkActive = tabsLinkTarget.parentElement.querySelector('.tabs__link_active');
          tabsPaneShow = tabsPaneTarget.parentElement.querySelector('.tabs__pane_show');
          // если следующая вкладка равна активной, то завершаем работу
          if (tabsLinkTarget === tabsLinkActive) {
            return;
          }
          // удаляем классы у текущих активных элементов
          if (tabsLinkActive !== null) {
            tabsLinkActive.classList.remove('tabs__link_active');
          }
          if (tabsPaneShow !== null) {
            tabsPaneShow.classList.remove('tabs__pane_show');
          }
          // добавляем классы к элементам (в завимости от выбранной вкладки)
          tabsLinkTarget.classList.add('tabs__link_active');
          tabsPaneTarget.classList.add('tabs__pane_show');
          document.dispatchEvent(_eventTabsShow);
        },
        _switchTabTo = function (tabsLinkIndex) {
          var tabsLinks = _elemTabs.querySelectorAll('.tabs__link');
          if (tabsLinks.length > 0) {
            if (tabsLinkIndex > tabsLinks.length) {
              tabsLinkIndex = tabsLinks.length;
            } else if (tabsLinkIndex < 1) {
              tabsLinkIndex = 1;
            }
            _showTab(tabsLinks[tabsLinkIndex - 1]);
          }
        };

      _eventTabsShow = new CustomEvent('tab.show', { detail: _elemTabs });

      _elemTabs.addEventListener('click', function (e) {
        var tabsLinkTarget = e.target;
        // завершаем выполнение функции, если кликнули не по ссылке
        if (!tabsLinkTarget.classList.contains('tabs__link')) {
          return;
        }
        // отменяем стандартное действие
        e.preventDefault();
        _showTab(tabsLinkTarget);
      });

      return {
        showTab: function (target) {
          _showTab(target);
        },
        switchTabTo: function (index) {
          _switchTabTo(index);
        }
      }

    };

    $tabs('.tabs');
