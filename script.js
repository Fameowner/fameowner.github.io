var
slides = document.getElementsByClassName('slider-item');
sсrolled = window.scrollY,
xpos = getCoordsY(document.getElementById('horscrollsection')) - getCoordsY(document.body)+0.02*window.innerHeight,
scrolledX = sсrolled - xpos,
pagewidth = window.innerWidth,
stop = 500,
vid1 = document.getElementById('vid1'),
vid2 = document.getElementById('vid2'),
vid3 = document.getElementById('vid3'),
vidBG =document.getElementById(`home__bg`),
bgCoordsList = getBgCoords();


vidBG.addEventListener("ended", () => {
        document.getElementById(`home__bg`).currentTime = 16;
        document.getElementById(`home__bg`).play();
});

vidBG.addEventListener("timeupdate", () => {
        if (document.getElementById(`home__bg`).currentTime > 9.5) {
                document.getElementById(`video-box_ID`).classList.add(`play`);
                document.getElementById(`home__services`).classList.add(`play`);
        }
});


function pauseAll() {
        vid1.pause();
        vid2.pause();
        vid3.pause();
}

document.addEventListener('touchmove', { passive: false }, (e)=>{
        e.preventDefault();
        console.log(e);
});

function isMobile(){
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
                return true
        } else{
                return false
        }
}

function showMenu() {
        if (isMobile()){
                document.body.classList.toggle('no-scroll');
        }
        document.getElementById(`ham`).classList.toggle('active');
        document.getElementById(`nav-header`).classList.toggle (`nav-header_opened`);
        document.getElementById(`header`).classList.toggle (`header_opened`);
        document.getElementById(`nav-button__left`).classList.toggle (`nav-button__left_opened`);
        document.getElementById(`header__bottom`).classList.toggle (`header__bottom_opened`);
        document.getElementById(`bg-blur`).classList.toggle (`bg-blur_opened`);
        document.getElementById(`nav-header`).classList.toggle (`nav-headerInverse`);
        pauseAll();
}

function showStartProject() {
        if (isMobile()){
                document.body.classList.toggle('no-scroll');
        }
        document.getElementById(`start-project`).classList.toggle('startProject_opened');
        document.getElementById(`header`).classList.toggle(`headerHidden`);
        if (document.getElementById(`header`).classList.contains(`header_opened`)){
                showMenu();
        }
        pauseAll();
}

document.getElementById(`start-project__form`).scrollTop=1;

document.getElementById(`start-project__form`).addEventListener("scroll", ()=>{
        if (document.getElementById(`start-project__form`).scrollTop + document.getElementById(`start-project__form`).clientHeight - document.getElementById(`start-project__form`).scrollHeight >=-1) {
                document.getElementById(`start-project__form`).scrollTo(0, (document.getElementById(`start-project__form`).scrollHeight-document.getElementById(`start-project__form`).clientHeight-1), "smooth");
        }
        if (document.getElementById(`start-project__form`).scrollTop <=1) {
                document.getElementById(`start-project__form`).scrollTo(0, 1, "smooth");
        }
})

var textarea = document.querySelector('textarea');
        textarea.addEventListener('keydown', autosize);

function autosize(){
        var el = this;
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
}

var currNslide = 0

function currentSlideNumUpdate(N) {
        NumNav = document.getElementsByClassName(`our-works__buttonN`);
        N = N%NumNav.length;
        for (i=0;i<NumNav.length;i++) {
                NumNav[i].classList.remove(`our-works-buttonN_current`);
        }
        NumNav[N].classList.add(`our-works-buttonN_current`);
}

function disableButtons() {
        NumNav = document.getElementsByClassName(`our-works__buttonN`);
        for (i = 0; i < NumNav.length; i++) {
                NumNav[i].disabled = true;
        }
        document.getElementById(`our-works-slider__next`).disabled = true;
}
function activateButtons() {
        NumNav = document.getElementsByClassName(`our-works__buttonN`);
        for (i = 0; i < NumNav.length; i++) {
                NumNav[i].disabled = false;
        }
        document.getElementById(`our-works-slider__next`).disabled = false;
}

function nextButton(){
        next();
        disableButtons();
        setTimeout(() => {
                activateButtons();
        }, 900);
}


function next() {
        var cloneSlide,clone;
        cloneSlide = slides[0],
        clone = cloneSlide.cloneNode(true);
        clone.classList.remove (`slider-item_move`);
        document.getElementById(`slider`).appendChild(clone);
        slides[0].remove();
        slides[0].classList.add (`slider-item_move`);
        currNslide = (currNslide+1)%(slides.length);
        currentSlideNumUpdate(currNslide);
}

function prev() {
        var cloneSlide,clone;
        cloneSlide = slides[slides.length-1];
        clone = cloneSlide.cloneNode(true);
        clone.classList.add (`slider-item_move`);
        document.getElementById(`slider`).prepend(clone);
        slides[slides.length-1].remove();
        slides[1].classList.remove (`slider-item_move`);
        currNslide = Math.abs((currNslide-1)%(slides.length));
        currentSlideNumUpdate(currNslide);
}

function numButton (t) {
        var delay = 300;
        t-=1;
        mov =  t - currNslide;
        if (mov < -1) {
                disableButtons();
                for (i=0;i<slides.length;i++){
                        slides[i].classList.add(`slider-item-fast`);
                }
                prev();
                let timerId = setInterval(() => prev(), delay);
                setTimeout(() =>
                {
                        clearInterval(timerId);
                        prev();
                        for (i=0;i<slides.length;i++){
                                slides[i].classList.remove(`slider-item-fast`);
                        }
                },
                (-mov-1)*(delay-1));
                setTimeout(() => {activateButtons();}, (-mov)*(delay-1)+500);
        }
        else if (mov > 1) {
                disableButtons();
                for (i=0;i<slides.length;i++){
                        slides[i].classList.add(`slider-item-fast`);
                }
                next();
                let timerId = setInterval(() => next(), delay);
                setTimeout(() => {
                        clearInterval(timerId);
                        next();
                        for (i=0;i<slides.length;i++){
                                slides[i].classList.remove(`slider-item-fast`);
                        }
                }, (mov-1)*(delay-1));
                setTimeout(() => {activateButtons();}, (mov)*(delay-1)+500);
        } else if (mov == 1) {
                disableButtons();
                next();
                setTimeout(() => {activateButtons();}, 800)
        } else if (mov == -1) {
                disableButtons();
                prev();
                setTimeout(() => {activateButtons();}, 800)
        }
}

function getCoordsY(elem) {
        let box = elem.getBoundingClientRect();
        return (box.top)
}

function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
}

// function lettering()
// {
//         let     str0 = "Back-end разработчик",
//                 str2 = "",
//                 str = "Front-end разработчик";
//                 j = 0;

//         let timerId = setInterval(() =>
//         {
//                 if (j<str0.length) {
//                         document.getElementById(`our-vacancy__bottom-header_ID`).innerHTML = str0.substring(0, str0.length - j);
//                 }
//                 else {
//                         str2+=str[j-str0.length];
//                         document.getElementById(`our-vacancy__bottom-header_ID`).innerHTML = str2;
//                 }
//                 j++;
//         }, 100);
//         setTimeout(() => {
//                 clearInterval(timerId);
//         }, 100*(str0.length+str.length))
// }

function bottomSelectorClick(t) {

        document.getElementById(`our-vacancy__bottom-header__UL-ID`).style.cssText = `transform: translateY(`+(-36*(Number(t.text)-1))+`px);`;

        let b = document.getElementsByClassName(`our-vacancy__bottom-selector`);
        for(i = 0; i<b.length;i++){
                b[i].classList.remove(`our-vacancy__bottom-selector_selected`);
        }
        t.classList.add(`our-vacancy__bottom-selector_selected`);
        let vacList = document.getElementsByClassName(`our-vacancy__bottom-item`);
        for (i=0;i<vacList.length;i++){
                vacList[i].style = `opacity: 0`
        }
        setTimeout(()=> {
                for (i=0;i<vacList.length;i++){
                        vacList[i].classList.add(`hidden`);
                }
                vacList[(Number(t.text)-1)].classList.remove(`hidden`);
        }
        ,300)
        setTimeout(()=> {

                vacList[(Number(t.text)-1)].style = `opacity: 1`
        }
        ,600)
}


window.addEventListener(`resize`, () => {
        if (document.getElementById(`horscrollsection`).classList.contains(`cardHold`)) {
                document.getElementById(`horscrollsection`).classList.remove(`cardHold`);
                xpos = getCoordsY(document.getElementById('horscrollsection')) - getCoordsY(document.body)+0.02*window.innerHeight;
                pagewidth = window.innerWidth;
                document.getElementById(`horscrollsection`).classList.add(`cardHold`);
        }
        else if (document.getElementById(`services`).classList.contains(`scrollspacescrolled`))
        {
                document.getElementById(`services`).classList.remove (`scrollspacescrolled`);
                xpos = getCoordsY(document.getElementById('horscrollsection')) - getCoordsY(document.body)+0.02*window.innerHeight;
                pagewidth = window.innerWidth
                document.getElementById(`services`).classList.add (`scrollspacescrolled`);
        } else {
                xpos = getCoordsY(document.getElementById('horscrollsection')) - getCoordsY(document.body)+0.02*window.innerHeight;
                pagewidth = window.innerWidth;
        }
        // bottomSelectorClick(document.getElementsByClassName(`our-vacancy__bottom-selector_selected`)[0]);
        bgCoordsList = getBgCoords();
        // document.getElementById("home__services").style.cssText = `padding-left:` +  (document.getElementById("video-box_ID").getBoundingClientRect().right - document.getElementById("t5").offsetWidth)  + `px`;
});

function videoCheckAndPlay(vid) {
        if (vid.readyState != 0) {vid.play()}
}

function navHeaderInverse(act) {
        if (act == `remove`) {document.getElementById(`header`).classList.remove (`nav-headerInverse`)}
        else if (act == `add`){document.getElementById(`header`).classList.add (`nav-headerInverse`)}
}

function getBgCoords() {
        let     a = document.getElementsByClassName(`js-bg_black`),
                b = document.getElementsByClassName(`js-bg_white`),
                coordsA = [],
                coordsB = [],
                bgCoords = [],
                last;
        for (i=0;i<a.length;i++) {
                coordsA.push(getCoordsY(a[i])+sсrolled);
        }
        for (i=0;i<b.length;i++) {
                coordsB.push(getCoordsY(b[i])+sсrolled);
        }
        let s = coordsA.length+coordsB.length;
        for (i=0;i<s;i++){
                if (coordsA[0]<coordsB[0])
                        {
                                if (last != `a`) {bgCoords.push(coordsA[0]);}
                                if (coordsA.length>1) {coordsA.shift();}
                                last = `a`;
                        }
                else if (coordsA[0]>coordsB[0])
                        {
                                if (last != `b`) {bgCoords.push(coordsB[0]);}
                                if (coordsB.length>1){coordsB.shift();}
                                last = `b`;
                        }
                if (i==s-1) {
                        bgCoords.push(Math.max(coordsA[0],coordsB[0]));
                        bgCoords.push(document.body.getBoundingClientRect().height);
                }
        }
        return (bgCoords);
}


function navHeaderInverseControl(arg, curY)
{
        if (curY > document.innerHeight) {
                document.getElementById(`header`).classList.add (`nav-headerInverse`);
        }
        else
        {
                for (i=0; i<arg.length; i++){
                        if ((arg[i] < curY+50)&(curY+50<arg[i+1]))
                        {
                                if (i%2 == 1) {document.getElementById(`header`).classList.add (`nav-headerInverse`);}
                                else {document.getElementById(`header`).classList.remove (`nav-headerInverse`);}
                                break;
                        }
                }
        }
}

var     vid1Rect = vid1.getBoundingClientRect(),
        vid2Rect = vid2.getBoundingClientRect(),
        animHomeEndPassed = false;

window.onscroll = () => {

        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);

        vid1Rect = vid1.getBoundingClientRect();
        vid2Rect = vid2.getBoundingClientRect();

        sсrolled = window.scrollY;
        scrolledX = sсrolled - xpos-stop;

        navHeaderInverseControl(bgCoordsList,sсrolled);

        if (document.getElementById(`text-animation-onscroll_01`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`text-animation-onscroll_01`).classList.remove(`paused`);
                document.getElementById(`home-end__tagline`).classList.remove(`paused`);
        }

        if (document.getElementById(`text-animation-onscroll_02`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`text-animation-onscroll_02`).classList.remove(`paused`);
        }

        if (document.getElementById(`text-animation-onscroll_02_01`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`text-animation-onscroll_02_01`).classList.remove(`paused`);
        }

        if (document.getElementById(`text-animation-onscroll_03`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`text-animation-onscroll_03`).classList.remove(`paused`);
        }

        if (document.getElementById(`text-animation-onscroll_04`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`text-animation-onscroll_04`).classList.remove(`paused`);
        }

        if (document.getElementById(`text-animation-onscroll_05`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`text-animation-onscroll_05`).classList.remove(`paused`);
        }

        if (document.getElementById(`become-first`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`become-first`).classList.remove(`paused`);
        }

        if (document.getElementById(`our-vacancy-01`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`our-vacancy-01`).classList.remove(`paused`);
        }

        if (document.getElementById(`footer__top`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`footer__top`).classList.remove(`paused`);
        }

        if (document.getElementById(`our-stack__item-list_ID`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`our-stack__item-list_ID`).classList.add(`visible`);
        }

        if (document.getElementById(`our-vacancy__bottom-ID`).getBoundingClientRect().top<window.innerHeight-50) {
                document.getElementById(`our-vacancy__bottom-ID`).classList.add(`visible`);
        }

        if (document.getElementById(`slider-item__1`).getBoundingClientRect().top<window.innerHeight*(2/3)) {
                document.getElementById(`slider-item__1`).classList.remove(`moved-right`);
        }

        if (window.innerWidth >  699) {
                vid1.style.opacity = vid1Rect.left/vid1Rect.width + .5;
                vid2.style.opacity = vid2Rect.left/vid2Rect.width + .5;

                document.getElementById(`services__left_2`).style.opacity = -(document.getElementById(`services__left_2`).getBoundingClientRect().left/window.innerWidth - .8);
                document.getElementById(`services__left_3`).style.opacity = -(document.getElementById(`services__left_3`).getBoundingClientRect().left/window.innerWidth - .8);
                if (scrolledX >= 2*pagewidth) {;
                vid1.pause();
                vid2.pause();
                videoCheckAndPlay(vid3);
                } else if (scrolledX >= pagewidth) {
                vid1.pause();
                videoCheckAndPlay(vid2);
                if (scrolledX >= 1.5*pagewidth) {
                        videoCheckAndPlay(vid3);
                } else {vid3.pause();}
                } else if (scrolledX > 0) {
                videoCheckAndPlay(vid1);
                if (scrolledX >= .5*pagewidth){
                        videoCheckAndPlay(vid2);
                } else {vid2.pause();}
                vid3.pause();
                } else if (scrolledX <= 0) {
                if (scrolledX >= - window.innerHeight) {
                        videoCheckAndPlay(vid1);
                } else {vid1.pause();}
                vid2.pause();
                vid3.pause();
                }
                document.getElementById('horscrollsection').scrollLeft = scrolledX;

                if (sсrolled < xpos - window.innerHeight - stop)
                {
                        document.getElementById(`horscrollsection`).classList.remove (`cardHold`);
                        document.getElementById(`services`).classList.remove (`scrollspacescrolled`);
                } else if (sсrolled >= xpos - window.innerHeight && scrolledX + window.innerWidth <=  document.getElementById('horscrollsection').scrollWidth+stop) {
                        document.getElementById(`horscrollsection`).classList.add (`cardHold`);
                        document.getElementById(`services`).classList.remove (`scrollspacescrolled`);
                        if (sсrolled >= xpos - window.innerHeight/2) {
                                document.getElementById(`contact-us-block`).classList.remove('contact-us-blockClosed');
                        } else {
                                document.getElementById(`contact-us-block`).classList.add('contact-us-blockClosed');
                        }
                        } else if (scrolledX + window.innerWidth > document.getElementById('horscrollsection').scrollWidth+stop && scrolledX + window.innerWidth <=  document.getElementById('horscrollsection').scrollWidth + stop + window.innerHeight){
                        document.getElementById(`services`).classList.add (`scrollspacescrolled`);
                        document.getElementById(`contact-us-block`).classList.add('contact-us-blockClosed');
                        document.getElementById(`horscrollsection`).classList.add (`cardHold`);
                } else {
                        document.getElementById(`horscrollsection`).classList.remove (`cardHold`);
                        document.getElementById(`contact-us-block`).classList.add('contact-us-blockClosed');
                }
                document.getElementById(`bg-titleID`).style = `transform: translate3d(` + document.getElementById('horscrollsection').scrollLeft * (-.08) + `px , 0px, 0px)`;
        }
};

document.getElementById("slider").ondragstart = () => {
        return(false);
}

if (window.innerWidth >  699)
        {
                document.getElementById(`footer__top`).onmouseover = (m) => {
                document.getElementById(`helloBox`).src = "Res/doc_2019-11-26_14-24-53.mp4";
        }

        document.getElementById(`footer__top`).onmouseleave = (m) => {
                document.getElementById(`helloBox`).src = "";
        }

        document.getElementById(`footer`).onmousemove = (m) => {
                document.getElementById('helloBox').classList.add ('BoxShow');
                let footerTopCenter = document.getElementById(`footer__top`).getBoundingClientRect();
                document.getElementById(`helloBox`).style.left = footerTopCenter.left + footerTopCenter.width/2 + (m.clientX - (footerTopCenter.left + footerTopCenter.width/2)) *.06  + `px`;
                document.getElementById(`helloBox`).style.top = footerTopCenter.top + footerTopCenter.height/2 + (m.clientY -(footerTopCenter.top + footerTopCenter.height/2))*.06 + sсrolled + `px`;
        }

        document.getElementById(`footer`).onmouseleave = (m) => {
                setTimeout(`document.getElementById('helloBox').classList.remove ('BoxShow');`,250);
        }
}
else {
        document.getElementById('helloBox').classList.add ('BoxShow');
        document.getElementById(`helloBox`).src = "Res/doc_2019-11-26_14-24-53.mp4";
}

function showVac(t){
        t.classList.toggle(`open`);
}