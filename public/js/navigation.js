// ------------------------------
$("#logout").click(function	(e) {
	console.log('logout');

	e.preventDefault();

	// clear local storage
	window.localStorage.clear();

	// navigate to home page
	window.location.assign("/html/index.html");

	console.log('location.assign');
});