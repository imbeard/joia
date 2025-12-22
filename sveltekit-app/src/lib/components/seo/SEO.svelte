<script>
	let { data, pageTitle, noindex = false, locale } = $props();

	// Default values
	const defaults = {
		ogType: 'website',
		ogImage: '/images/ogImage.jpg',
		siteName: 'Joia',
		siteDescription: 'Joia: alta cucina vegetariana',
		locale: 'it'
	};

	// Computed values
	const title = data?.title
		? `${data?.title} | ${defaults.siteName} | ${locale}`
		: pageTitle
			? `${pageTitle} | ${defaults.siteName} | ${locale}`
			: `${defaults.siteName} | ${locale}`;
	const description = data?.description;
	const image = data?.imageUrl || defaults?.ogImage;
	const ogType = data?.ogType || defaults?.ogType;
	const twitterCard = data?.imageUrl || defaults?.ogImage;
	const siteName = data?.siteName || defaults?.siteName;
	const canonical = data?.canonical;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}</title>
	{#if description}
		<meta name="description" content={description} />
	{/if}
	{#if noindex}
		<meta name="robots" content="noindex, nofollow" />
	{/if}

	<!-- Canonical URL -->
	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}

	<!-- Open Graph / Facebook / WhatsApp -->
	<meta property="og:type" content={ogType} />
	{#if canonical}
		<meta property="og:url" content={canonical} />
	{/if}
	<meta property="og:title" content={title} />
	{#if description}
		<meta property="og:description" content={description} />
	{/if}
	{#if image}
		<meta property="og:image" content={image} />
		<meta property="og:image:secure_url" content={image} />
		<meta property="og:image:width" content="1200" />
		<meta property="og:image:height" content="1200" />
		<meta property="og:image:alt" content={title} />
	{/if}
	<meta property="og:site_name" content={siteName} />
	<meta property="og:locale" content={locale} />

	<!-- Twitter -->
	<meta name="twitter:card" content={twitterCard} />
	{#if canonical}
		<meta name="twitter:url" content={canonical} />
	{/if}
	<meta name="twitter:title" content={title} />
	{#if description}
		<meta name="twitter:description" content={description} />
	{/if}
	{#if image}
		<meta name="twitter:image" content={image} />
	{/if}
</svelte:head>
