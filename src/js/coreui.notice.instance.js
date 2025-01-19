
import 'ejs/ejs.min';
import coreuiNoticeUtils   from "./coreui.notice.utils";
import coreuiNoticeTpl     from "./coreui.notice.templates";
import coreuiNoticePrivate from "./coreui.notice.private";
import Timer               from "./timer";


class coreuiNoticeInstance {

    _id = null;
    _container = null;
    _buttons = [];
    _timer = null;

    _options = {
        id: '',
        type: 'default',
        timeout: 6000,
        message: '',
        description: '',
        textColor: null,
        bgColor: null,
        icon: '',
        showClose: true,
        buttons: [],
        onClose: null
    };


    /**
     * Инициализация
     * @param {object} options
     */
    constructor(options) {

        this._options = $.extend(true, {}, this._options, options);
        this._id      = typeof this._options.id === 'string' && this._options.id
            ? this._options.id
            : coreuiNoticeUtils.hashCode();

        // Инициализация контролов
        if (this._options.hasOwnProperty('buttons') &&
            Array.isArray(this._options.buttons) &&
            this._options.buttons.length > 0
        ) {
            coreuiNoticePrivate.initButtons(this, this._options.buttons);
        }
    }


    /**
     * Показ уведомления
     */
    show() {

        let styles = [];

        if (typeof this._options.textColor === 'string' && this._options.textColor) {
            styles.push('color:' + this._options.textColor + ' !important');
        }
        if (typeof this._options.bgColor === 'string' && this._options.bgColor) {
            styles.push('background-color:' + this._options.bgColor + ' !important');
        }

        let typeClasses = '';

        if (typeof this._options.type === 'string' && this._options.type) {
            switch (this._options.type) {
                case 'danger':    typeClasses = 'bg-danger text-bg-danger'; break;
                case 'warning':   typeClasses = 'bg-warning text-bg-warning'; break;
                case 'success':   typeClasses = 'bg-success text-bg-success'; break;
                case 'info':      typeClasses = 'bg-info text-bg-info'; break;
                case 'primary':   typeClasses = 'bg-primary text-bg-primary'; break;
                case 'secondary': typeClasses = 'bg-secondary text-bg-secondary'; break;
            }
        }

        let description = typeof this._options.description === 'string'
            ? $.trim(this._options.description).replace(/<\/?[^>]+(>|$)/g, "").replace(/\n{3,}/g, "\n\n").replace(/[ \t]{2,}/g, " ")
            : '';

        let container = $(ejs.render(coreuiNoticeTpl['container.html'], {
            id: this.getId(),
            typeClasses: typeClasses,
            styles: styles.length ? ' ' + styles.join(';') : '',
            message: this._options.message,
            description: description.replace(/\n/g, "<br>"),
            icon: this._options.icon,
            buttons: this._buttons,
            showClose: this._options.showClose,
        }));

        let notice = this;

        $('.coreui-notice-cancel', container).click(function () {
            notice.hide();
        });



        let descriptionContainer = $('.coreui-notice-description', container);

        if (descriptionContainer[0]) {
            let expand     = $('.coreui-notice-expand', container);
            let expandIcon = $('.coreui-notice-expand-icon', container);

            expand.click(function () {
                if (descriptionContainer.hasClass('expand')) {
                    descriptionContainer.removeClass('expand');
                    expandIcon.removeClass('bi-chevron-up');
                    expandIcon.addClass('bi-chevron-down');

                } else {
                    descriptionContainer.addClass('expand');
                    expandIcon.removeClass('bi-chevron-down');
                    expandIcon.addClass('bi-chevron-up');
                }
            });

            let countNewLines = description.split("\n").length - 1;

            if ((description.length + (countNewLines * 60)) < 175) {
                expand.hide();
            }
        }


        if (Array.isArray(notice._buttons) && notice._buttons.length > 0) {
            notice._buttons.map(function (button) {
                if (typeof button.onclick === 'function') {
                    $('.btn-notice-' + button.id, container).click(function () {
                        button.onclick.apply(notice);
                    });
                }
            });
        }


        if (this._options.timeout > 0) {
            this._timer = new Timer(function () {
                notice.hide();
            }, this._options.timeout);

            container.mouseenter(function () {
                notice._timer.pause();
            });

            container.mouseleave(function () {
                notice._timer.resume();
            });
        }

        this._container = container;

        return container;
    }


    /**
     * Скрытие уведомления
     */
    hide() {

        if (this._container) {
            this._container.removeClass("fadeIn");
            this._container.addClass("fadeOut");

            let that   = this;
            let notice = this._container;

            setTimeout(function() {
                let container = notice.parent();

                notice.remove();

                if (typeof that._options.onClose === 'function') {
                    that._options.onClose();
                }

                if (container.children().length === 0) {
                    container.remove();
                }
            }, 200);
        }
    }


    /**
     * Получение id
     */
    getId() {
        return this._id;
    }


    /**
     * Изменение текста уведомления
     * @param {string} message
     * @returns {string}
     */
    setMessage(message) {

        $('.coreui-notice-message', this._container).text(message);
    }
}

export default coreuiNoticeInstance;