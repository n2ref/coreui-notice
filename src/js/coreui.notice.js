
var CoreUI = typeof CoreUI !== 'undefined' ? CoreUI : {};

CoreUI.notice = {

    _instances: {},
    _settings: {
        limit: 3,
        top: 50,
        bottom: 50,
        position: 'top-right', // {top,bottom}-{left-center-right}
        container: 'body',
        infoColor: '',
        infoBgColor: '',
        warningColor: '#000000',
        warningBgColor: '#ffc107',
        dangerColor: '',
        dangerBgColor: '#dc3545',
        successColor: '',
        successBgColor: '#198754',
    },



    /**
     * @param settings
     */
    settings: function(settings) {

        CoreUI.notice._settings = $.extend({}, this._settings, settings);
    },


    /**
     * @param message
     * @param options
     * @returns {CoreUI.notice.instance}
     */
    info: function (message, options) {

        options = typeof options === 'object' ? options : {};
        options.message      = message;
        options.messageColor = options.hasOwnProperty('messageColor') ? options.messageColor : this._settings.infoColor;
        options.bgColor      = options.hasOwnProperty('bgColor') ? options.bgColor : this._settings.infoBgColor;

        return this._create(options);
    },


    /**
     * @param message
     * @param options
     * @returns {CoreUI.notice.instance}
     */
    warning: function (message, options) {

        options = typeof options === 'object' ? options : {};
        options.message      = message;
        options.messageColor = options.hasOwnProperty('messageColor') ? options.messageColor : this._settings.warningColor;
        options.bgColor      = options.hasOwnProperty('bgColor') ? options.bgColor : this._settings.warningBgColor;

        return this._create(options);
    },


    /**
     * @param message
     * @param options
     * @returns {CoreUI.notice.instance}
     */
    danger: function (message, options) {

        options = typeof options === 'object' ? options : {};
        options.message      = message;
        options.messageColor = options.hasOwnProperty('messageColor') ? options.messageColor : this._settings.dangerColor;
        options.bgColor      = options.hasOwnProperty('bgColor') ? options.bgColor : this._settings.dangerBgColor;

        return this._create(options)
    },


    /**s
     * @param message
     * @param options
     * @returns {CoreUI.notice.instance}
     */
    success: function (message, options) {

        options = typeof options === 'object' ? options : {};
        options.message      = message;
        options.messageColor = options.hasOwnProperty('messageColor') ? options.messageColor : this._settings.successColor;
        options.bgColor      = options.hasOwnProperty('bgColor') ? options.bgColor : this._settings.successBgColor;

        return this._create(options);
    },


    /**
     * @param {string} id
     * @returns {CoreUI.info.instance|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ($('.coreui-notice-' + this._instances[id])[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    },


    /**
     * @param options
     * @returns {CoreUI.notice.instance}
     * @private
     */
    _create: function (options) {

        let position  = options.hasOwnProperty('position') ? options.position : this._settings.position;
        let container = $(".coreui-notice-container.position-" + position);

        if ( ! container[0]) {
            let stylesContainer = [];

            if (['bottom-left', 'bottom-center', 'bottom-right'].indexOf(position) >= 0) {
                if (this._settings.bottom) {
                    stylesContainer.push('bottom: ' + this._settings.bottom + 'px');
                }
            } else {
                if (this._settings.top) {
                    stylesContainer.push('top: ' + this._settings.top + 'px');
                }
            }


            $(this._settings.container).append(
                '<div class="coreui-notice-container position-' + position + '" style="' + stylesContainer.join(';') + '"></div>'
            );
            container = $(".coreui-notice-container.position-" + position);
        }


        if (this._instances.hasOwnProperty(position)) {
            let noticesId = Object.keys(this._instances[position]);
            if (noticesId.length >= this._settings.limit) {

                let noticeId = noticesId[0];
                let notice   = this._instances[position][noticeId];

                if ( ! container.find('.coreui-notice-' + noticeId)[0]) {
                    delete this._instances[position][noticeId];
                }

                notice.hide();
            }
        }


        let instance = $.extend({}, this.instance);
        instance.init(options instanceof Object ? options : {});


        if ( ! this._instances.hasOwnProperty(position)) {
            this._instances[position] = {};
        }

        let infoId = instance.getId();
        this._instances[position][infoId] = instance;


        if (['bottom-left', 'bottom-center', 'bottom-right'].indexOf(position) >= 0) {
            container.prepend(instance.render());
        } else {
            container.append(instance.render());
        }

        instance.initEvents();

        return instance;
    },


    /**
     * @returns {string}
     * @private
     */
    _hashCode: function() {
        return this._crc32((new Date().getTime() + Math.random()).toString()).toString(16);
    },


    /**
     * @param str
     * @returns {number}
     * @private
     */
    _crc32: function (str) {

        for (var a, o = [], c = 0; c < 256; c++) {
            a = c;
            for (var f = 0; f < 8; f++) {
                a = 1 & a ? 3988292384 ^ a >>> 1 : a >>> 1
            }
            o[c] = a
        }

        for (var n = -1, t = 0; t < str.length; t++) {
            n = n >>> 8 ^ o[255 & (n ^ str.charCodeAt(t))]
        }

        return (-1 ^ n) >>> 0;
    }
}