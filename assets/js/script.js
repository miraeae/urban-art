gsap.registerPlugin(ScrollTrigger);

// Lenis
const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
    lenis.raf(time * 500)
})

gsap.ticker.lagSmoothing(0)

// common
function common() {
    const textUps = document.querySelectorAll(".text-up");

    textUps.forEach((textUp) => {
        const typeSplit = new SplitType(textUp, {
            types: "lines, words",
            tagName: "span",
        });

        gsap.fromTo(typeSplit.words,{yPercent: 100}, {
            scrollTrigger: {
                trigger: textUp,
                start: "-400 center",
                end: "bottom center",
                //markers: true,
                scrub: 1,
            }, yPercent: 0
        })
    })
}


// 0-1. Intro, Main
function intro() {
    // 0. Intro
    const intro = document.querySelector(".intro");
    const introTl = gsap.timeline();
   
    introTl
    .to({}, {duration: 1})
    .to(".intro", {yPercent: 100, ease: "ease-in", onComplete: () => onComplete()})

    function onComplete() {
        lenis.start();
        intro.remove();
        mainTl.play();
    }

    // 1. Main
    const main = document.querySelector(".main");

    // Split
    const typeSplit = new SplitType(".main__label, .main__title", {
        types: "lines, words, char",
        tagName: "span",
    });

    // Anim
    const mainTl = gsap.timeline({paused: true});

    mainTl
    .to(main, {opacity: 1})
    .from(".visual__img-area", {opacity: 0, duration: 1.5})
    .from(".main__title .char", {yPercent: 100, stagger: 0.1}, '<')
    .from(".main__label .char", {yPercent: 100, stagger: 0.1}, '-=80%')
    .from(".visual__img-area img", {scale: 1.2, duration: 1, ease: "ease-in"}, '<')
    .from(".main__desc", {opacity: 0, duration: 1}, '-=80%')

    gsap.fromTo(".visual__img-area", {"clip-path":"inset(0% 2%)"}, {
        scrollTrigger: {
            trigger: ".main",
            start: "50 top",
            endTrigger: ".visual",
            end: "top top",
            //markers: true,
            scrub: 1,
        },
        "clip-path":"inset(0% 0%)"
    })

    // Horizontal Anim
    const mainContent = document.querySelector(".main__content");
    const mainContentInner = document.querySelector(".main__content-inner");
    const mainContentVisual = document.querySelector(".visual");

    const mm = gsap.matchMedia();

    mm.add({
        isDesktop: `(min-width: 1025px)`,
        isMobile: `(max-width:1024px)`
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if(isDesktop) {
            const mainHorizTl = gsap.timeline({
                scrollTrigger: {
                    trigger: mainContent,
                    start:"top top",
                    end: "bottom bottom",
                    //markers: true,
                    scrub:1,
                }
            });
        
            mainHorizTl
            .to(mainContentInner, {
                x: () => -(mainContentVisual.offsetWidth - window.innerWidth),
            })
            .fromTo(".visual__about", {xPercent: 50}, {xPercent: -100}, '<')
            .to(".visual__always", {"--target": "0%"})
            
            .to(mainContentInner, {
                x: () => -(mainContentVisual.offsetWidth - window.innerWidth) - window.innerWidth,})
            .to(".service__text-box", {yPercent: -100, duration: 1})
            .to(".service__img-wrap", {
                y: () => -(document.querySelector(".service__img-wrap").offsetHeight - window.innerHeight), 
                duration: 1
            }, '<')
        } else {
            gsap.to(".visual__always", {"--target": "0%",
                scrollTrigger: {
                trigger: ".visual__always",
                start:"top top",
                end: "bottom bottom",
                //markers: true,
                scrub: 0,
                }
            })
        }
    })
}

// Project
function project() {
    const container = document.querySelector(".project__case");
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

    const cursor = document.querySelector(".project__case-cursor");
    const cursorImgs = document.querySelectorAll(".project__case-cursor-img img");
    const itemLinks = document.querySelectorAll(".project__case-item a");

    // 마우스 따라다니기
    document.addEventListener("mousemove",(e) => { 
        cursor.style.top = `${e.clientY}px`
        cursor.style.left = `${e.clientX}px`
        cursor.animate({
            top : `${e.clientY}px`, left : `${e.clientX}px`
        },2000)
    });

    // 호버 시 커서, 이미지 on
    itemLinks.forEach((link, index) => {
        const cursorImg = cursorImgs[index];
    
        link.addEventListener("mouseover", () => { 
            cursor.classList.add("on");
            cursorImg.classList.add("on");
        });
    
        link.addEventListener("mouseout", () => { 
            cursor.classList.remove("on");
            cursorImg.classList.remove("on");
        });
    });
    
}

function testimonial() {
    const cursor = document.querySelector(".testimonial__cursor");
    const cursorImgs = document.querySelectorAll('.testimonial__cursor-img');
    const itemLinks = document.querySelectorAll(".testimonial__item a");

    // 마우스 따라다니기
    document.addEventListener("mousemove",(e) => { 
        cursor.style.top = `${e.clientY}px`
        cursor.style.left = `${e.clientX}px`
        cursor.animate({
            top : `${e.clientY}px`, left : `${e.clientX}px`
        },2000)
    });

    // 호버 시 커서, 이미지 on
    itemLinks.forEach((link, index) => {
        const cursorImg = cursorImgs[index];
    
        link.addEventListener("mouseover", () => { 
            cursor.classList.add("on");
            cursorImg.classList.add("on");
        });
    
        link.addEventListener("mouseout", () => { 
            cursor.classList.remove("on");
            cursorImg.classList.remove("on");
        });
    });
}

// Promotion
function promotion() {
    // Promotion img
    gsap.to(".promotion__img-wrap", {yPercent: -30,
        scrollTrigger: {
        trigger: ".promotion__img-wrap",
        start:"-30% center",
        end: "bottom bottom",
        //markers: true,
        scrub: 0,
        }
    })

    
    // Promotion horizontal
    const promoHorizTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".promotion__content",
            start:"top top",
            end: "bottom bottom",
            scrub:1,
        }
    });

    const mm = gsap.matchMedia();

    mm.add({
        isDesktop: `(min-width: 1025px)`,
        isMobile: `(max-width:1024px)`
    }, (context) => {
        let { isDesktop, isMobile } = context.conditions;

        if(isDesktop) {
            promoHorizTl
            .to(".promotion__video-box video", {scale: 3})
            .fromTo(".promotion__list", {xPercent: 100}, {xPercent: 0})
            .to(".promotion__content", {
                x: () => -(window.innerWidth)
            })
        } else {
            promoHorizTl
            .to(".promotion__video-box video", {scale: 5})
            .fromTo(".promotion__list", {yPercent: 120}, {yPercent: 0})
            .to(".promotion__content", {
                y: () => -(window.innerHeight)
            })
        }
    })
}


// strength
function strength(){
    const strengthTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
            trigger: '.strength',
            start: "0% 0%",
            end: "100% 100%",
            scrub: true,
            // markers: true,
        },
    });
    
    strengthTl
    .to(".strength__item:nth-child(1)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})
    .to(".strength__item:nth-child(2)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, '<')
    .to(".strength__item:nth-child(2)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"})
    .to(".strength__item:nth-child(3)", {"clip-path": "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"}, '<')
};


function layout() {
    // Menu
    document.querySelectorAll(".gnb__item > a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // trapFocus
    const menu =  document.querySelector(".menu");
    const menuOpen =  document.querySelector(".menu-open");
    const meneClose = document.querySelector(".menu__close");
    const menuLinks = menu.querySelectorAll("a, button");

    function trapFocus(event) {
        const firstElement = menuLinks[0];
        const lastElement = menuLinks[menuLinks.length - 1];

        if (event.key === "Tab") {
            if (event.shiftKey) { // 첫 요소에서 Shift + Tab 하면 마지막 요소로 이동
                if (document.activeElement === firstElement) {
                    event.preventDefault();
                    lastElement.focus();
                }
            } else { // 마지막 요소 다음 다시 첫 요소로 이동
                if (document.activeElement === lastElement) {
                    event.preventDefault();
                    firstElement.focus();
                }
            }
        }
    }

    const menuTl = gsap.timeline({paused: true});

    menuTl
    .to(menu, {"z-index": "999"})
    .to(".menu__inner", {width: "auto", height: "auto", top: 0, right: 0, duration: 0.5, ease:"none"}, '<')
    .from(meneClose, {y: 20, autoAlpha: 0}, '<')
    .from(".gnb__item", {y: 20, autoAlpha: 0, stagger: 0.2})
    .from(".menu__sns", {autoAlpha: 0});

    menuOpen.addEventListener("click", () => {
        menuTl.play();
        menuOpen.setAttribute("aria-expanded", "true");
        document.addEventListener("keydown", trapFocus);
    })

    meneClose.addEventListener("click", () => {
        menuTl.reverse();
        menuOpen.setAttribute("aria-expanded", "false");
        document.removeEventListener("keydown", trapFocus);
    })

    // footer
    gsap.to(".footer__info-bg", {
        "height": "100%",
        scrollTrigger: {
        trigger: ".footer__info",
        start:"-50% center",
        end: "top 30%",
        //markers: true,
        scrub:1,
        }
    })

    document.addEventListener('mousemove', function(e) {
        // 중심좌표 구하기
        let mouseX = e.clientX - window.innerWidth / 2;
        let mouseY = e.clientY - window.innerHeight / 2;
    
        gsap.to(document.querySelector('.footer__info-profile img'), {
            x: mouseX / 50,
            y: mouseY / 50
        });
    });

    const linkNone = document.querySelectorAll("a[href='#']");
    
    linkNone.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
        })
    })
};

document.addEventListener("DOMContentLoaded", () => {
    // Disable scrolling until the intro ends
    lenis.stop();

    intro();
    project();
    testimonial();
    promotion();
    strength();

    common();
    layout();
});
