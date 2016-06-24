"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var RadioGroup = (function () {
    function RadioGroup() {
        // -------------------------------------------------------------------------
        // Inputs
        // -------------------------------------------------------------------------
        this.required = false;
    }
    // -------------------------------------------------------------------------
    // Implemented from ControlValueAccessor
    // -------------------------------------------------------------------------
    RadioGroup.prototype.writeValue = function (value) {
        this.model = value;
    };
    RadioGroup.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    RadioGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // -------------------------------------------------------------------------
    // Implemented from Validator
    // -------------------------------------------------------------------------
    RadioGroup.prototype.validate = function (c) {
        if (this.required && (!c.value || (c.value instanceof Array) && c.value.length === 0)) {
            return {
                required: true
            };
        }
        return null;
    };
    // -------------------------------------------------------------------------
    // Public Methods
    // -------------------------------------------------------------------------
    RadioGroup.prototype.change = function (value) {
        this.model = value;
        this.onChange(this.model);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioGroup.prototype, "required", void 0);
    RadioGroup = __decorate([
        core_1.Component({
            selector: "radio-group",
            template: "<div class=\"radio-group\"><ng-content></ng-content></div>",
            providers: [
                new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                    useExisting: core_1.forwardRef(function () { return RadioGroup; }),
                    multi: true
                }),
                new core_1.Provider(common_1.NG_VALIDATORS, {
                    useExisting: core_1.forwardRef(function () { return RadioGroup; }),
                    multi: true
                })
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], RadioGroup);
    return RadioGroup;
}());
exports.RadioGroup = RadioGroup;
var RadioItem = (function () {
    function RadioItem(radioGroup) {
        this.radioGroup = radioGroup;
    }
    RadioItem.prototype.check = function () {
        this.radioGroup.change(this.value);
    };
    RadioItem.prototype.isChecked = function () {
        return this.radioGroup.model === this.value;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], RadioItem.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioItem.prototype, "disabled", void 0);
    RadioItem = __decorate([
        core_1.Component({
            selector: "radio-item",
            template: "\n<div class=\"radio-item\" (click)=\"check()\">\n    <input class=\"radio-item-input\" type=\"radio\" [checked]=\"isChecked()\" [disabled]=\"disabled\"/> <ng-content></ng-content>\n</div>",
            styles: ["\n.radio-item {\n    cursor: pointer;\n}\n"]
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [RadioGroup])
    ], RadioItem);
    return RadioItem;
}());
exports.RadioItem = RadioItem;
var RadioBox = (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function RadioBox(element, radioGroup) {
        this.element = element;
        this.radioGroup = radioGroup;
        // -------------------------------------------------------------------------
        // Inputs
        // -------------------------------------------------------------------------
        this.required = false;
    }
    Object.defineProperty(RadioBox.prototype, "checked", {
        // -------------------------------------------------------------------------
        // Bindings
        // -------------------------------------------------------------------------
        get: function () {
            var element = this.element.nativeElement;
            return this.radioGroup ? this.radioGroup.model === element.value : this.model === element.value;
        },
        enumerable: true,
        configurable: true
    });
    RadioBox.prototype.check = function () {
        var element = this.element.nativeElement;
        if (this.radioGroup) {
            this.radioGroup.change(element.value);
        }
        else {
            this.model = element.value;
            this.onChange(this.model);
        }
    };
    // -------------------------------------------------------------------------
    // Implemented from ControlValueAccessor
    // -------------------------------------------------------------------------
    RadioBox.prototype.writeValue = function (value) {
        this.model = value;
    };
    RadioBox.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    RadioBox.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // -------------------------------------------------------------------------
    // Implemented from Validator
    // -------------------------------------------------------------------------
    RadioBox.prototype.validate = function (c) {
        if (this.required && (!c.value || (c.value instanceof Array) && c.value.length === 0)) {
            return {
                required: true
            };
        }
        return null;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], RadioBox.prototype, "required", void 0);
    __decorate([
        core_1.HostBinding("checked"), 
        __metadata('design:type', Object)
    ], RadioBox.prototype, "checked", null);
    __decorate([
        core_1.HostListener("click"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], RadioBox.prototype, "check", null);
    RadioBox = __decorate([
        core_1.Directive({
            selector: "input[type=radio]",
            providers: [
                new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                    useExisting: core_1.forwardRef(function () { return RadioBox; }),
                    multi: true
                }),
                new core_1.Provider(common_1.NG_VALIDATORS, {
                    useExisting: core_1.forwardRef(function () { return RadioBox; }),
                    multi: true
                })
            ]
        }),
        __param(1, core_1.Optional()),
        __param(1, core_1.Host()), 
        __metadata('design:paramtypes', [core_1.ElementRef, RadioGroup])
    ], RadioBox);
    return RadioBox;
}());
exports.RadioBox = RadioBox;
//# sourceMappingURL=RadioGroup.js.map