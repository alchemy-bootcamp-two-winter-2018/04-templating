'use strict';

const articleView = {};

// TODOne: Where possible, refactor methods into arrow functions, including the document.ready() method at the bottom.

// COMMENT: How do arrow functions affect the context of "this"? How did you determine if a function could be refactored?
// An arrow function doesn't have a 'this' of its own - its definition of 'this' is borrowed from whatever function encloses it. I honestly started by replacing all the anonymous functions with arrow functions, starting within the methods of articleView and moving to the methods themselves. Arrow functions broke my page in all the event handlers. They worked, however, in the methods, though the MDN page describes them as best suited to non-method functions. I'm guessing this is because it's common for methods to reference the object they're part of using 'this', which these don't.

articleView.populateFilters = () => {
    $('article').each(function() {
        if (!$(this).hasClass('template')) {
            let val = $(this).find('address a').text();
            let optionTag = `<option value="${val}">${val}</option>`;

            if ($(`#author-filter option[value="${val}"]`).length === 0) {
                $('#author-filter').append(optionTag);
            }

            val = $(this).attr('data-category');
            optionTag = `<option value="${val}">${val}</option>`;
            if ($(`#category-filter option[value="${val}"]`).length === 0) {
                $('#category-filter').append(optionTag);
            }
        }
    });
};
// articleView.populateFilters = () => {
//     $('article').each(function() {
//         if (!$(this).hasClass('template')) {
//             let val = $(this).find('address a').text();
//             let optionTag = `<option value="${val}">${val}</option>`;

//             if ($(`#author-filter option[value="${val}"]`).length === 0) {
//                 $('#author-filter').append(optionTag);
//             }

//             val = $(this).attr('data-category');
//             optionTag = `<option value="${val}">${val}</option>`;
//             if ($(`#category-filter option[value="${val}"]`).length === 0) {
//                 $('#category-filter').append(optionTag);
//             }
//         }
//     });
// };

articleView.handleAuthorFilter = () => {
    $('#author-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-author="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#category-filter').val('');
    });
};

articleView.handleCategoryFilter = () => {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $(`article[data-category="${$(this).val()}"]`).fadeIn();
        } else {
            $('article').fadeIn();
            $('article.template').hide();
        }
        $('#author-filter').val('');
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
    $('.article-body *:nth-of-type(n+3)').hide();
    $('article').on('click', 'a.read-on', function(e) {
        e.preventDefault();
        if ($(this).text() === 'Read on →') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show less &larr;');
        } else {
            $('body').animate({
                scrollTop: ($(this).parent().offset().top)
            },200);
            $(this).html('Read on &rarr;');
            $(this).parent().find('.article-body *:nth-of-type(n+3)').hide();
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
