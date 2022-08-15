'use strict';

const maximizeAll = async () => {
    const {windows} = browser, {update} = windows, maximized = {state: 'maximized'};

    Promise.allSettled([
        ...(await windows.getAll()).map(async ({id}) => await update(id, maximized)),
        async () => await update((await windows.getCurrent()).id, {focused: true}) // brings a current window focus
    ]);
};

browser.runtime.onStartup.addListener(maximizeAll);
browser.browserAction.onClicked.addListener(maximizeAll);
