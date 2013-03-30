var bs = new BrushStrokes({'canvas': {'id': 'canvas', 'color': {'r': 255, 'g': 255, 'b': 255, 'a': 1}, 'height': getHeight(), 'width': getWidth()}, 'font':{'color': {'r': 0, 'g': 0, 'b': 0, 'a': 1}, 'family': 'Verdana', 'size': 50, 'style': 'normal', 'weight': "normal"}, 'content':{'text': 'Andrew Warr'}, 'brush': {'width':10}});
bs.init();

function getHeight() {
    return Math.max(
        Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
        Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
        Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    );
}

function getWidth() {
    return Math.max(
        Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
        Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
        Math.max(document.body.clientWidth, document.documentElement.clientWidth)
    );
}