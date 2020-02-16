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

document.getElementById(`home-title__t5`).style= `width:`+ (document.getElementById(`home-title__t5`).clientWidth+2) + "px";

function vidBGTimeupdate(){
        if (document.getElementById(`home__bg`).currentTime > 9.5) {
                document.getElementById(`video-box_ID`).classList.add(`play`);
                lettering(homeTitles[homeTitlesText.length-1], homeTitlesText[homeTitlesText.length-1],70,0);
                vidBG.removeEventListener("timeupdate",vidBGTimeupdate);
        }
}

if (!isMobile())  {
        vidBG.addEventListener("timeupdate", vidBGTimeupdate);

}

function pauseAll() {
        vid1.pause();
        vid2.pause();
        vid3.pause();
}

document.addEventListener('touchmove', { passive: false }, (e)=>{
        e.preventDefault();
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
        if (document.getElementById(`start-project`).classList.contains('startProject_opened')){
                setTimeout(() => {
                        document.getElementById(`start-project`).classList.toggle('startProject_preopened');
                }, 500);
                document.getElementById(`start-project`).classList.toggle('startProject_opened');
                document.getElementById(`js-close-button__SVG`).classList.add(`active`);
        }
        else {
                document.getElementById(`start-project`).classList.toggle('startProject_preopened');
                setTimeout(() => {
                        document.getElementById(`start-project`).classList.toggle('startProject_opened');
                }, 1);
                document.getElementById(`js-close-button__SVG`).classList.remove(`active`);
        }

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


function getCoordsY(elem) {
        let box = elem.getBoundingClientRect();
        return (box.top)
}

function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
}

function lettering(elem, str, t, d){
        let     str0 = "",
                j = 0;

        setTimeout(() => {
                let timerId = setInterval(() =>{
                        if (j<=str.length) {
                                elem.innerHTML = str.substring(0, j);
                                j++;
                        }
                        else{
                                clearInterval(timerId);
                        }
                }, t);
        }, d)
}

var     homeTitles = document.getElementsByClassName("home__title"),
        homeTitlesText = [],
        homeTitlesD = [],
        tempT = 0;

for (let i = 0; i < homeTitles.length; i++) {
        homeTitlesText.push(homeTitles[i].innerHTML);
        homeTitlesD.push(tempT);
        tempT+=homeTitles[i].innerHTML.length;
        homeTitles[i].innerHTML = "";
}

for (let i = 0; i < homeTitles.length - 1; i++) {
        lettering(homeTitles[i], homeTitlesText[i],70,homeTitlesD[i]*100);
}


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
        //bgCoordsList = getBgCoords();
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
                coordsA.push(getCoordsY(a[i])+window.scrollY);
        }
        for (i=0;i<b.length;i++) {
                coordsB.push(getCoordsY(b[i])+window.scrollY);
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
        // if (curY > document.innerHeight - window.innerHeight) {
        //         document.getElementById(`header`).classList.add (`nav-headerInverse`);
        // }
        // else
        // {
                for (i=0; i<arg.length; i++){
                        if ((arg[i] < curY+50)&(curY+50<arg[i+1]))
                        {
                                if (i%2 == 1) {document.getElementById(`header`).classList.add (`nav-headerInverse`);}
                                else {document.getElementById(`header`).classList.remove (`nav-headerInverse`);}
                                break;
                        }
                }
        //}
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
        } else {
                if (document.getElementById(`vid1`).getBoundingClientRect().top<window.innerHeight) {
                        document.getElementById(`vid1`).play();
                }
                if (document.getElementById(`vid2`).getBoundingClientRect().top<window.innerHeight) {
                        document.getElementById(`vid2`).play();
                }
                if (document.getElementById(`vid3`).getBoundingClientRect().top<window.innerHeight) {
                        document.getElementById(`vid3`).play();
                }
        }
};


// if (window.innerWidth >  699)
//         {
//                 document.getElementById(`footer__top`).onmouseover = (m) => {
//                 document.getElementById(`helloBox`).src = "Res/doc_2019-11-26_14-24-53.mp4";
//         }

//         document.getElementById(`footer__top`).onmouseleave = (m) => {
//                 document.getElementById(`helloBox`).src = "";
//         }

//         document.getElementById(`footer`).onmousemove = (m) => {
//                 document.getElementById('helloBox').classList.add ('BoxShow');
//                 let footerTopCenter = document.getElementById(`footer__top`).getBoundingClientRect();
//                 document.getElementById(`helloBox`).style.left = footerTopCenter.left + footerTopCenter.width/1.2 + (m.clientX  - (footerTopCenter.left + footerTopCenter.width/2)) *.06  + `px`;
//                 document.getElementById(`helloBox`).style.top = footerTopCenter.top + footerTopCenter.height/4 + (m.clientY -(footerTopCenter.top + footerTopCenter.height/2))*.06 + sсrolled + `px`;
//         }

//         document.getElementById(`footer`).onmouseleave = (m) => {
//                 setTimeout(`document.getElementById('helloBox').classList.remove ('BoxShow');`,250);
//         }
// }
// else {
//         document.getElementById('helloBox').classList.add ('BoxShow');
//         document.getElementById(`helloBox`).src = "Res/doc_2019-11-26_14-24-53.mp4";
// }

function showVac(t){
        t.classList.toggle(`open`);
}

function ourStackOpen(t){
        t.classList.toggle(`open`);
}

var     ourWorksItems = document.getElementsByClassName(`our-work__item`),
        ourWorkImg = document.getElementById(`js-our-work__img`),
        ourWorks = document.getElementById(`our-works`),
        imgList = [];


for (let i = 0; i < ourWorksItems.length; i++) {
        imgList.push(document.getElementById(`js-our-work__img`+ (i+1)))
}

for (let i = 0; i < ourWorksItems.length; i++) {
        ourWorksItems[i].addEventListener("mouseover",()=>{
                imgList[i].classList.add(`on-hover`);
        })
        ourWorksItems[i].addEventListener("mouseout",()=>{
                imgList[i].classList.remove(`on-hover`);
        })
}


ourWorks.addEventListener("mousemove", (m)=>{
        for (let i = 0; i < imgList.length; i++) {
                imgList[i].style.left = (50 - (m.clientX - window.outerWidth/2)*.005) + `%`;
                imgList[i].style.top = (50 - (m.clientY  - window.outerHeight/2)*.005)  + `%`;
        }
})