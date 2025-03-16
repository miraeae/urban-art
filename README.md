# 🎨 Urban Art <br>인터랙티브 사이트 클론 코딩

JS, GSAP를 활용하여 다양한 인터랙션과 모션 구현을 중점으로 한 반응형 클론 코딩 사이트입니다.

- 제작기간: 2025.03.14 ~ 2025.03.16
- 사용언어: HTML, SCSS, JavaScript
- 라이브러리: GSAP(ScrollTrigger), Lenis, Split Type
- 유형: 반응형
- [사이트 바로가기](https://miraeae.github.io/urban-art)

![Image](https://github.com/user-attachments/assets/872d4535-84d4-4838-863b-7374f12dcd0b)

## 💡 Point
1. [가로 세로 스크롤](#1-가로-세로-스크롤)
2. [공통 텍스트 효과](#2-공통-텍스트-효과)
3. [호버 시 따라다니는 이미지](#3-호버-시-따라다니는-이미지)
4. [마스크 슬라이드](#4-마스크-슬라이드)
5. [마우스에 따라 움직이는 이미지](#5-마우스에-따라-움직이는-이미지)

***

### 1. 가로 세로 스크롤
``sticky``, ``GSAP ScrollTrigger``, 그리고 ``기하 프로퍼티(Geometry Properties)``를 활용하여 가로 및 세로 스크롤 애니메이션을 구현했습니다.

![Image](https://github.com/user-attachments/assets/2b398060-b2d3-40fc-90e2-43282601a832)

#### 🎨 CSS
``sticky`` 속성을 이용해 특정 영역 내에서 고정되도록 설정했습니다. sticky는 부모 요소의 높이 안에서만 적용되므로, 부모 요소의 height 값을 충분히 확보해주었습니다.

```
.parent {
    position: relative;
    height: 800vh;
}
.sticky {
    position: sticky;
    top: 0;
    height: 100vh;
}
```

#### 💻 JavaScript
GSAP의 ScrollTrigger를 활용하여 특정 스크롤 지점에서 애니메이션이 순차적으로 실행되도록 구성했습니다.
스크롤이 진행됨에 따라 가로, 세로 방향으로 콘텐츠가 이동하는 구조입니다.

#### 📌 타임라인 구성

콘텐츠가 총 두 개로 나뉘며, 중간 애니메이션이 포함되어 있습니다.

1. 첫번째 콘텐츠 영역만큼 x 방향으로 이동한 후 애니메이션이 실행됩니다.
2. 중간 애니메이션이 완료되면 다시 x 방향으로 이동하여 두번째 콘텐츠가 보여집니다.
3. 두번째 콘텐츠는 y 방향으로 이동합니다.

```
mainHorizTl
1️⃣ .to(mainContentInner, {
    x: () => -(mainContentVisual.offsetWidth - window.innerWidth),
    })
    .fromTo(".visual__about", {xPercent: 50}, {xPercent: -100}, '<')
    .to(".visual__always", {"--target": "0%"})

2️⃣ .to(mainContentInner, {
      x: () => -(mainContentVisual.offsetWidth - window.innerWidth) - window.innerWidth,})
    .to(".service__text-box", {yPercent: -100, duration: 1})
3️⃣ .to(".service__img-wrap", {
      y: () => -(document.querySelector(".service__img-wrap").offsetHeight - window.innerHeight), 
      duration: 1
    }, '<')
```

#### 기하 프로퍼티

|속성|설명|포함|제외|
|------|------|---|---|
|offsetWidth/Height|요소의 전체 너비/높이|콘텐츠, padding, border, scrollbar|margin|
|clientWidth/Height|요소의 콘텐츠 영역 너비/높이|콘텐츠, padding|margin, border, scrollbar|
|scrollWidth/Height|요소의 스크롤 가능한 콘텐츠 영역 너비/높이|콘텐츠, padding|margin, border, **scrollbar**|
|window.innerWidth/Height|브라우저 윈도우의 콘텐츠 영역 너비/높이|콘텐츠|브라우저의 UI 요소 (scrollbar, 주소창, 툴바 등)|
|window.outerWidth/Height|브라우저 화면의 전체 너비/높이|scrollbar, 주소창, 툴바|없음|

***

### 2. 공통 텍스트 효과

요소에 클래스를 추가하는 것만으로 적용되는 공통 텍스트 효과를 구현하였습니다.

![Image](https://github.com/user-attachments/assets/ecc7e539-333f-4d4d-94d8-5dd09982455d)

``forEach``를 사용하여 여러 개의 ``.text-up`` 클래스에 적용하였습니다. SplitType을 사용하여 텍스트를 분리해 준 후 텍스트가 아래에서 위로 올라오게 해 주었습니다.

```
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
```

***

### 3. 호버 시 따라다니는 이미지

요소에 호버 시 해당하는 이미지가 나타나고, 마우스를 따라다니는 효과를 구현하였습니다.

![Image](https://github.com/user-attachments/assets/20f4c130-7596-469f-8f53-3802422ca79a)
![Image](https://github.com/user-attachments/assets/86ff06f0-b822-421b-a386-7af98fa93565)

#### 🎨 CSS

처음에는 보이지 않도록 설정 후 ``on``되면 나타나도록 작성해주었습니다.

```
&__cursor{
    position: fixed;
    ...
    opacity: 0;
    height:0;
    transition: height 0.5s, opacity 0.5s 0.1s;

    &.on{
        height: 296px;
        opacity: 1;
    }

    &-img {
        ...
        height: 0;
        transition: height 1s;

        &.on {
            height: 100%;
        }
    }
}
```

#### 💻 JavaScript

마우스 움직임을 감지하여 커서가 마우스를 따라 이동하도록 만드는 코드를 작성하였습니다.

```
document.addEventListener("mousemove",(e) => { 
    cursor.style.top = `${e.clientY}px` // 마우스의 X 좌표
    cursor.style.left = `${e.clientX}px` // 마우스의 Y 좌표
    cursor.animate({
        top : `${e.clientY}px`, left : `${e.clientX}px` //마우스 위치로 cursor를 2초(2000ms) 동안 부드럽게 이동
    },2000)
});
```

마우스를 특정 요소 위에 올리면 해당 요소의 index 값과 동일한 값을 가진 ``cursorImg``에 ``on`` 클래스가 추가되도록 해주었습니다.

```
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
```


***

### 4. 마스크 슬라이드

``clip-path`` 속성을 활용하여 슬라이드 효과를 구현했습니다.

![Image](https://github.com/user-attachments/assets/25a9bd72-9f18-47f7-99fb-fb93635f0e48)

내부 콘텐츠는 sticky로 고정하고, 배경은 스크롤되어 겹쳐지도록 설정했습니다. 또한, 처음 상태에서는 첫 번째 슬라이드만 보이도록 설정하고, 나머지는 ``clip-path``로 숨겨주었습니다.
그 후 ``GSAP``와 ``ScrollTrigger``를 활용하여 스크롤에 따라 슬라이드가 자연스럽게 전환되도록 설정했습니다.

❗ 배경과 컨텐츠가 끝나는 시간은 동일하나 중간 과정에서 시차가 생기는 문제가 있었는데 ``ease: "none"``속성으로 해결했습니다.
```
const strengthTl = gsap.timeline({
    ❗ defaults: { ease: "none" },
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
```
- clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%) → 전체 보임
- clip-path: polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%) → 전체 안보임

***

### 5. 마우스에 따라 움직이는 이미지

사용자의 마우스 움직임에 따라 이미지가 이동하는 효과를 적용했습니다.

![Image](https://github.com/user-attachments/assets/3db772ee-02a4-422d-b799-00b01e940681)

1. **마우스 좌표 계산**: ``e.clientX/Y``를 사용하여 현재 마우스의 X, Y 좌표를 구합니다. 이를 화면의 중앙 좌표 ``window.innerWidth/Height / 2``와 비교하여, 마우스가 화면 중심에서 얼마나 이동했는지를 계산합니다.
2. **이미지 이동 속도 조절**: 마우스 이동량에 비례하여 이미지가 부드럽게 움직이도록, 이동 속도를 50으로 나누어 반응 속도를 줄입니다.

```
document.addEventListener('mousemove', function(e) {
    // 1️⃣ 마우스 좌표 계산
    let mouseX = e.clientX - window.innerWidth / 2;
    let mouseY = e.clientY - window.innerHeight / 2;

    // 2️⃣ 이미지 이동 속도 조절
    gsap.to(document.querySelector('.footer__info-profile img'), {
        x: mouseX / 50,
        y: mouseY / 50
    });
});
```

✅ 값이 클수록, 이미지가 반응하는 정도가 작아져 더 천천히 움직입니다.

- mouseX / 50: 마우스가 100px 이동하면, 이미지가 100 / 50 = 2px만큼 이동
- mouseX / 100: 마우스가 100px 이동하면, 이미지가 100 / 100 = 1px만큼 이동