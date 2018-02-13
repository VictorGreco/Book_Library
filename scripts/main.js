/* eslint-env browser*/
/*eslint "no-console": "off" */
/*eslint "no-undef": "off" */

$(function () {


    var url = "https://api.myjson.com/bins/udbm5";

    $.getJSON(url, function (data) {
        console.log("ready");

        var booksArray = data;
        printBooks(booksArray);

        // quick search regex
        var qsRegex;

        // init Isotope
        var $grid = $('.grid').isotope({
            itemSelector: '.element-item',
            layoutMode: 'masonry',
            filter: function () {
                return qsRegex ? $(this).text().match(qsRegex) : true;
            }
        });

        // use value of search field to filter
        var $quicksearch = $('.quicksearch').keyup(debounce(function () {
            qsRegex = new RegExp($quicksearch.val(), 'gi');
            $grid.isotope();
        }, 200));

        // debounce so filtering doesn't happen every millisecond
        function debounce(fn, threshold) {
            var timeout;
            return function debounced() {
                if (timeout) {
                    clearTimeout(timeout);
                }

                function delayed() {
                    fn();
                    timeout = null;
                }
                timeout = setTimeout(delayed, threshold || 100);
            }
        }


        $('#clearFilter').click(function () {
            $grid.isotope({
                filter: '*'
            });
        })
        $('#es').click(function () {
            $grid.isotope({
                filter: '.es'
            });
        })
        $('#en').click(function () {
            $grid.isotope({
                filter: '.en'
            });
        })
        
    });
})


function printBooks(booksArray) {

    var template = $('#books-template').html();
    var html = Mustache.render(template, booksArray);
    $('#data-container').html(html);

    console.log("working");
}
