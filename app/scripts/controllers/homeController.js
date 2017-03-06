'use strict';

class HomeController {
    constructor(homeData, template) {
        this.homeData = homeData;
        this.template = template;
    }

    loadHomePageTemplate(content, context) {
        let $content = content;
        let _this = this;
        let articles;
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        this.homeData.getAllArticles()
            .then((foundArticles) => {
                articles = foundArticles.map((x) => {
                    let date = new Date(x.date);
                    x.date = months[date.getMonth()] + ' ' + date.getDate();
                    return x;
                });

                return this.template.getTemplate('home-template');
            })
            .then((template) => {
                $content.html(template(articles));
            });

    }
}