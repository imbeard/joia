<script>
	import { page } from '$app/stores';

	let currentRoute = $derived($page.url.pathname);
</script>

<div class="flex flex-col gap-xs items-center lg:gap-0 lg:items-baseline lg:flex-row">
	<a
		class="py-xs lg:py-s px-1 hover:theme-pink-red after:bg-pink btn-animate"
		class:theme-pink-red={currentRoute.includes('/about')}
		class:bg-gray={!currentRoute.includes('/about')}
		href="/about"><span>About</span></a
	>
	<a
		class="py-xs lg:py-s px-1 hover:theme-brown-pink after:bg-brown btn-animate"
		class:theme-brown-pink={currentRoute.includes('/performances')}
		class:bg-gray={!currentRoute.includes('/performances')}
		href="/performances"
		><span>Performances</span>
	</a>
</div>
