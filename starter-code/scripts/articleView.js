'use strict';

const articleView = {};

// TODONE: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// "This" doesn't work in the same way because the arrow function is non-context. I was able to refactor every function.

articleView.populateFilters = () => {
    function populateFilterOptions (article, dataAttr, selectFilterId) {
        const data = $(article).attr(dataAttr);

        if ($(`${selectFilterId} option[value="${data}"]`).length === 0); {
            const optionTag = `<option value="${data}">${data}</option>`;
            $(selectFilterId).append(optionTag);
        }
    }

    $('article').each(function() {
        populateFilterOptions(this, 'data-js-author', '#author-filter');
        populateFilterOptions(this, 'data-js-category', '#category-filter');
    });
};

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', (e) => {
        event.preventDefault();
        if ($(e.currentTarget).val()) {
            $('article').hide();
            $(`article[data-js-author="${$(e.currentTarget).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', (e)=> {
        event.preventDefault();
        if ($(e.currentTarget).val()) {
            $('article').hide();
            $(`article[data-js-category="${$(e.currentTarget).val()}"]`).fadeIn();
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

    $('.main-nav .tab:first').click();
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
