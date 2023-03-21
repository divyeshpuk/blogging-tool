const express = require('express');
const router = express.Router();
const helpers = require('../helpers');

// GET

/*
 *  Home page for author
 *  http://localhost:3000/blog/author/articles
 *
 *  Home page for public/reader
 *  http://localhost:3000/blog/articles
 *
 *  Displays all draft and published articles to the logged-in author
 *  Displays all published articles to the public/reader
 */
router.get(['/articles', '/author/articles'], (req, res, next) => {
    const promise1 = queryBlog();
    const promise2 = queryArticles();

    (async function () {
        await Promise.all([promise1, promise2]).then(function ([rows1, rows2]) {
            const isAuthor = req.originalUrl.indexOf('author') > -1;
            const header = rows1[0];
            const articles = helpers.sortArticles(rows2);
            res.render('articles', { author: isAuthor, header, ...articles });
        }).catch(function (err) {
            next(err);
        });
    }());
});

/*
 *  Article page for author
 *  http://localhost:3000/blog/author/articles/3?title=some-title
 *
 *  Article page for public/reader
 *  http://localhost:3000/blog/articles/3?title=some-title
 *
 *  Displays the full individual article, likes, comments and a comment textarea to the logged-in author and to the public/reader
 */
router.get(['/articles/:id', '/author/articles/:id'], (req, res, next) => {
    const promise1 = queryBlog();
    const promise2 = queryArticlesById(req);
    const promise3 = queryCommentsById(req);

    (async function () {
        await Promise.all([promise1, promise2, promise3]).then(function ([rows1, rows2, rows3]) {
            const isAuthor = req.originalUrl.indexOf('author') > -1;
            const header = rows1[0];
            const article = rows2[0];
            res.render('article', { author: isAuthor, header, ...article, comments: rows3 });
        }).catch(function (err) {
            next(err);
        });
    }());
});

/*
 *  Edit blog settings form page for author
 *  http://localhost:3000/blog/author/settings/edit
 *
 *  Displays the form with pre-populated data to edit blog settings to the logged-in author
 */
router.get('/author/settings/edit', (req, res, next) => {
    const promise = queryBlog();

    promise.then(function (rows)  {
        const header = rows[0];
        res.render('edit-settings', { header });
    }).catch(function (err) {
        next(err);
    });
});

/*
 *  Edit article form page for author
 *  http://localhost:3000/blog/author/articles/1/edit
 *
 *  Displays the form with pre-populated data to edit the article to the logged-in author
 */
router.get('/author/articles/:id/edit', (req, res, next) => {
    const promise1 = queryBlog();
    const promise2 = queryArticlesById(req);

    (async function () {
        await Promise.all([promise1, promise2]).then(function ([rows1, rows2]) {
            const header = rows1[0];
            const article = rows2[0];
            res.render('edit-article', {
                author: true,
                header, ...article,
                reqUrl: '/articles/' + req.params.id + '/update'
            });
        }).catch(function (err) {
            next(err);
        });
    }());
});

/*
 *  Create article form page for author
 *  http://localhost:3000/blog/author/article/create
 *
 *  Displays the form to create an article to the logged-in author
 */
router.get('/author/article/create', (req, res, next) => {
    const promise = queryBlog();

    promise.then(function (rows)  {
        res.render('create-article', {
            author: true,
            header: rows[0],
            article_title: null,
            article_subtitle: null,
            article_text: null,
            reqUrl: '/article/create'
        });
    }).catch(function (err) {
        next(err);
    });
});

// POST

/*
 *  Updates likes for the article
 *  http://localhost:3000/blog/articles/8/like/update
 *
 */
router.post('/articles/:id/like/update', (req, res, next) => {
    const promise = updateArticleLikes(req);

    promise.then(function ()  {
        res.redirect('/blog/articles/' + req.params.id);
    }).catch(function (err) {
        next(err);
    });
});

/*
 *  Creates a comment for the article
 *  http://localhost:3000/blog/articles/8/comment/create
 *
 */
router.post('/articles/:id/comment/create', (req, res, next) => {
    const invalidKeys = helpers.getInvalidKeys(req.body);
    if (!invalidKeys) {
        const promise = createComment(req);

        promise.then(function ()  {
            res.redirect('/blog/articles/' + req.params.id);
        }).catch(function (err) {
            next(err);
        });
    } else {
        next({message: invalidKeys + ' data is missing'});
    }
});

/*
 *  Updates blog settings
 *  http://localhost:3000/blog/author/settings/update
 *
 */
router.post('/author/settings/update', (req, res, next) => {
    const invalidKeys = helpers.getInvalidKeys(req.body);
    if (!invalidKeys) {
        const promise = updateBlogSettings(req);

        promise.then(function ()  {
            res.redirect('/blog/author/articles');
        }).catch(function (err) {
            next(err);
        });
    } else {
        next({message: invalidKeys + ' data is missing'});
    }
});

/*
 *  Updates the article with edited content and sets date_modified
 *  http://localhost:3000/blog/author/articles/1/update
 *
 */
router.post('/author/articles/:id/update', (req, res, next) => {
    const invalidKeys = helpers.getInvalidKeys(req.body);
    if (!invalidKeys) {
        const promise = updateArticle(req);

        promise.then(function ()  {
            res.redirect('/blog/author/articles');
        }).catch(function (err) {
            next(err);
        });
    } else {
        next({message: invalidKeys + ' data is missing'});
    }
});

/*
 *  Publishes the article by setting date_published
 *  http://localhost:3000/blog/author/articles/1/publish
 *
 */
router.post('/author/articles/:id/publish', (req, res, next) => {
    const invalidKeys = helpers.getInvalidKeys(req.body);
    if (!invalidKeys) {
        const promise = publishArticle(req);

        promise.then(function ()  {
            res.redirect('/blog/author/articles');
        }).catch(function (err) {
            next(err);
        });
    } else {
        next({message: invalidKeys + ' data is missing'});
    }
});

/*
 *  Deletes the article and all related comments
 *  http://localhost:3000/blog/author/articles/1/delete
 *
 */
router.post('/author/articles/:id/delete', (req, res, next) => {
    const promise = deleteArticle(req);

    promise.then(function ()  {
        res.redirect('/blog/author/articles');
    }).catch(function (err) {
        next(err);
    });
});

/*
 *  Creates an article as draft
 *  http://localhost:3000/blog/author/article/create
 *
 */
router.post('/author/article/create', (req, res, next) => {
    const invalidKeys = helpers.getInvalidKeys(req.body);
    if (!invalidKeys) {
        const promise = createArticle(req);

        promise.then(function (rows)  {
            res.redirect('/blog/author/articles');
        }).catch(function (err) {
            next(err);
        });
    } else {
        next({message: invalidKeys + ' data is missing'});
    }
});

// DATABASE QUERIES AND UPDATES

function queryBlog() {
    return new Promise(function (resolve, reject) {
        global.db.all('SELECT * FROM blog', function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

function queryArticles() {
    return new Promise(function (resolve, reject) {
        global.db.all('SELECT * FROM articles ORDER BY date_modified DESC', function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

function queryArticlesById(req) {
    return new Promise(function (resolve, reject) {
        global.db.all('SELECT * FROM articles WHERE article_id == ' + req.params.id, function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

function queryCommentsById(req) {
    return new Promise(function (resolve, reject) {
        global.db.all('SELECT * FROM comments WHERE article_id == ' + req.params.id + ' ORDER BY date_created DESC', function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
}

function updateArticleLikes(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'UPDATE articles SET article_likes = ' + req.body.like + ' WHERE article_id = ' + req.params.id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function createComment(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'INSERT INTO comments ("comment_text", "article_id") VALUES ( ?, ? )', [req.body.comment, req.params.id], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function updateBlogSettings(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'UPDATE blog SET blog_title = "' + req.body.title + '", blog_subtitle = "' + req.body.subtitle + '", blog_author = "' + req.body.author + '"', function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function updateArticle(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'UPDATE articles SET article_title = "' + req.body.title + '", article_subtitle = "' + req.body.subtitle + '", article_text = "' + req.body.text + '", date_modified = dateTime() WHERE article_id = ' + req.params.id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function publishArticle(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'UPDATE articles SET article_likes = 0, date_modified = dateTime(), date_published = dateTime() WHERE article_id = ' + req.params.id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function deleteArticle(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'DELETE FROM articles WHERE article_id == ' + req.params.id, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

function createArticle(req) {
    return new Promise(function (resolve, reject) {
        global.db.run(
            'INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_published") VALUES ( ?, ?, ?, ? )', [req.body.title, req.body.subtitle, req.body.text, null], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }
        );
    });
}

module.exports = router;
