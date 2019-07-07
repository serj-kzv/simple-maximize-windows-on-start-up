'use strict';

const maximizeAll = async () => {
    const windowsApi = browser.windows, maximized = {state: 'maximized'};

    Promise.all(
        [
            ...(await windowsApi.getAll())
                .map(async ({id}) => windowsApi.update(id, maximized)),
            async () =>
                // Brings a current Firefox's window to the front after all windows are maximized.
                // It's because the current window can be folded and maximized at the same time.
                windowsApi.update((await windowsApi.getCurrent()).id, {focused: true})
        ]
    );
};

browser.runtime.onStartup.addListener(maximizeAll);
browser.browserAction.onClicked.addListener(maximizeAll);
