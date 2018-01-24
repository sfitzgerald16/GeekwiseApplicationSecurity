class Post {
    constructor(obj) {
        obj && Object.assign(this, obj);
    }

    toString() {
        return `Body: ${this.body}, Author: ${this.author}`;
    }
}

module.exports = Post;