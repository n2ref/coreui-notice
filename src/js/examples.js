document.addEventListener('DOMContentLoaded', function () {

    // Simple
    $('#notice-default').click(function () {
        CoreUI.notice.info("Hello, world!");
    });

    $('#notice-warning').click(function () {
        CoreUI.notice.warning("Hello, world! This is a toast message.");
    });

    $('#notice-danger').click(function () {
        CoreUI.notice.danger("Hello, world! This is a toast message.");
    });

    $('#notice-success').click(function () {
        CoreUI.notice.success("Note that the live region needs to be present in the markup before the toast is generated or updated. If you dynamically generate both at the same time and inject them into the page, they will generally not be announced by assistive technologies.");
    });


    // positions
    $('#notice-position-top-left').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { position: 'top-left' });
    });
    $('#notice-position-top-center').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { position: 'top-center' });
    });
    $('#notice-position-top-right').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { position: 'top-right' });
    });
    $('#notice-position-bottom-left').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { position: 'bottom-left' });
    });
    $('#notice-position-bottom-center').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { position: 'bottom-center' });
    });
    $('#notice-position-bottom-right').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { position: 'bottom-right' });
    });


    // Styles
    $('#notice-custom-colors').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", {
            messageColor: '#ffffffd9',
            bgColor: '#712cf9',
        });
    });
    $('#notice-icon-info').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", { icon: 'bi bi-info' });
    });
    $('#notice-icon-check').click(function () {
        CoreUI.notice.success("Hello, world! This is a toast message.", { icon: 'bi bi-check' });
    });
    $('#notice-icon-triangle').click(function () {
        CoreUI.notice.warning("Hello, world! This is a toast message.", { icon: 'bi bi-exclamation-triangle' });
    });


    // Events
    $('#notice-actions-btn').click(function () {
        CoreUI.notice.info("Hello, world! This is a toast message.", {
            actionBtnText: 'Повторить',
            onAction: function (notice) {
                notice.hide();
                CoreUI.notice.success("Hello, world! This is a toast message.");
            },
            onClose: function () {
                console.log('close')
            },
            onClosed: function () {
                console.log('closed')
            }
        });
    });
    $('#notice-actions-timer').click(function () {
        let notice = CoreUI.notice.info("Timer: 5", {
            timeout: 0
        });

        let time       = 4;
        let intervalId = setInterval(function () {
            notice.setMessage("Timer: " + time);
            time--;
            if (time < 0) {
                notice.hide();
                clearInterval(intervalId);
            }
        }, 1000);
    });



    // Code highlight
    $('pre code').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});