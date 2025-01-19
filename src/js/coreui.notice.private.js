import coreuiNoticeUtils from "./coreui.notice.utils";

let coreuiNoticePrivate = {


    /**
     * Инициализация кнопок
     * @param {coreuiNoticeInstance} notice
     * @param {Array}                buttons
     * @private
     */
    initButtons: function (notice, buttons) {

        buttons.map(function (button) {

            if (coreuiNoticeUtils.isObject(button) && typeof button.text === 'string') {
                let id = button.hasOwnProperty('id') && typeof button.id === 'string' && button.id
                    ? button.id
                    : coreuiNoticeUtils.hashCode();

                let onclick = null;

                if (typeof button.onclick === 'function') {
                    onclick = button.onclick;

                } else if (typeof button.onclick === 'string') {
                    onclick = function () {
                        (new Function(button.onclick)).apply(this);
                    }
                }

                notice._buttons.push({
                    id: id,
                    text: button.text,
                    onclick: onclick
                });
            }
        });
    }
}

export default coreuiNoticePrivate;