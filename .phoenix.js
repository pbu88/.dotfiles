function calcFrame(frame, pad) {
    var frameVectors = {
        top: {
            x: 0,
            y: 0,
            width: 1,
            height: 0.5,
        },
        bottom: {
            x: 0,
            y: 0.5,
            width: 1,
            height: 0.5,
        },
        right: {
            x: 0.5,
            y: 0,
            width: 0.5,
            height: 1,
        },
        left: {
            x: 0,
            y: 0,
            width: 0.5,
            height: 1,
        },
    };
    var vector = frameVectors[pad];
    vector = {
        x      : frame.width * vector.x,
        y      : frame.height * vector.y,
        width  : frame.width * vector.width,
        height : frame.height * vector.height,
    };
    return vector;
}

function frameContainsPoint(frame, point) {
    // Give a little room for error in the top left corner to be able to click
    // the close button better
    return point.x > frame.x - (frame.x * .05) &&
        point.x < frame.x + frame.width &&
        point.y > frame.y  - (frame.y * .05) &&
        point.y < frame.y + frame.height;
}

Event.on("mouseDidMove", point => {
    Window.recent().find(w => {
        if(frameContainsPoint(w.frame(), point)) {
            w.focus();
            return true;
        }
        return false;
    });
});

//var screens = {};
//var apps = {};
//var windows = {};
//
//Screen.all().map(s => {
//    screens[s.identifier()] = s;
//    s.windows({visible: true}).map(w => {
//        Phoenix.log(w.title())
//        Phoenix.log(w.app().name())
//    });
//});

Key.on('f', [ 'ctrl', 'shift' ], function () {
    var focusedW = Window.focused();
    var screen = focusedW.screen();
    focusedW.setFrame(screen.frame());
});
Key.on('k', [ 'ctrl', 'shift' ], function () {
    var focusedW = Window.focused();
    var screen = focusedW.screen();
    focusedW.setFrame(calcFrame(screen.visibleFrame(), 'top'));
});
Key.on('j', [ 'ctrl', 'shift' ], function () {
    var focusedW = Window.focused();
    var screen = focusedW.screen();
    focusedW.setFrame(calcFrame(screen.visibleFrame(), 'bottom'));
});
Key.on('l', [ 'ctrl', 'shift' ], function () {
    var focusedW = Window.focused();
    var screen = focusedW.screen();
    focusedW.setFrame(calcFrame(screen.visibleFrame(), 'right'));
});
Key.on('h', [ 'ctrl', 'shift' ], function () {
    var focusedW = Window.focused();
    var screen = focusedW.screen();
    focusedW.setFrame(calcFrame(screen.visibleFrame(), 'left'));
});

