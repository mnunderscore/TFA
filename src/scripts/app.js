'use strict'
import $ from 'jquery';
import track from 'trackbuilder.js';

function changeColorIfVisible() {
    const leftColumn = $('.left-column');
    const topOfViewport = leftColumn.scrollTop();
    const bottomOfViewport = topOfViewport + leftColumn.height();

    $('.content__title').each(function() {
        const element = $(this);
        const topOfElement = element.offset().top - leftColumn.offset().top + topOfViewport;
        const bottomOfElement = topOfElement + element.outerHeight();

        if (topOfElement >= topOfViewport && bottomOfElement <= bottomOfViewport) {
            // The entire element is visible, change its color to green
            element.css('color', '#95FF00');
            element.css('font-weight', '700')
        } else {
            // The entire element is not visible, change its color back to original
            element.css('color', '');
            element.css('font-weight', '')
        }
    });
}

// Call the function initially
changeColorIfVisible();

// Call the function whenever the user scrolls in .left-column
$('.left-column').scroll(changeColorIfVisible);