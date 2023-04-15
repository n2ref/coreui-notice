
CoreUI.notice.instance = {

    _options: {
        id: '',
        timeout: 6000,
        message: '',
        messageColor: '',
        bgColor: '#333',
        icon: '',
        actionBtnText: '',
        cancelBtn: true,
        onClose: null,
        onClosed: null,
        onAction: null,
    },


    /**
     * @param options
     */
    init: function (options) {

        this._options = $.extend({}, this._options, options);

        if ( ! this._options.id) {
            this._options.id = CoreUI.notice._hashCode();
        }
    },


    /**
     * @returns {string}
     */
    render: function() {

        let stylesContainer = this._options.bgColor
            ? 'style="background-color: ' + this._options.bgColor + '"'
            : '';

        let stylesMessage = this._options.messageColor
            ? 'style="color: ' + this._options.messageColor + '"'
            : '';

        let tplIcon = this._options.icon
            ? '<div class="coreui-notice-icon"><i class="' + this._options.icon + '" ' + stylesMessage + '></i></div>'
            : '';

        let tplBtnAction = this._options.actionBtnText
            ? '<button type="button" class="coreui-notice-action" ' + stylesMessage + '>' + this._options.actionBtnText + '</button>'
            : '';

        let tplBtnCancel = this._options.cancelBtn
            ? '<div class="coreui-notice-cancel"><div class="coreui-notice-cancel-icon "></div></div>'
            : '';

        let tpl =
            '<div class="coreui-notice animated fadeIn" id="coreui-notice-' + this._options.id + '">' +
                '<div class="coreui-notice-wrapper" ' + stylesContainer + '>' +
                    tplIcon +
                    '<span class="coreui-notice-message" ' + stylesMessage + '>' + this._options.message + '</span>' +
                    tplBtnAction +
                    tplBtnCancel +
                '</div>' +
            '</div>';


        return tpl;
    },


    /**
     *
     */
    initEvents: function () {

        let that   = this;
        let notice = $('#coreui-notice-' + this._options.id);

        $('.coreui-notice-cancel', notice).click(function () {
            that.hide();
        });

        if (typeof this._options.onAction === 'function') {
            if (notice[0]) {
                $('.coreui-notice-action', notice).click(function () {
                    that._options.onAction(that);
                });
            }
        }


        if (this._options.timeout > 0) {
            window.setTimeout(function () {
                that.hide();
            }, this._options.timeout);
        }
    },


    /**
     *
     */
    getId: function () {
        return this._options.id;
    },


    /**
     * @param message
     * @returns {string}
     */
    setMessage: function (message) {

        let notice = $('#coreui-notice-' + this._options.id);

        if (notice[0]) {
            $('.coreui-notice-message', notice).text(message);
        }
    },


    /**
     *
     */
    hide: function () {

        let notice = $('#coreui-notice-' + this._options.id);

        if (notice[0]) {
            notice.removeClass("fadeIn");
            notice.addClass("fadeOut");

            if (typeof this._options.onClose === 'function') {
                this._options.onClose();
            }

            let that = this;

            window.setTimeout(function() {
                let container = notice.parent();

                notice.remove();

                if (typeof that._options.onClosed === 'function') {
                    that._options.onClosed();
                }

                if (container.children().length === 0) {
                    container.remove();
                }
            }, 200);
        }
    }
}