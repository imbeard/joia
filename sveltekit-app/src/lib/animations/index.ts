import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const scrollAnimations = () => {
	ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

	requestAnimationFrame(() => {
		// Initialize fade-in animations
		gsap.set('.fade-in', { opacity: 0 });
		ScrollTrigger.batch('.fade-in', {
			onEnter: (elements) => {
				gsap.to(elements, {
					opacity: 1,
					stagger: 0.2
				});
			},
			start: 'top 80%'
		});

		// Initialize image blur animations
		gsap.set('.image-blur-animate', { filter: 'blur(20px)' });
		ScrollTrigger.batch('.image-blur-animate', {
			onEnter: (elements) => {
				gsap.to(elements, {
					filter: 'blur(0px)',
					duration: 1.2,
					ease: 'power3.out',
					stagger: 0.15
				});
			},
			start: 'top 85%'
		});

		// Initialize parallax effects for image containers
		gsap.utils.toArray('.image-parallax').forEach((element) => {
			gsap.fromTo(
				element,
				{ yPercent: -10 },
				{
					yPercent: 10,
					ease: 'none',
					scrollTrigger: {
						trigger: element.closest('.embla__slide') || element,
						start: 'top bottom',
						end: 'bottom top',
						scrub: true
					}
				}
			);
		});

		const visibleElements = document.querySelectorAll('.image-blur-animate');
		visibleElements.forEach((element) => {
			const rect = element.getBoundingClientRect();
			const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
			if (isVisible) {
				gsap.to(element, {
					filter: 'blur(0px)',
					scale: 1,
					duration: 1.2,
					ease: 'power3.out'
				});
			}
		});

		// Handle elements already in view for blur animations
		setTimeout(() => {
			// Watch for new .image-blur-animate elements being added
			const observer = new MutationObserver(() => {
				setTimeout(() => {
					const newElements = document.querySelectorAll('.image-blur-animate');
					newElements.forEach((element) => {
						const rect = element.getBoundingClientRect();
						const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
						if (isVisible) {
							gsap.to(element, {
								filter: 'blur(0px)',
								scale: 1,
								duration: 1.2,
								ease: 'power3.out'
							});
						}
					});
				}, 50);
			});

			observer.observe(document.body, {
				childList: true,
				subtree: true,
				attributes: true,
				attributeFilter: ['class']
			});
		}, 200);

		ScrollTrigger.refresh();
	});
};
