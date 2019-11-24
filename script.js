var
slides = document.getElementsByClassName('sliderItem');
sсrolled = window.scrollY,
xpos = getCoordsY(document.getElementById('horscrollsection')) - getCoordsY(document.body)+0.02*window.innerHeight,
scrolledX = sсrolled - xpos,
pagewidth = window.innerWidth,
stop = 500


function showMenu() {
        document.getElementById(`ham`).classList.toggle('active');
        document.getElementById(`header`).classList.toggle (`headerOpen`);
        document.getElementById(`navButtonLeft`).classList.toggle (`navButtonLeftOpen`);
        document.getElementById(`headerBottom`).classList.toggle (`headerBottomOpen`);
        document.getElementById(`bgBlur`).classList.toggle (`bgBlurOpen`);
        document.getElementById(`navHeader`).classList.toggle (`navHeaderInverse`);
        document.getElementById('vid1').pause();
        document.getElementById('vid2').pause();
        document.getElementById('vid3').pause();
}

function showStartProject() {
        document.getElementById(`startProject`).classList.toggle('startProjectOpen');
        document.getElementById(`header`).classList.toggle(`headerHidden`);
        if (document.getElementById(`header`).classList.contains(`headerOpen`)){
                showMenu();
        }
}

var textarea = document.querySelector('textarea');
        textarea.addEventListener('keydown', autosize);

function autosize(){
        var el = this;
        el.style.cssText = 'height:auto; padding:0';
        el.style.cssText = 'height:' + el.scrollHeight + 'px';
}

function next() {
        var
        cloneSlide = slides[0],
        clone = cloneSlide.cloneNode(true);
        clone.classList.remove (`sliderItemMove`);
        document.getElementById(`slider`).appendChild(clone);
        slides[0].remove();
        slides[0].classList.add (`sliderItemMove`);
        document.getElementById(`buttonNext`).disabled = true;
        document.getElementById(`buttonPrev`).disabled = true;
        setTimeout('document.getElementById(`buttonNext`).disabled = false; document.getElementById(`buttonPrev`).disabled = false;', 1000);
}

function prev() {
        var
        cloneSlide = slides[slides.length-1],
        clone = cloneSlide.cloneNode(true);
        clone.classList.add (`sliderItemMove`);
        document.getElementById(`slider`).prepend(clone);
        slides[slides.length-1].remove();
        slides[1].classList.remove (`sliderItemMove`);
        document.getElementById(`buttonNext`).disabled = true;
        document.getElementById(`buttonPrev`).disabled = true;
        setTimeout('document.getElementById(`buttonNext`).disabled = false; document.getElementById(`buttonPrev`).disabled = false;', 1000);
}

function getCoordsY(elem) {
        let box = elem.getBoundingClientRect();
        return (box.top)
}

function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
}

function resizeWindow() {
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
        pagewidth = window.innerWidth;
}

window.addEventListener('onchange', resizeWindow());

window.onscroll = () => {
        sсrolled = window.scrollY;
        scrolledX = sсrolled - xpos-stop;

        if ((getCoordsY(document.getElementById(`homeEnd`)) <= 50 && getCoordsY(document.getElementById(`services`)) > 50)
        || (getCoordsY(document.getElementById(`ourStack`)) <= 50 && getCoordsY(document.getElementById(`ourVacancy`)) > 50 )
        || (getCoordsY(document.getElementById(`footer`)) <= 50)) {
        document.getElementById(`header`).classList.add (`navHeaderInverse`);
        } else {
        document.getElementById(`header`).classList.remove (`navHeaderInverse`);
        }

        if (sсrolled > window.innerHeight+stop){
        document.getElementById('marqueeBG').classList.remove('marqueeBG')
        } else document.getElementById('marqueeBG').classList.add('marqueeBG');

        if (scrolledX >= 2*pagewidth) {
        document.getElementById('vid1').pause();
        document.getElementById('vid2').pause();
        document.getElementById('vid3').play();
        } else if (scrolledX >= pagewidth) {
        document.getElementById('vid1').pause();
        document.getElementById('vid2').play();
        if (scrolledX >= 1.5*pagewidth) {
                document.getElementById('vid3').play();
        } else {document.getElementById('vid3').pause();}
        } else if (scrolledX > 0) {
        document.getElementById('vid1').play();
        if (scrolledX >= .5*pagewidth){
                document.getElementById('vid2').play();
        } else {document.getElementById('vid2').pause();}
        document.getElementById('vid3').pause();
        } else if (scrolledX <= 0) {
        if (scrolledX >= - window.innerHeight) {
                document.getElementById('vid1').play();
        } else {document.getElementById('vid1').pause();}
        document.getElementById('vid2').pause();
        document.getElementById('vid3').pause();
        }
        document.getElementById('horscrollsection').scrollLeft = scrolledX;

        if (sсrolled < xpos - window.innerHeight )
        {
                document.getElementById(`horscrollsection`).classList.remove (`cardHold`);
                document.getElementById(`services`).classList.remove (`scrollspacescrolled`);
        } else if (sсrolled >= xpos - window.innerHeight && scrolledX + window.innerWidth <=  document.getElementById('horscrollsection').scrollWidth+stop) {
                document.getElementById(`horscrollsection`).classList.add (`cardHold`);
                document.getElementById(`services`).classList.remove (`scrollspacescrolled`);
                document.getElementById(`ContactUsBlock`).classList.remove('ContactUsBlockClosed');
        } else if (scrolledX + window.innerWidth > document.getElementById('horscrollsection').scrollWidth+stop && scrolledX + window.innerWidth <=  document.getElementById('horscrollsection').scrollWidth + stop + window.innerHeight){
                document.getElementById(`services`).classList.add (`scrollspacescrolled`);
                document.getElementById(`ContactUsBlock`).classList.add('ContactUsBlockClosed');
                document.getElementById(`horscrollsection`).classList.add (`cardHold`);
        } else {
                document.getElementById(`horscrollsection`).classList.remove (`cardHold`);
                document.getElementById(`ContactUsBlock`).classList.add('ContactUsBlockClosed');
        }
};

document.getElementById("slider").ondragstart = () => {
        return(false);
}

document.getElementById(`footer`).onmousemove = (m) => {
        document.getElementById('helloBox').classList.add ('BoxShow');
        footerTopCenter = document.getElementById(`footerTop`).getBoundingClientRect(),
        document.getElementById(`helloBox`).style.left = footerTopCenter.left + footerTopCenter.width/2 + (m.clientX - (footerTopCenter.left + footerTopCenter.width/2)) *.06  + `px`;
        document.getElementById(`helloBox`).style.top = footerTopCenter.top + footerTopCenter.height/2 + (m.clientY -(footerTopCenter.top + footerTopCenter.height/2))*.06 + sсrolled + `px`;
}

document.getElementById(`footer`).onmouseleave = (m) => {
        setTimeout(`document.getElementById('helloBox').classList.remove ('BoxShow');`,250);
}

document.getElementById(`ourVacancy`).onmousemove = (m) => {
        VacancyFrontEndCenter = document.getElementById(`VacancyFrontEnd`).getBoundingClientRect();
        VacancyBackEndCenter = document.getElementById(`VacancyBackEnd`).getBoundingClientRect();
        ourVacancyCenter = document.getElementById(`ourVacancy`).getBoundingClientRect();
        document.getElementById('VacancyBox1').classList.add ('BoxShow');
        document.getElementById('VacancyBox2').classList.add ('BoxShow');
        document.getElementById(`VacancyBox1`).style.left = VacancyFrontEndCenter.left + VacancyFrontEndCenter.width/2 + (m.clientX - (VacancyFrontEndCenter.left + VacancyFrontEndCenter.width/2)) *.1 + randomInteger(1,5) + `px`;
        document.getElementById(`VacancyBox1`).style.top = VacancyFrontEndCenter.top + VacancyFrontEndCenter.height/2 + (m.clientY -(VacancyFrontEndCenter.top + VacancyFrontEndCenter.height/2))* .05 + randomInteger(1,5) + sсrolled + `px`;
        document.getElementById(`VacancyBox2`).style.left = VacancyBackEndCenter.left + VacancyBackEndCenter.width/2 + (m.clientX - (VacancyBackEndCenter.left + VacancyBackEndCenter.width/2)) *.03 + randomInteger(1,5) + `px`;
        document.getElementById(`VacancyBox2`).style.top = VacancyBackEndCenter.top + VacancyBackEndCenter.height/2 + (m.clientY -(VacancyBackEndCenter.top + VacancyBackEndCenter.height/2))*.06 + randomInteger(1,5) + sсrolled + `px`;
}

document.getElementById(`ourVacancy`).onmouseleave = (m) => {
        setTimeout(`document.getElementById('VacancyBox1').classList.remove ('BoxShow');`,250);
        setTimeout(`document.getElementById('VacancyBox2').classList.remove ('BoxShow');`,250);
}