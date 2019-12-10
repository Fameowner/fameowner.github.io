var
slides = document.getElementsByClassName('slider-item');
sсrolled = window.scrollY,
xpos = getCoordsY(document.getElementById('horscrollsection')) - getCoordsY(document.body)+0.02*window.innerHeight,
scrolledX = sсrolled - xpos,
pagewidth = window.innerWidth,
stop = 500,
vid1 = document.getElementById('vid1'),
vid2 = document.getElementById('vid2'),
vid3 = document.getElementById('vid3');

document.getElementById("home__services").style.cssText = `padding-left:` +  (document.getElementById("video-box").getBoundingClientRect().right - document.getElementById("t5").offsetWidth)  + `px`;

document.getElementById(`home__bg`).addEventListener("ended", () => {
        document.getElementById(`home__bg`).currentTime = 16;
        document.getElementById(`home__bg`).play();
});

// document.getElementById(`home__bg`).addEventListener("timeupdate", () => {
//         console.log(document.getElementById(`home__bg`).currentTime);
//         if (document.getElementById(`home__bg`).currentTime > 1) {
//                 document.getElementsByClassName(`video-box::after`).style.cssText = `animation-play-state: running;`;
//         }
// });


function pauseAll() {
        vid1.pause();
        vid2.pause();
        vid3.pause();
}

function showMenu() {
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
        document.getElementById(`start-project`).classList.toggle('startProject_opened');
        document.getElementById(`header`).classList.toggle(`headerHidden`);
        if (document.getElementById(`header`).classList.contains(`header_opened`)){
                showMenu();
        }
        pauseAll();
}

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
        var
        cloneSlide = slides[slides.length-1],
        clone = cloneSlide.cloneNode(true);
        clone.classList.add (`slider-item_move`);
        document.getElementById(`slider`).prepend(clone);
        slides[slides.length-1].remove();
        slides[1].classList.remove (`slider-item_move`);
        currNslide = Math.abs((currNslide-1)%(slides.length));
        currentSlideNumUpdate(currNslide);
}

function numButton (t) {
        t-=1;
        mov =  t - currNslide;
        if (mov < -1) {
                disableButtons();
                for (i=0;i<slides.length;i++){
                        slides[i].classList.add(`slider-item-fast`);
                }
                prev();
                let timerId = setInterval(() => prev(), 300);
                setTimeout(() => {
                        clearInterval(timerId); 
                        prev();
                        for (i=0;i<slides.length;i++){
                                slides[i].classList.remove(`slider-item-fast`);
                        } 
                }, (-mov-1)*299);
                setTimeout(() => {activateButtons();}, (-mov)*299+500);
        }
        else if (mov > 1) {
                disableButtons();
                for (i=0;i<slides.length;i++){
                        slides[i].classList.add(`slider-item-fast`);
                }
                next();
                let timerId = setInterval(() => next(), 300);
                setTimeout(() => {
                        clearInterval(timerId); 
                        next();
                        for (i=0;i<slides.length;i++){
                                slides[i].classList.remove(`slider-item-fast`);
                        } 
                }, (mov-1)*299);
                setTimeout(() => {activateButtons();}, (mov)*299+500);
        } else if (mov == 1) {
                next();
        } else if (mov == -1) {
                prev();
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

function bottomSelectorClick(t) {
        var b = document.getElementsByClassName(`our-vacancy__bottom-selector`);
        for(i = 0; i<b.length;i++){
                b[i].classList.remove(`our-vacancy__bottom-selector_selected`);
        }
        t.classList.add(`our-vacancy__bottom-selector_selected`);
        document.getElementById(`our-vacancy__bottom-ID`).scrollTo({left: document.getElementById(`our-vacancy__bottom-ID`).offsetWidth * (Number(t.text)-1), behavior: 'smooth' });
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
        bottomSelectorClick(document.getElementsByClassName(`our-vacancy__bottom-selector_selected`)[0]);
        document.getElementById("home__services").style.cssText = `padding-left:` +  (document.getElementById("video-box").getBoundingClientRect().right - document.getElementById("t5").offsetWidth)  + `px`;
});

function videoCheckAndPlay(vid) {
        if (vid.readyState != 0) {vid.play()}
}

var     vid1Rect = vid1.getBoundingClientRect(),
        vid2Rect = vid2.getBoundingClientRect();

window.onscroll = () => {
        vid1Rect = vid1.getBoundingClientRect();
        vid2Rect = vid2.getBoundingClientRect();

        vid1.style.opacity = vid1Rect.left/vid1Rect.width + .5;
        vid2.style.opacity = vid2Rect.left/vid2Rect.width + .5;

        document.getElementById(`services__left_2`).style.opacity = -(document.getElementById(`services__left_2`).getBoundingClientRect().left/window.innerWidth - .8);
        document.getElementById(`services__left_3`).style.opacity = -(document.getElementById(`services__left_3`).getBoundingClientRect().left/window.innerWidth - .8);

        sсrolled = window.scrollY;
        scrolledX = sсrolled - xpos-stop;

        if ((getCoordsY(document.getElementById(`home__end`)) <= 50 && getCoordsY(document.getElementById(`services`)) > 50)
        || (getCoordsY(document.getElementById(`our-stack`)) <= 50 && getCoordsY(document.getElementById(`our-vacancy`)) > 50 )
        || (getCoordsY(document.getElementById(`footer`)) <= 50)) {
        document.getElementById(`header`).classList.add (`nav-headerInverse`);
        } else {
        document.getElementById(`header`).classList.remove (`nav-headerInverse`);
        }
        if (window.innerWidth >  699) {
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

document.getElementById(`footer-top__box-space`).onmouseover = (m) => {
        document.getElementById(`helloBox`).src = "Res/doc_2019-11-26_14-24-53.mp4";
}

document.getElementById(`footer-top__box-space`).onmouseleave = (m) => {
        document.getElementById(`helloBox`).src = "";
}

document.getElementById(`footer`).onmousemove = (m) => {
        document.getElementById('helloBox').classList.add ('BoxShow');
        footerTopCenter = document.getElementById(`footer__top`).getBoundingClientRect(),
        document.getElementById(`helloBox`).style.left = footerTopCenter.left + footerTopCenter.width/2 + (m.clientX - (footerTopCenter.left + footerTopCenter.width/2)) *.06  + `px`;
        document.getElementById(`helloBox`).style.top = footerTopCenter.top + footerTopCenter.height/2 + (m.clientY -(footerTopCenter.top + footerTopCenter.height/2))*.06 + sсrolled + `px`;
}

document.getElementById(`footer`).onmouseleave = (m) => {
        setTimeout(`document.getElementById('helloBox').classList.remove ('BoxShow');`,250);
}



// document.getElementById(`our-vacancy__bottom-ID`).onmousemove = (m) => {
//         VacancyCenter = document.getElementById(`our-vacancy__bottom-ID`).getBoundingClientRect();
//                 document.getElementById('VacancyBox1').classList.add ('BoxShow');
//                 document.getElementById(`VacancyBox1`).style.left = VacancyCenter.left + VacancyCenter.width/2 + (m.clientX - (VacancyCenter.left + VacancyCenter.width/2)) *.1 + `px`;
//                 document.getElementById(`VacancyBox1`).style.top = VacancyCenter.top + VacancyCenter.height/2 + (m.clientY -(VacancyCenter.top + VacancyCenter.height/2))* .05 +  sсrolled + `px`;
// }


// document.getElementById(`our-vacancy__bottom-ID`).onmouseleave = (m) => {
//         setTimeout(`document.getElementById('VacancyBox1').classList.remove ('BoxShow');`,250);
// }