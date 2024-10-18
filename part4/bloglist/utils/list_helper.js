const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    return blogList.length === 0
        ? 0
        : blogList.reduce((sum, post) => sum + post.likes, 0);
};

module.exports = {
    dummy,
    totalLikes
}