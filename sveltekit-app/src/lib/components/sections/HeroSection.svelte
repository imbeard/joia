<script lang="ts">
	import Image from '../element/Image.svelte';
	import Video from '../element/Video.svelte';
	import PortableText from '../element/PortableText.svelte';
	
	let { section } = $props();
	let video = $derived(section?.video);
	let image = $derived(section?.image);
</script>

<div>
	{#if video.url}
		<Video src={video.url} alt={video.alt} poster={video.poster} />
		{#if video.caption}
			<div class="typo-s pt-xs">
				<PortableText data={video.caption} />
			</div>
		{/if}
	{:else if image}
		<Image {image} alt={image.alt} />
		{#if image.caption}
			<div class="typo-s pt-xs">
				<PortableText data={image.caption} />
			</div>
		{/if}
	{/if}
</div>
