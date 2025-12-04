<script>
	//@ts-nocheck
	import LL from '$i18n/i18n-svelte';
	import { onMount } from 'svelte';
	import ArrowRight from '$lib/components/svg/ArrowRight.svelte';
</script>

<div class="grid grid-cols-[auto_20px] items-center relative border-b border-green">
	<input id="newsletter-footer" type="text" name="sr_email" placeholder={$LL.newsletter()} />
	<input
		class="w-full cursor-pointer"
		type="submit"
		value=""
		api="yD08PVqrCvcauMWxOdZ9"
		list="NZs8MCEl9VFoGrxtXJcWK7nR"
		opt="true"
		register-email="https://www.stampready.net/api2/example/register/index.html"
		register-email-subject="Subject of registered email"
		verify-email="https://www.stampready.net/api2/example/confirm/index.html"
		verify-email-subject="Confirm subscription to JOIA newsletter"
		onclick={submit}
	/>
	<div class="absolute right-0 pointer-events-none">
		<ArrowRight fill="var(--color-green)" />
	</div>
</div>

<style>
	input::placeholder {
		color: var(--color-green);
	}
	input {
		outline: none;
		appearance: none;
		width: 100%;
	}
</style>
