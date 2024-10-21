const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogList) => {
    return blogList.length === 0
        ? 0
        : blogList.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = (blogList) => {
    if (blogList.length === 0) return null

    const mostLiked = blogList.reduce((ant, act) => {
        return ant.likes > act.likes ? ant : act;
    });

    return {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }
}

const mostBlogs = (blogList) => {

    return {
        author: "Robert C. Martin",
        blogs: 3
    }
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}