TweenMax.from(".header-logo", 1, {
    opacity: 0,
    deplay: .2,
    x: -20,
    ease: Expo.easeInOut
})

TweenMax.staggerFrom(".header_nav nav ul li", 1, {
    opacity: 0,
    deplay: .4,
    x: -20,
    ease: Power3.easeInOut
}, 0.08)

TweenMax.from(".header_action", 1, {
    opacity: 0,
    delay: .6,
    x: -20,
    ease: Expo.easeInOut
})

TweenMax.from(".c-header_top", 1, {
    opacity: 0,
    y: -20,
    ease: Expo.easeInOut
})

TweenMax.from(".c-header", 1, {
    opacity: 0,
    y: -20,
    ease: Expo.easeInOut
})

TweenMax.from(".c-slider .title .title_sub", 1, {
    opacity: 0,
    delay: .5,
    y: 20,
    ease: Sine.ease
})
TweenMax.from(".c-slider .title h2", 1, {
    opacity: 0,
    delay: .7,
    y: 20,
    ease: Sine.ease
})
TweenMax.from(".c-slider .box_text", 1, {
    opacity: 0,
    delay: .9,
    y: 20,
    ease: Sine.ease
})
TweenMax.from(".c-slider .checklist", 1, {
    opacity: 0,
    delay: 1.1,
    y: 20,
    ease: Sine.ease
})
TweenMax.from(".c-slider .c-button", 1, {
    opacity: 0,
    delay: 1.3,
    y: 20,
    ease: Sine.ease
})
TweenMax.from(".c-slider", 1, {
    opacity: 0,
    delay: .2,
    y: 20,
    ease: Sine.ease
})