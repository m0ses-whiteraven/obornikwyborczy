function reloadProgressBar() {
            $('.progress-bar .progress').each(function(i, el) {
                $(el).css('width', Math.floor((Math.random() * 100) + 1) + '%');
            });

            setTimeout(reloadProgressBar, 2000);
        }