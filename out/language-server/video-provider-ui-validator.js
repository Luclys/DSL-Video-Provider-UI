"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoProviderUiValidator = exports.VideoProviderUiValidationRegistry = void 0;
const langium_1 = require("langium");
/**
 * Registry for validation checks.
 */
class VideoProviderUiValidationRegistry extends langium_1.ValidationRegistry {
    constructor(services) {
        super(services);
        const validator = services.validation.VideoProviderUiValidator;
        const checks = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}
exports.VideoProviderUiValidationRegistry = VideoProviderUiValidationRegistry;
/**
 * Implementation of custom validations.
 */
class VideoProviderUiValidator {
    checkPersonStartsWithCapital(person, accept) {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }
}
exports.VideoProviderUiValidator = VideoProviderUiValidator;
//# sourceMappingURL=video-provider-ui-validator.js.map