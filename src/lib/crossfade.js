import { crossfade } from 'svelte/transition';

export const [send, receive] = crossfade({
	duration: 400,
	fallback: (node, params) => {
		const style = getComputedStyle(node);
		const transform = style.transform === 'none' ? '' : style.transform;

		return {
			duration: 200,
			css: (t) => `
        transform: ${transform} scale(${t});
        opacity: ${t}
      `
		};
	}
});
