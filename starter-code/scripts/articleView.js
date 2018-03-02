'use strict';

let articleView = {};

// TODO: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// The arrow function makes it so the function no longer knows what 'this' is. So when using arrow functions make sure to take into account all the 'this's. 

articleView.populateFilters = () => {

    function populateFilterOptions(article, dataAttr, selectedID) {
        const data = $(article).attr(dataAttr);

        if ($(`${selectedID} option[value="${data}"]`).length === 0) {
            const optionTag = `<option value="${data}">${data}</option>`;
            $(selectedID).append(optionTag);
        }
    }

    $('article').each(function() {
        populateFilterOptions(this, 'data-js-author', '#author-filter');
        populateFilterOptions(this, 'data-js-category', '#category-filter');
    });
};

articleView.handleFilters = function (filterID, dataAttr, otherID) {
    $(filterID).on('change', function () {
        console.log('I am listening');
        if ($(this).val()) {
            $('article').hide();
            $(`article[${dataAttr}="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $(otherID).val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', function() {
        $('.tab-content').hide();
        $(`#${$(this).data('content')}`).fadeIn();
    });

    $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', function (e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            },200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

$(document).ready(() => {
    articleView.populateFilters();
    articleView.handleFilters('#author-filter', 'data-js-author', '#category-filter');
    articleView.handleFilters('#category-filter', 'data-js-category', '#author-filter');
    articleView.handleMainNav();
    articleView.setTeasers();
});
