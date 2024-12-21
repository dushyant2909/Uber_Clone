class ApiError extends Error {
    constructor({
        statusCode,
        message = "Something went wrong",
        errors = [],
        data = null,
        stack,
    }) {
        super(message);

        this.statusCode = statusCode;
        this.errors = Array.isArray(errors) ? errors : [errors];
        this.data = data; // Optional payload data for additional context
        this.success = false;

        // Properly handle stack traces
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
