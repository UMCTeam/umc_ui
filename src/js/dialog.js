var dialog = {
    //对话框
    modal: function (options) {
        var content = options.content;
        var onCancel = options.onCancel;
        var cancelText = options.cancelText;
        var onOk = options.onOk;
        var okText = options.okText;

        var self = this;
        var mask = "<div id='umc_mask' class='umc_mask'></div>";
        var modal = "<div id='umc_modal' class='umc_modal'></div>";
        var btnOk = "<div id='umc_modal-ok' class='umc_modal-ok'>" + (okText || "确定") + "</div>";
        var btnCancel = "<div id='umc_modal-cancel' class='umc_modal-cancel'>" + (cancelText || "关闭") + "</div>";

        //创建窗体
        var _render = function () {
            //插入遮罩;
            $("body").append(mask);
            self.$mask = $("#umc_mask");

            //插入窗体
            $("body").append(modal);
            self.$modal = $("#umc_modal");

            //插入内容
            $("#umc_modal").append("<div class='umc_content'>" + content + " </div>");

            if (onOk || onCancel) {
                self.$modal.append("<div id='umc_modal-foot'' class='umc_modal-foot'></div>");
            }


            if (onCancel) {
                //插入取消按钮
                $("#umc_modal-foot").append(btnCancel);
                self.$btnCancel = $("#umc_modal-cancel");

                self.$btnCancel.click(function () {
                    onCancel && onCancel();
                    self.$mask.remove();
                    self.$modal.remove();
                });
            }

            //插入确定按钮
            if (onOk) {
                //插入确定按钮
                $("#umc_modal-foot").append(btnOk);
                self.$btnOk = $("#umc_modal-ok");

                self.$btnOk.click(function () {
                    onOk && onOk();
                    self.$mask.remove();
                    self.$modal.remove();
                });
            }
        };

        var _render_before = function () {};
        var _render_after = function () {};


        _render_before();
        _render();
        _render_after();
    },

    //提示框
    toast: function (option) {
        var self = this;
        var text = option.text || "";
        var delay = option.delay || 1000;
        var toast = "<div id='umc_toast' class='umc_toast'>" + text + "</div>";

        if (self.$toast) {
            self.$toast.remove();
        }

        $("body").append(toast);
        self.$toast = $("#umc_toast");
        var width = self.$toast.outerWidth();
        var clientWidth = document.body.clientWidth;
        var left = (clientWidth - width)/2;

        self.$toast[0].style.left = left + "px";
        self.$toast[0].style.display = "absolute";

        setTimeout(function () {
            self.$toast.remove();
        }, delay);
    }
};