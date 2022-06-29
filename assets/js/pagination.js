
(function($){
    
    var paginate = {
        startPos: function(pageNumber, perPage) {
            return pageNumber * perPage;
        },

        getPage: function(items, startPos, perPage) {
            var page = [];
            items = items.slice(startPos, items.length);

            for (var i=0; i < perPage; i++) {
                page.push(items[i]); }

            return page;
        },

        totalPages: function(items, perPage) {
            return Math.ceil(items.length / perPage);
        },

        createBtns: function(totalPages, currentPage) {
            var pagination = $('<div class="pagination" />');
            pagination.append('<span class="pagination-button">&laquo;</span>');

            for (var i=1; i <= totalPages; i++) {
               
                if (totalPages > 5 && currentPage !== i) {
                    if (currentPage === 1 || currentPage === 2) {
                        if (i > 5) continue;
                    } else if (currentPage === totalPages || currentPage === totalPages - 1) {
                        if (i < totalPages - 4) continue;
                    } else {
                        if (i < currentPage - 2 || i > currentPage + 2) {
                            continue; }
                    }
                }

               
                var pageBtn = $('<span class="pagination-button page-num" />');

                if (i == currentPage) {
                    pageBtn.addClass('active'); }

                pageBtn.text(i);
                pagination.append(pageBtn);
            }

            pagination.append($('<span class="pagination-button">&raquo;</span>'));

            return pagination;
        },

        createPage: function(items, currentPage, perPage) {
            $('.pagination').remove();

            var container = items.parent(),
                items = items.detach().toArray(),
                startPos = this.startPos(currentPage - 1, perPage),
                page = this.getPage(items, startPos, perPage);

            $.each(page, function(){
                if (this.window === undefined) {
                    container.append($(this)); }
            });

            var totalPages = this.totalPages(items, perPage),
                pageButtons = this.createBtns(totalPages, currentPage);
            container.after(pageButtons);
        }
    };

    
    $.fn.paginate = function(perPage) {
        var items = $(this);

        if (isNaN(perPage) || perPage === undefined) {
            perPage = 5; }

        if (items.length <= perPage) {
            return true; }

        if (items.length !== items.parent()[0].children.length) {
            items.wrapAll('<div class="pagination-items" />');
        }

        paginate.createPage(items, 1, perPage);

        $(document).on('click', '.pagination-button', function(e) {
            var currentPage = parseInt($('.pagination-button.active').text(), 10),
                newPage = currentPage,
                totalPages = paginate.totalPages(items, perPage),
                target = $(e.target);

            newPage = parseInt(target.text(), 10);
            if (target.text() == '«') newPage = 1;
            if (target.text() == '»') newPage = totalPages;

            if (newPage > 0 && newPage <= totalPages) {
                paginate.createPage(items, newPage, perPage); }
        });
    };

})(jQuery);

$('.article-loop').paginate(1);