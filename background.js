'use strict';

const maximizeAll = async () => {
    const {windows} = browser,
        {update} = windows,
        maximized = {state: 'maximized'},
        {id} = await windows.getCurrent();

    Promise.allSettled(
        (await windows.getAll({windowTypes: ['normal']}))
            .map(async ({id}) => await update(id, maximized)),
        update(id, {focused: true}) // brings a current window focus
    );
};

browser.runtime.onStartup.addListener(maximizeAll);
browser.browserAction.onClicked.addListener(maximizeAll);
