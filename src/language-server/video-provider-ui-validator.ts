import { ValidationAcceptor, ValidationCheck, ValidationRegistry } from 'langium';
import { VideoProviderUiAstType, Person } from './generated/ast';
import { VideoProviderUiServices } from './video-provider-ui-module';

/**
 * Map AST node types to validation checks.
 */
type VideoProviderUiChecks = { [type in VideoProviderUiAstType]?: ValidationCheck | ValidationCheck[] }

/**
 * Registry for validation checks.
 */
export class VideoProviderUiValidationRegistry extends ValidationRegistry {
    constructor(services: VideoProviderUiServices) {
        super(services);
        const validator = services.validation.VideoProviderUiValidator;
        const checks: VideoProviderUiChecks = {
            Person: validator.checkPersonStartsWithCapital
        };
        this.register(checks, validator);
    }
}

/**
 * Implementation of custom validations.
 */
export class VideoProviderUiValidator {

    checkPersonStartsWithCapital(person: Person, accept: ValidationAcceptor): void {
        if (person.name) {
            const firstChar = person.name.substring(0, 1);
            if (firstChar.toUpperCase() !== firstChar) {
                accept('warning', 'Person name should start with a capital.', { node: person, property: 'name' });
            }
        }
    }

}
