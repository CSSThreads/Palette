import lightWindTheme from 'https://lightwindcss.github.io/Palette/src/palette/paletteConfig.json' assert {type: 'json'}

window.addEventListener('load', () => {
    getAllAttributes();
})

// classes observation functions
function lightObserve(classes) {
    new MutationObserver((mutations) => {
        for (let i in mutations) {
            console.log(mutations[i])
        }
    }).observe(document.querySelector('body'), { attributes: true, subtree: true, childList: true });
}
function getAllAttributes() {
    let allAttributes = [];
    let allElements = document.querySelectorAll('*');
    for (let i in allElements) {
        try {
            let theme = allElements[i].attributes.theme.nodeValue, element = allElements[i].attributes.theme.ownerElement
            element.style.setProperty('--color1', lightWindTheme[theme].color1)
            element.style.setProperty('--color2', lightWindTheme[theme].color2)
            element.style.setProperty('--color3', lightWindTheme[theme].color3)
            element.style.setProperty('--color4', lightWindTheme[theme].color4)
        } catch {}
    }
}
