/* Common navigation component for the doc pages */
function createNav(homeHref = '/css/index.html') {
	const nav = document.createElement('nav')
	nav.class = 'css-testing-nav'
	nav.innerHTML = `
<ul style="
    list-style: none;
    text-align: center;
    margin-bottom: 0;
">
	<li><a href="${homeHref}">Home</a></li>
</ul>
`
	document.querySelector('body').prepend(nav)
}
