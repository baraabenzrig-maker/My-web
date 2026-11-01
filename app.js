const POSTS_KEY = "connectplus_posts";

function getPosts() {
    return JSON.parse(localStorage.getItem(POSTS_KEY) || "[]");
}

function savePosts(posts) {
    localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function addPost() {
    const input = document.getElementById("postText");

    if (!input) return;

    const text = input.value.trim();

    if (!text) {
        alert("اكتب حاجة قبل ما تنشر!");
        return;
    }

    const posts = getPosts();

    posts.unshift({
        id: Date.now(),
        text: text,
        author: localStorage.getItem("connectplus_name") || "مستخدم Connect+",
        date: new Date().toLocaleString("ar-TN"),
        likes: 0
    });

    savePosts(posts);
    input.value = "";
    showPosts();
}

function showPosts() {
    const container = document.getElementById("posts");

    if (!container) return;

    const posts = getPosts();

    if (posts.length === 0) {
        container.innerHTML = '<div class="card">ما فما حتى منشور توّة. كن أول واحد ينشر!</div>';
        return;
    }

    container.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        const author = document.createElement("strong");
        author.textContent = post.author;

        const date = document.createElement("small");
        date.textContent = " • " + post.date;

        const content = document.createElement("p");
        content.textContent = post.text;

        const actions = document.createElement("div");
        actions.className = "actions";

        const likeButton = document.createElement("button");
        likeButton.textContent = "❤️ إعجاب " + post.likes;
        likeButton.onclick = () => likePost(post.id);

        actions.appendChild(likeButton);

        article.appendChild(author);
        article.appendChild(date);
        article.appendChild(content);
        article.appendChild(actions);

        container.appendChild(article);
    });
}

function likePost(id) {
    const posts = getPosts();
    const post = posts.find(item => item.id === id);

    if (post) {
        post.likes++;
        savePosts(posts);
        showPosts();
    }
}

document.addEventListener("DOMContentLoaded", showPosts);
