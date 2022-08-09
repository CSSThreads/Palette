{
    // mutations
    (async () => {
        var styleHttpReq = new XMLHttpRequest();
        styleHttpReq.open("GET", document.querySelector('[themesrc]').getAttribute('themesrc'), false);
        styleHttpReq.send(null);
        let res = JSON.parse(styleHttpReq.responseText)

        new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                try {
                    mutation.addedNodes.forEach(node => {
                        let theme = node.attributes.theme.nodeValue
                        for (var i = 0; i < res[theme].length; i++) {
                            node.style.setProperty(`--color${1+i}`, res[theme][i])
                        }
                    })
                } catch {}
            })
        }).observe(document, { subtree: true, childList: true });

        new MutationObserver(function(mutations) {
            try {
                mutations.forEach(mutation => {
                    let element = mutation.target, j = 1

                    while (j) {
                        if (!element.style.hasOwnProperty(`--color${j}`))
                            break;
                        element.style.removeProperty(`--color${j}`)
                    } 
                    try {
                        // adding the theme colors
                        let theme = mutation.target.attributes.theme.nodeValue

                        for (var i = 0; i < res[theme].length; i++) {
                            element.style.setProperty(`--color${1+i}`, res[theme][i])
                        }
                    } catch {}
                })
            } catch {}
        }).observe(document, { attributes: true, attributeFilter: ["theme"], subtree: true });
    })()
}
