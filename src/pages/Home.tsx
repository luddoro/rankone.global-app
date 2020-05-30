import React from 'react';
import { InAppBrowser, InAppBrowserEvent, InAppBrowserOptions, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;
const { SplashScreen } = Plugins;

const browserOptions: InAppBrowserOptions = {
	location: 'no',
	zoom: 'no',
	beforeload: 'yes'
};

let browser = InAppBrowser.create('https://www.rankone.global', '_blank', browserOptions);
subscribeToBrowserEvents(browser);



interface State {
	notifications: {
		id: unknown;
		title: string | undefined;
		body: string | undefined;
	}[];
}

export class Home extends React.Component<{}, State> {

	render() {

		return null;
	}
}

const whitelistedUrls = [
	'cognito-idp.eu-central-1.amazonaws',
	'//www.rankone.global',
	'id.twitch.tv',
	'//twitch.tv/login',
	'passport.twitch.tv',
	'rankone-global.auth.eu-central-1'
];

function onBeforeLoad(e: InAppBrowserEvent) {
	console.log('onBeforeLoad');

	const isWhitelistedUrl = whitelistedUrls.some((whiteListUrl) => e.url.includes(whiteListUrl));

	if (isWhitelistedUrl) {
		return browser._loadAfterBeforeload(e.url);
	}

	const ref = InAppBrowser.create(e.url, '_system');
	subscribeToBrowserEvents(ref);
}
function onLoadStop(e: InAppBrowserEvent) {
	console.log('onLoadStop');
}



function subscribeToBrowserEvents(browserReference: InAppBrowserObject) {
	browserReference.on('beforeload').subscribe(onBeforeLoad);
	browserReference.on('loadstop').subscribe(onLoadStop);

	/* när IAB stängs, avsluta appen */
	browserReference.on('exit').subscribe(() => {
		App.exitApp();
	});

	//browserReference.on('loadstop').subscribe(onLoadStop);

}

export default Home;
