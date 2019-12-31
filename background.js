'use strict';

const maximizeAll = async () => {
    const {windows} = browser, maximized = {state: 'maximized'};

    Promise.allSettled([
        ...(await windows.getAll()).map(async ({id}) => windows.update(id, maximized)),
        async () => windows.update((await windows.getCurrent()).id, {focused: true}) // brings a current window focus
    ]);
};

browser.runtime.onStartup.addListener(maximizeAll);
browser.browserAction.onClicked.addListener(maximizeAll);
