
import 'ejs/ejs.min';
import coreuiNoticeUtils   from "./coreui.notice.utils";
import coreuiNoticeTpl     from "./coreui.notice.templates";
import coreuiNoticePrivate from "./coreui.notice.private";


let coreuiNoticeInstance = {

    _id: null,
    _buttons: [],

    _options: {
        id: '',
        type: 'default',
        timeout: 6000,
        message: '',
        textColor: null,
        bgColor: null,
        icon: '',
        showClose: true,
        buttons: [],
        onClose: null
    },


    /**
     * Инициализация
     * @param {object} options
     */
    init: function (options) {

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
    },


    /**
     * Сборка уведомления
     */
    render: function () {

        let styles = [];

        if (typeof this._options.textColor === 'string' && this._options.textColor) {
            styles.push('color:' + this._options.textColor + ' !important');
        }
        if (typeof this._options.bgColor === 'string' && this._options.bgColor) {
            styles.push('background-color:' + this._options.bgColor + ' !important');
        }

        let typeClasses = 'bg-dark text-bg-dark';

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


        let notice = $(
            ejs.render(coreuiNoticeTpl['container.html'], {
                id: this.getId(),
                typeClasses: typeClasses,
                styles: styles.length ? ' ' + styles.join(';') : '',
                message: this._options.message,
                icon: this._options.icon,
                buttons: this._buttons,
                showClose: this._options.showClose,
            })
        );

        let that = this;

        $('.coreui-notice-cancel', notice).click(function () {
            that.hide();
        });


        if (Array.isArray(that._buttons) && that._buttons.length > 0) {
            $.each(that._buttons, function (key, button) {
                if (typeof button.onclick === 'function') {
                    $('.btn-notice-' + button.id, notice).click(function () {
                        button.onclick.apply(that);
                    });
                }
            });
        }


        if (this._options.timeout > 0) {
            setTimeout(function () {
                that.hide();
            }, this._options.timeout);
        }

        return notice;
    },


    /**
     * Скрытие уведомления
     */
    hide: function () {

        let noticeId = this.getId();
        let notice   = $('#coreui-notice-' + noticeId);

        if (notice[0]) {
            notice.removeClass("fadeIn");
            notice.addClass("fadeOut");

            let that = this;

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
    },


    /**
     * Получение id
     */
    getId: function () {
        return this._id;
    },


    /**
     * Изменение текста уведомления
     * @param {string} message
     * @returns {string}
     */
    setMessage: function (message) {

        let notice = $('#coreui-notice-' + this.getId());

        if (notice[0]) {
            $('.coreui-notice-message', notice).text(message);
        }
    }
}

export default coreuiNoticeInstance;