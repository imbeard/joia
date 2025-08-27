<script lang="ts">
    import PortableText from "$lib/components/element/PortableText.svelte";
    let { section } = $props();
</script>
<div class="w-full typo-lg">
    <PortableText data={section.text} />
</div>