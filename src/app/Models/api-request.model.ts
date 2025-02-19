export interface IRequestBody<T> {
    data: {
        type: string;
        attributes: T;
    };
}