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
var CheckboxGroup = (function () {
    function CheckboxGroup() {
        // -------------------------------------------------------------------------
        // Inputs
        // -------------------------------------------------------------------------
        this.required = false;
    }
    // -------------------------------------------------------------------------
    // Implemented from ControlValueAccessor
    // -------------------------------------------------------------------------
    CheckboxGroup.prototype.writeValue = function (value) {
        this.model = value;
    };
    CheckboxGroup.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CheckboxGroup.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // -------------------------------------------------------------------------
    // Implemented from Validator
    // -------------------------------------------------------------------------
    CheckboxGroup.prototype.validate = function (c) {
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
    CheckboxGroup.prototype.addOrRemoveValue = function (value) {
        if (this.hasValue(value)) {
            this.model.splice(this.model.indexOf(value), 1);
        }
        else {
            this.model.push(value);
        }
        this.onChange(this.model);
    };
    CheckboxGroup.prototype.hasValue = function (value) {
        if (this.model instanceof Array) {
            return this.model.indexOf(value) !== -1;
        }
        else {
            return this.model === value;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CheckboxGroup.prototype, "required", void 0);
    CheckboxGroup = __decorate([
        core_1.Component({
            selector: "checkbox-group",
            template: "<div class=\"checkbox-group\"><ng-content></ng-content></div>",
            providers: [
                new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                    useExisting: core_1.forwardRef(function () { return CheckboxGroup; }),
                    multi: true
                }),
                new core_1.Provider(common_1.NG_VALIDATORS, {
                    useExisting: core_1.forwardRef(function () { return CheckboxGroup; }),
                    multi: true
                })
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CheckboxGroup);
    return CheckboxGroup;
}());
exports.CheckboxGroup = CheckboxGroup;
var CheckboxItem = (function () {
    function CheckboxItem(checkboxGroup) {
        this.checkboxGroup = checkboxGroup;
    }
    CheckboxItem.prototype.check = function () {
        this.checkboxGroup.addOrRemoveValue(this.value);
    };
    CheckboxItem.prototype.isChecked = function () {
        return this.checkboxGroup.hasValue(this.value);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CheckboxItem.prototype, "value", void 0);
    CheckboxItem = __decorate([
        core_1.Component({
            selector: "checkbox-item",
            template: "\n<div class=\"checkbox-item\" (click)=\"check()\">\n    <input class=\"checkbox-item-input\" type=\"checkbox\" [checked]=\"isChecked()\"/> <ng-content></ng-content>\n</div>",
            styles: ["\n.checkbox-item {\n    cursor: pointer;\n}\n"]
        }),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [CheckboxGroup])
    ], CheckboxItem);
    return CheckboxItem;
}());
exports.CheckboxItem = CheckboxItem;
var CheckBox = (function () {
    // -------------------------------------------------------------------------
    // Constructor
    // -------------------------------------------------------------------------
    function CheckBox(checkboxGroup) {
        this.checkboxGroup = checkboxGroup;
        // -------------------------------------------------------------------------
        // Inputs
        // -------------------------------------------------------------------------
        this.value = true;
        this.uncheckedValue = false;
        this.required = false;
    }
    Object.defineProperty(CheckBox.prototype, "checked", {
        // -------------------------------------------------------------------------
        // Bindings
        // -------------------------------------------------------------------------
        get: function () {
            return this.checkboxGroup ? this.checkboxGroup.hasValue(this.value) : this.hasModelValue();
        },
        enumerable: true,
        configurable: true
    });
    CheckBox.prototype.check = function () {
        if (this.checkboxGroup) {
            this.checkboxGroup.addOrRemoveValue(this.value);
        }
        else {
            this.addOrRemoveValue();
        }
    };
    // -------------------------------------------------------------------------
    // Implemented from ControlValueAccessor
    // -------------------------------------------------------------------------
    CheckBox.prototype.writeValue = function (value) {
        this.model = value;
    };
    CheckBox.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    CheckBox.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // -------------------------------------------------------------------------
    // Implemented from Validator
    // -------------------------------------------------------------------------
    CheckBox.prototype.validate = function (c) {
        if (this.required && (!c.value || (c.value instanceof Array) && c.value.length === 0)) {
            return {
                required: true
            };
        }
        return null;
    };
    // -------------------------------------------------------------------------
    // Private Methods
    // -------------------------------------------------------------------------
    CheckBox.prototype.hasModelValue = function () {
        if (this.model instanceof Array) {
            return this.model.indexOf(this.value) !== -1;
        }
        else {
            return this.model === this.value;
        }
    };
    CheckBox.prototype.addOrRemoveValue = function () {
        if (this.model instanceof Array) {
            if (this.hasModelValue()) {
                this.model.splice(this.model.indexOf(this.value), 1);
            }
            else {
                this.model.push(this.value);
            }
        }
        else {
            if (this.model === this.value) {
                this.model = this.uncheckedValue;
            }
            else {
                this.model = this.value;
            }
        }
        this.onChange(this.model);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CheckBox.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CheckBox.prototype, "uncheckedValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CheckBox.prototype, "required", void 0);
    __decorate([
        core_1.HostBinding("checked"), 
        __metadata('design:type', Object)
    ], CheckBox.prototype, "checked", null);
    __decorate([
        core_1.HostListener("click"), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CheckBox.prototype, "check", null);
    CheckBox = __decorate([
        core_1.Directive({
            selector: "input[type=checkbox]",
            providers: [
                new core_1.Provider(common_1.NG_VALUE_ACCESSOR, {
                    useExisting: core_1.forwardRef(function () { return CheckBox; }),
                    multi: true
                }),
                new core_1.Provider(common_1.NG_VALIDATORS, {
                    useExisting: core_1.forwardRef(function () { return CheckBox; }),
                    multi: true
                })
            ],
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.Host()), 
        __metadata('design:paramtypes', [CheckboxGroup])
    ], CheckBox);
    return CheckBox;
}());
exports.CheckBox = CheckBox;
//# sourceMappingURL=CheckboxGroup.js.map