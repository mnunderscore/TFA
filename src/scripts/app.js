'use strict'
import $ from 'jquery';
import 'trackbuilder.js';
import { gsap } from "gsap";

function changeColorIfVisible() {
    const leftColumn = $('.left-column');
    const topOfViewport = leftColumn.scrollTop();
    const bottomOfViewport = topOfViewport + leftColumn.height();

    $('.content__title').each(function() {
        const element = $(this);
        const topOfElement = element.offset().top - leftColumn.offset().top + topOfViewport;
        const bottomOfElement = topOfElement + element.outerHeight();

        if (topOfElement >= topOfViewport && bottomOfElement <= bottomOfViewport) {

            element.css('color', '#95FF00');
            element.css('font-weight', '700')
        } else {

            element.css('color', '');
            element.css('font-weight', '')
        }
    });
}

function highlightCurrentSection() {
    const leftColumn = $('.left-column');
    const topOfViewport = leftColumn.scrollTop();
    const bottomOfViewport = topOfViewport + leftColumn.height();


    $('.navbar__item').removeClass('navbar__item--active');


    const topSection = $('#top');
    const topSectionTop = topSection.offset().top - leftColumn.offset().top + topOfViewport;
    const topSectionBottom = topSectionTop + topSection.outerHeight();
    const topVisibleArea = Math.min(bottomOfViewport, topSectionBottom) - Math.max(topOfViewport, topSectionTop);

    if (topVisibleArea > 0) {
        $('.navbar__item a[href="#top"]').parent().addClass('navbar__item--active');
        return;
    }


    let maxVisibleArea = 0;
    let maxVisibleSectionId = '';

    $('.content__block').each(function() {
        const section = $(this);
        const sectionId = section.attr('id');

        const topOfSection = section.offset().top - leftColumn.offset().top + topOfViewport;
        const bottomOfSection = topOfSection + section.outerHeight();
        const visibleArea = Math.min(bottomOfViewport, bottomOfSection) - Math.max(topOfViewport, topOfSection);

        if (visibleArea > maxVisibleArea) {
            maxVisibleArea = visibleArea;
            maxVisibleSectionId = sectionId;
        }
    });


    if (maxVisibleSectionId !== '') {
        $('.navbar__item a[href="#' + maxVisibleSectionId + '"]').parent().addClass('navbar__item--active');
    }
}


var timeline = gsap.timeline();

timeline.fromTo(".animation .title",{
    opacity:0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
},{
    opacity:1,
    duration: 1,
    ease: "power1.out",
},"0");
timeline.fromTo(".animation .title",{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    duration: 3,
},{
    opacity:1,
    top: "35%",
    duration: 1,
    ease: "power1.out",
    delay: 1
},">");
timeline.fromTo(".animation .subtitle",{
    opacity:0,
    visibility: "hidden",
    height:0,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    position: "absolute",
    duration: 1,
},{
    opacity:1,
    visibility: "visible",
    height: "auto",
    duration:1,
    ease: "power1.out",
},">");
timeline.to(".animation .title",{
    opacity: 0,
    duration: 0.5,
    delay: 2,
    ease: "power1.out",
},">");
timeline.to(".animation .subtitle",{
    opacity: 0,
    duration: 0.5,
    ease: "power1.out",
},"<");
timeline.to(".animation .title",{
    visibility: "hidden",
    height:0,
    duration:0,
},">");
timeline.to(".animation .subtitle",{
    visibility: "hidden",
    height:0,
    duration:0,
},"<");
timeline.from(".page__container",{
    opacity: 0,
    duration: 1,
    ease: "power1.out",
},">");

changeColorIfVisible();
highlightCurrentSection();


$('.left-column').scroll(changeColorIfVisible);
$('.left-column').scroll(highlightCurrentSection);
