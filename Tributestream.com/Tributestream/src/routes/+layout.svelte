<script lang="ts">
    import '../app.postcss';
    // Highlight JS
    import hljs from 'highlight.js/lib/core';
    import 'highlight.js/styles/github-dark.css';
    import { storeHighlightJs } from '@skeletonlabs/skeleton';
    import xml from 'highlight.js/lib/languages/xml'; // for HTML
    import css from 'highlight.js/lib/languages/css';
    import javascript from 'highlight.js/lib/languages/javascript';
    import typescript from 'highlight.js/lib/languages/typescript';

    hljs.registerLanguage('xml', xml); // for HTML
    hljs.registerLanguage('css', css);
    hljs.registerLanguage('javascript', javascript);
    hljs.registerLanguage('typescript', typescript);
    storeHighlightJs.set(hljs);

    // Floating UI for Popups
    import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
    import { storePopup } from '@skeletonlabs/skeleton';
    import { page } from '$app/stores';
    import Header from '$lib/Header.svelte';

    storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>
<div class="max-h-screen overflow-auto">  
	<Header />

	<!-- Ensure the container expands to fill at least the screen and can scroll if content is longer -->
	<div class="flex flex-col bg-gray-100">
		<!-- Main content area with forced scrolling if overflow -->
		<main class="flex-1 overflow-auto p-4">
			<slot /> <!-- Injected page content will reside here -->
		</main>
	</div>
</div>
<style>
div {
	border: 5px solid red; /* Every div gets a red border */
  }</style>