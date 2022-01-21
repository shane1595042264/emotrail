export const userQuery = (userId) => {
    const query = `*[_type=="user" && _id == '${userId}']`;
    // Ssanity Query

    return query;
}

export const searchQuery = (serachTerm) => {
    const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*' ]{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[]{
            _key,
            postedBy -> {
                _id,
                userName,
                image
            },
        },
    }`
    return query;
}