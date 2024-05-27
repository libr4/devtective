import { checkSize, checkValidValue, validateRequired } from "../../middleware/taskValidationMiddleware"
import { TASK_TYPES } from "../../utils/constants";

describe("Validate Required Fields", () => {
    it("should return an empty string if the field is not empty", () => {
        expect(validateRequired("test", "title")).toBe("");
    })

    it("should return an error message if the field is empty", () => {
        const fieldName = "title";
        expect(validateRequired("", fieldName)).toBe(`O campo ${fieldName} é obrigatório!`);
    })

})

describe("Validate if field has a valid value", () => {
    it("should return an empty string if the type is a valid value", () => {
        expect(checkValidValue("Bug", "Tipo da Tarefa", TASK_TYPES)).toBe("");
    })

    it("should return an error message if field is not a value in VALID_TYPES", () => {
        const field = "Error-Message";
        const fieldName = "Tipo da Tarefa";
        expect(checkValidValue("Error-Message", "Tipo da Tarefa", TASK_TYPES)).toBe(`${field} é um valor inválido para ${fieldName}!`)
    })
})

describe("Check if field has a valid length", () => {
    it("should return an empty string if field has length between min and max", () => {
        const field = "joaooo";
        expect(checkSize(field, "Username", 6, 32)).toBe("");
    });

    it("should return an error message if field length is less than min size", () => {
        const field = "abc";
        expect(checkSize(field, "Password", 6)).toBe(`O campo Password deve ter no mínimo 6 caracteres`);
    });

    it("should return an error message if field length is greater than max size", () => {
        const field = "ThisIsALongString";
        expect(checkSize(field, "Password", undefined, 10)).toBe(`O campo Password excedeu o tamanho máximo de 10 caracteres`);
    });

    it("should return an empty string if field length is within min and max size", () => {
        const field = "validField";
        expect(checkSize(field, "Email", 5, 20)).toBe('');
    });

    it("should return an empty string if field length is exactly equal to min size", () => {
        const field = "exactSize";
        expect(checkSize(field, "Phone", 9, 11)).toBe('');
    });

    it("should return an empty string if field length is exactly equal to max size", () => {
        const field = "maximumLength";
        expect(checkSize(field, "Phone", undefined, 13)).toBe('');
    });
});


