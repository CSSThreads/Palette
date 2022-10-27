{
    // mutations
    (async () => {
        var styleHttpReq = new XMLHttpRequest();
        styleHttpReq.open("GET", document.querySelector('[data-themesrc]').getAttribute('data-themesrc'), false);
        styleHttpReq.send(null);
        let res = JSON.parse(styleHttpReq.responseText)

        new MutationObserver(function(mutations) {
            mutations.forEach(mutation => {
                try {
                    mutation.addedNodes.forEach(node => {
                        let theme = node.attributes["data-theme"].nodeValue
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
                    let element = mutation.target

                    for (var i = 0; i < element.style.length; i++) {
                        if (element.style[i].startsWith('--color')) {
                            element.style.removeProperty(element.style[i])
                            i--;
                        }
                    }

                    try {
                        // adding the theme colors
                        let theme = mutation.target.attributes["data-theme"].nodeValue

                        for (var i = 0; i < res[theme].length; i++) {
                            element.style.setProperty(`--color${1+i}`, res[theme][i])
                        }
                    } catch {}
                })
            } catch {}
        }).observe(document, { attributes: true, attributeFilter: ["data-theme"], subtree: true });
    })()
}
