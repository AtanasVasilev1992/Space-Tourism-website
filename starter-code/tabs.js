const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');


tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab)=> {
    tab.addEventListener('click' , changeTabPannel);
});

let tabFocus = 0;

function changeTabFocus(e) {
    // console.log(e.keyCode);
    
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        // console.log(tabs[tabFocus]);
        tabs[tabFocus].setAttribute("tabindex", -1);
    };
    
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if ( tabFocus >= tabs.length) {
            tabFocus = 0
        };
    };
    
    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        };
    };
    
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
};

function changeTabPannel(e) {
    const targetTab = e.target;
    const targetPannel = targetTab.getAttribute('aria-controls');
    const targetImg = targetTab.getAttribute('data-image')

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // Change active tab
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);
    
    targetTab.setAttribute("aria-selected", true);

    // Change content
    mainContainer
        .querySelectorAll('[role="tabpanel"]')
        .forEach((panel) => panel.setAttribute('hidden', true));

    mainContainer.querySelector([`#${targetPannel}`]).removeAttribute('hidden');

    // Change image
    mainContainer
        .querySelectorAll('picture')
        .forEach((picture) => picture.setAttribute('hidden', true));
    
        mainContainer.querySelector([`#${targetImg}`]).removeAttribute('hidden');
}