var Misp = /** @class */ (function () {
    function Misp(cin_id, text_misp_id) {
        var _this = this;
        this._cin_textarea = document.getElementById(cin_id);
        this._text_misp_p = document.getElementById(text_misp_id);
        this._cin_textarea.addEventListener("input", (function (ev) {
            _this.textSet();
        }));
        this._cin_textarea.addEventListener("change", (function (ev) {
            _this.textSet();
        }));
    }
    Misp.prototype.textSet = function () {
        this._text_misp_p.innerText = this._cin_textarea.value;
    };
    return Misp;
}());
new Misp("cin", "text-MISP");
//# sourceMappingURL=misp.js.map