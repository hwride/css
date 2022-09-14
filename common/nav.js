/* Common navigation component for the doc pages */
function createNav(homeHref = '/css/index.html', parentPaths = []) {
	const nav = document.createElement('nav')
	nav.class = 'css-testing-nav'
	let liHTML = `<li><a href="${homeHref}">Home</a></li>`
	let i = 0;
	for(const parentPath of parentPaths) {
		liHTML += `<span aria-hidden="true" style="
	font-size: 1.3rem;
	transform: translateY(-0.2rem);
">/</span>
<li>	
	<a href="${parentPath.href}">${parentPath.label}</a>
</li>`;
	}

	nav.innerHTML = `
<ul style="
    list-style: none;
    text-align: center;
    display: flex;
    gap: var(--spacing-10);
		width: fit-content;
    margin-block-end: 0;
    margin-inline: auto;
">
	${liHTML}
</ul>
`
	document.querySelector('body').prepend(nav)
}
