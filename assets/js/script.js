gsap.registerPlugin(ScrollTrigger);
intro();
project();
merit();
layout();


// Lenis
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)



// Intro
function intro() {
    const content = document.querySelector(".intro__content");
    const horizontal = document.querySelector(".intro__content-inner");
    const visual = document.querySelector(".visual");

    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: content,
            start:"top top",
            end: "bottom bottom",
            //markers: true,
            scrub:1,
        }
    });

    introTl
    .to(horizontal, {
        x: () => -(visual.offsetWidth - window.innerWidth),
    })
    .to(".visual__about", {xPercent: -100}, '<')
    .to(".visual__always", {"--target": "0%"})
    
    .to(horizontal, {
        x: () => -(visual.offsetWidth - window.innerWidth) - window.innerWidth,})
    .to(".service__text-box", {yPercent: -100, duration: 1})
    .to(".service__img-wrap", {
        y: () => -(document.querySelector(".service__img-wrap").offsetHeight - window.innerHeight), 
        duration: 1
    }, '<')
}

// Project
function project() {
    const container = document.querySelector(".project__case");
    const list = document.querySelector(".project__case-list");
    const item = gsap.utils.toArray(".project__case-item");

    const scrollTween = gsap.to(item, {
        xPercent: -100 * (item.length - 1),
        ease:"none",
        scrollTrigger: {
            trigger: container,
            start:"top top",
            end: "bottom bottom",
            //markers:true,
            scrub:1,
        }
    })
}

//// Testimonial hover 개선 필요
// function testimonial () {
//     const testimonialList = document.querySelector(".testimonial__list");
//     const testimonialItem = document.querySelectorAll(".testimonial__item > a");

//     testimonialItem.forEach((item) => {
//         const testimonialImg = item.querySelector(".testimonial__item-img");

//         function mouseMove(e) {
//             gsap.to(testimonialImg,{x: e.clientX, y: e.clientY, xPercent:-50, yPercent:-50, duration:0.1});
//         }

//         item.addEventListener("mouseenter", () => {
//             gsap.to(testimonialImg, { autoAlpha: 1, duration: 0.2, ease: "power2.out" });
//             document.addEventListener("mousemove", mouseMove);
//         });

//         item.addEventListener("mouseleave", (e) => {
//             gsap.to(testimonialImg, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
//             document.addEventListener("mousemove", mouseMove);
//         });
//     }); 
// }


// Merit
function merit(){
    const meritTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: '.merit',
            start: "0% 0%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
        },
    });
    
    meritTl
    .to(".merit__item:nth-child(1)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})
    .to(".merit__item:nth-child(2)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, '<')
    .to(".merit__item:nth-child(2)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})
    .to(".merit__item:nth-child(3)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, '<')
};


function layout() {
    gsap.to(".footer__info-bg", {
        "height": "100%",
        scrollTrigger: {
        trigger: ".footer__info",
        start:"top center",
        end: "bottom bottom",
        //markers: true,
        scrub:1,
        }
    })
};