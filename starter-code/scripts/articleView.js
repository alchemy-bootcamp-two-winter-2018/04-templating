'use strict';

const articleView = {};

// TODONE: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// "This" doesn't work in the same way because the arrow function is non-context. I was able to refactor every function.

articleView.populateFilters = () => {
    $('article').each((index, article) => {
        if (!$(article).hasClass('template')) {
            let val = $(article).find('address a').text();
            let optionTag = `<option value="${val}">${val}</option>`;

            if ($(`#author-filter option[value="${val}"]`).length === 0) {
                $('#author-filter').append(optionTag);
            }

            val = $(article).attr('data-js-category');
            optionTag = `<option value="${val}">${val}</option>`;
            if ($(`#category-filter option[value="${val}"]`).length === 0) {
                $('#category-filter').append(optionTag);
            }
        }
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', (event) => {
        if ($(event).val()) {
            $('article').hide();
            $(`article[data-js-author="${$(event).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', (event)=> {
        if ($(event).val()) {
            $('article').hide();
            $(`article[data-js-category="${$(event).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
    });
};

articleView.handleMainNav = () => {
    $('.main-nav').on('click', '.tab', (e) => {
        $('.tab-content').hide();
        $(`#${$(e.currentTarget).data('content')}`).fadeIn();
    });

    // $('.main-nav .tab:first').click();
};

articleView.setTeasers = () => {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('article').on('click', 'a.read-on', (e) => {
        e.preventDefault();
        if ($(e.currentTarget).text() === 'Read on →') {
            $(e.currentTarget).parent().find('*').fadeIn();
            $(e.currentTarget).html('Show Less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(e.currentTarget).parent().offset().top)
            },200);
            $(e.currentTarget).html('Read on &rarr;');
            $(e.currentTarget).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

$(document).ready(() => {
    articleView.populateFilters();
    articleView.handleCategoryFilter();
    articleView.handleAuthorFilter();
    articleView.handleMainNav();
    articleView.setTeasers();
});
