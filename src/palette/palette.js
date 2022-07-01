import lightWindTheme from 'https://lightwindcss.github.io/Palette/src/palette/paletteConfig.json' assert {type: 'json'}

window.addEventListener('load', () => {
    getAllAttributes();
    lightObserve();
})

// classes observation functions
function lightObserve() {
    new MutationObserver((mutations) => {
        for (let i in mutations) {
            if (mutations[i].type == 'childList') {
                try {
                    // adding the theme
                    let theme = mutations[i].target.attributes.theme.nodeValue, element = mutations[i].target
    
                    element.style.setProperty('--color1', lightWindTheme[theme].color1)
                    element.style.setProperty('--color2', lightWindTheme[theme].color2)
                    element.style.setProperty('--color3', lightWindTheme[theme].color3)
                    element.style.setProperty('--color4', lightWindTheme[theme].color4)
                } catch {}
            }
            else {
                if (mutations[i].attributeName == 'theme') {
                    try {
                        // adding the theme
                        let theme = mutations[i].target.attributes.theme.nodeValue, element = mutations[i].target
        
                        element.style.setProperty('--color1', lightWindTheme[theme].color1)
                        element.style.setProperty('--color2', lightWindTheme[theme].color2)
                        element.style.setProperty('--color3', lightWindTheme[theme].color3)
                        element.style.setProperty('--color4', lightWindTheme[theme].color4)
                    } catch {
                        // deleting the theme
                        let element = mutations[i].target

                        element.style.removeProperty('--color1')
                        element.style.removeProperty('--color2')
                        element.style.removeProperty('--color3')
                        element.style.removeProperty('--color4')
                    }
                }
            }
        }
    }).observe(document.querySelector('body'), { attributes: true, subtree: true, childList: true });
}
function getAllAttributes() {
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
