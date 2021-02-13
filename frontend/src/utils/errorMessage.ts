import { FieldError } from "react-hook-form";

export const errorMessage = (label: string, error: FieldError | undefined): string | undefined => {
    switch (error?.type) {
        case "required":
            return label + " is required!";
        case "pattern":
            return label + " is invalid!";
        case "validate":
            return label + " does not match!";
        default:
            return error?.message;
    }
};
