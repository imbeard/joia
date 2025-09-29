// @ts-nocheck

const TWEEN_FACTOR_BASE = 0.6;

export const setupTweenParallax = (emblaApi) => {
	// Create isolated state for this gallery instance
	let tweenFactor = TWEEN_FACTOR_BASE;
	let tweenNodes = [];

	const setTweenNodes = (emblaApi) => {
		tweenNodes = emblaApi.slideNodes().map((slideNode) => {
			return slideNode.querySelector('.embla__parallax__layer');
		});
	};

	const setTweenFactor = (emblaApi) => {
		tweenFactor = TWEEN_FACTOR_BASE;
	};

	const tweenParallax = (emblaApi, eventName) => {
		const engine = emblaApi.internalEngine();
		const scrollProgress = emblaApi.scrollProgress();
		const slidesInView = emblaApi.slidesInView();
		const isScrollEvent = eventName === 'scroll';

		emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
			let diffToTarget = scrollSnap - scrollProgress;
			const slidesInSnap = engine.slideRegistry[snapIndex];

			slidesInSnap.forEach((slideIndex) => {
				if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

				if (engine.options.loop) {
					engine.slideLooper.loopPoints.forEach((loopItem) => {
						const target = loopItem.target();

						if (slideIndex === loopItem.index && target !== 0) {
							const sign = Math.sign(target);

							if (sign === -1) {
								diffToTarget = scrollSnap - (1 + scrollProgress);
							}
							if (sign === 1) {
								diffToTarget = scrollSnap + (1 - scrollProgress);
							}
						}
					});
				}

				const translate = diffToTarget * (-1 * tweenFactor) * 100;
				const tweenNode = tweenNodes[slideIndex];
				if (tweenNode) {
					tweenNode.style.transform = `translateX(${translate}%)`;
				}
			});
		});
	};

	setTweenNodes(emblaApi);
	setTweenFactor(emblaApi);
	tweenParallax(emblaApi, 'init');

	emblaApi
		.on('reInit', setTweenNodes)
		.on('reInit', setTweenFactor)
		.on('reInit', tweenParallax)
		.on('scroll', tweenParallax)
		.on('slideFocus', tweenParallax);

	return () => {
		tweenNodes.forEach((tweenNode) => {
			if (tweenNode) {
				tweenNode.removeAttribute('style');
			}
		});
	};
};
