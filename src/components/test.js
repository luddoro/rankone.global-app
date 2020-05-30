document.addEventListener('click', (e) => {
	console.log('Click!');

	var element = e.target;

	const linkElement = element.tagName === 'A' ? element : element.closest('a');
	if (!linkElement) return true;

	if (!linkElement.href.includes('https://www.rankone.global')) {
		console.log('Extern länk: ' + linkElement.href);
		window.cordova_iab.postMessage(JSON.stringify({ url: linkElement.href }));
		e.preventDefault();
		return false;
	}
});
