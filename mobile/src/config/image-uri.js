export const imageUri = (uri, authToken) => {
    return {
        uri,
        headers: {
            Authorization: authToken,
        },
    };
};
