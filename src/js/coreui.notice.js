
import coreuiNoticeUtils    from "./coreui.notice.utils";
import coreuiNoticeInstance from "./coreui.notice.instance";


let coreuiNotice = {

    _instances: {},
    _positions: {},

    _settings: {
        limit: 3,
        top: 50,
        bottom: 50,
        position: 'top-right', // {top,bottom}-{left-center-right}
        container: 'body'
    },


    /**
     * Уведомление default
     * @param message
     * @param options
     * @returns {object}
     */
    default: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'default';
        options.message = message;

        return this.create(options);
    },


    /**
     * Уведомление info
     * @param message
     * @param options
     * @returns {object}
     */
    info: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'info';
        options.message = message;

        return this.create(options);
    },


    /**
     * Уведомление primary
     * @param message
     * @param options
     * @returns {object}
     */
    primary: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'primary';
        options.message = message;

        return this.create(options);
    },


    /**
     * Уведомление secondary
     * @param message
     * @param options
     * @returns {object}
     */
    secondary: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'secondary';
        options.message = message;

        return this.create(options);
    },


    /**
     * Уведомление warning
     * @param message
     * @param options
     * @returns {object}
     */
    warning: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'warning';
        options.message = message;

        return this.create(options);
    },


    /**
     * Уведомление danger
     * @param message
     * @param options
     * @returns {object}
     */
    danger: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'danger';
        options.message = message;

        return this.create(options)
    },


    /**
     * Уведомление success
     * @param {string} message
     * @param {object} options
     * @returns {object}
     */
    success: function (message, options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};
        options.type    = 'success';
        options.message = message;

        return this.create(options);
    },


    /**
     * Получение экземпляра уведомления
     * @param {string} id
     * @returns {object|null}
     */
    get: function (id) {

        if ( ! this._instances.hasOwnProperty(id)) {
            return null;
        }

        if ( ! $('#coreui-notice-' + id)[0]) {
            delete this._instances[id];
            return null;
        }

        return this._instances[id];
    },


    /**
     * Установка настроек
     * @param {object} settings
     */
    setSettings: function(settings) {

        this._settings = $.extend(true, {}, this._settings, settings);
    },


    /**
     * Создание уведомления
     * @param {object} options
     * @returns {object}
     * @private
     */
    create: function (options) {

        options = coreuiNoticeUtils.isObject(options) ? options : {};

        let position = options.hasOwnProperty('position') && typeof options.position === 'string'
            ? options.position
            : this._settings.position;

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


            container = $('<div class="coreui-notice-container position-' + position + '" style="' + stylesContainer.join(';') + '"></div>');
            $(this._settings.container).append(container);
        }


        if (this._positions.hasOwnProperty(position)) {
            let noticesId = this._positions[position];
            if (noticesId.length >= this._settings.limit) {

                let notice = this.get(noticesId[0]);

                if (notice) {
                    notice.hide();
                }

                delete this._instances[noticesId[0]];
                this._positions[position].splice(0, 1);
            }
        }


        let instance = new coreuiNoticeInstance(options instanceof Object ? options : {});

        if ( ! this._positions.hasOwnProperty(position)) {
            this._positions[position] = [];
        }

        let noticeId = instance.getId();

        this._positions[position].push(noticeId);
        this._instances[noticeId] = instance;


        if (['bottom-left', 'bottom-center', 'bottom-right'].indexOf(position) >= 0) {
            container.prepend(instance.show());
        } else {
            container.append(instance.show());
        }

        return instance;
    }
}

export default coreuiNotice;