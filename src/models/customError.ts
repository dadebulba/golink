export class CustomError {
    public type : number;
    public message : string;

    constructor(type : number, message : string) {
        this.type = type;
        this.message = message;
    }
}