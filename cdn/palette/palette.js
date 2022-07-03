import globalJson from 'https://lightwindcss.github.io/Palette/cdn/palette/paletteConfig.json' assert {type: 'json'} // getting the palette colors 

let lightWindTheme = null;

try {
    if (document.querySelector('script[src="https://lightwindcss.github.io/Palette/cdn/palette/palette.js"]').getAttribute('themesrc') == null) {
        lightWindTheme = globalJson
    }
    else {
        lightWindTheme = await fetch(document.querySelector('script[src="https://lightwindcss.github.io/Palette/cdn/palette/palette.js"]').getAttribute('themesrc'))
        .then(response => {
            return response.json();
        })
    }
} catch {}

console.log(lightWindTheme)

window.addEventListener('load', () => {
    // run the Palette observation on window load
    getAllAttributes();
    lightObserve();
})

// attributes observation function
function lightObserve() {
    new MutationObserver((mutations) => {
        for (let i in mutations) {
            if (mutations[i].type == 'childList') {
                try {
                    // adding the theme to new appended child
                    let theme = mutations[i].target.attributes.theme.nodeValue, element = mutations[i].target
    
                    element.style.setProperty('--color1', lightWindTheme[theme].color1)
                    element.style.setProperty('--color2', lightWindTheme[theme].color2)
                    element.style.setProperty('--color3', lightWindTheme[theme].color3)
                    element.style.setProperty('--color4', lightWindTheme[theme].color4)
                } catch {}
            }
            else {
                // in case the theme change we execute this part of code
                if (mutations[i].attributeName == 'theme') {
                    try {
                        // adding the theme colors
                        let theme = mutations[i].target.attributes.theme.nodeValue, element = mutations[i].target
        
                        element.style.setProperty('--color1', lightWindTheme[theme].color1)
                        element.style.setProperty('--color2', lightWindTheme[theme].color2)
                        element.style.setProperty('--color3', lightWindTheme[theme].color3)
                        element.style.setProperty('--color4', lightWindTheme[theme].color4)
                    } catch {
                        // deleting the theme colors
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

// getting all the elements with the theme attribute to add the colors
function getAllAttributes() {
    let allElements = document.querySelectorAll('*');
    for (let i in allElements) {
        try {
            let theme = allElements[i].attributes.theme.nodeValue, element = allElements[i].attributes.theme.ownerElement
            element.style.setProperty('--color1', lightWindTheme[theme].color1)
            element.style.setProperty('--color2', lightWindTheme[theme].color2)
            element.style.setProperty('--color3', lightWindTheme[theme].color3)
            element.style.setProperty('--color4', lightWindTheme[theme].color4)
            
            console.log(allElements[i])
        } catch {}
    }
}
