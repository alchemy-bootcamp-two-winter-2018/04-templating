'use strict';

const articleView = {};

// TODO: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// Arrow functions do not have a 'this', and cannot be used as constructors.  MDN points on that they are best used in non-methods, which I definitely understand after refactoring a few of these methods, though they mostly reference the DOM rather than the object.  This allows a 'this' inheritance in nested arrow functions, which is super cool.  Arrow functions also do not have their own arguments object, so they can reference those in the outer scope.  This is all super complicated and interesting.

articleView.populateFilters = () => {
    $('article').each( (index, element) => {
        if (!$(element).hasClass('template')) {
            let val = $(element).find('address a').text();
            let optionTag = `<option value="${val}">${val}</option>`;

            if ($(`#author-filter option[value="${val}"]`).length === 0) {
                $('#author-filter').append(optionTag);
            }

            val = $(element).attr('data-js-category');
            optionTag = `<option value="${val}">${val}</option>`;
            if ($(`#category-filter option[value="${val}"]`).length === 0) {
                $('#category-filter').append(optionTag);
            }
        }
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', (event) => {
        if (event.currentTarget.value) {
            $('article').hide();
            $(`article[data-js-author="${event.currentTarget.value}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', (event) => {
        if (event.currentTarget.value) {
            $('article').hide();
            $(`article[data-js-category="${event.currentTarget.value}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', (event) => {
        event.preventDefault();
        $('.tab-content').hide();
        $(`#${$(event.currentTarget).attr('data-content')}`).fadeIn();
    });

   $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article a.show-less').hide();

    $('article').on('click', 'a.read-on', (event) => {
        const target = $(event.target);
        $(target).hide();
        $(target).siblings('.article-body').children().show();
        $(target).next().show();
    });

    $('article').on('click', 'a.show-less', (event) => {
        const target = $(event.target);
        $(target).hide();
        $(target).prev().show();
        $(target).siblings('.article-body').children('*:nth-of-type(n+2)').hide();
    });
};

$( () => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});