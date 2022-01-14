export const userQuery = (userId) => {
    const query = `*[_type=="user" && _id == '${userId}']`
    // Ssanity Query

    return query;
}

