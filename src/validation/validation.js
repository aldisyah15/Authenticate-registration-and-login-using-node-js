
export const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false, //untuk mengecek semua kesalahan yang ada dalam request
        allowUnknown: false // untuk memastikan bahwa request hanya mengandung properti yang sudah didefinisikan pada schema 
    });
    if (result.error) {
        throw new Error(result.error.message);
    } else {
        return result.value;
    }
}
