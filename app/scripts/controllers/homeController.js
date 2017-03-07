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

                    x.date = {
                        monthIndex: date.getMonth(),
                        month: months[date.getMonth()],
                        day: date.getDate()
                    };

                    return x;
                });

                articles = articles.sort(function (a, b) {
                    if (a.date.monthIndex > b.date.monthIndex) {
                        return -1;
                    } else if (a.date.monthIndex < b.date.monthIndex) {
                        return 1;
                    }

                    if (a.date.day > b.date.day) {
                        return -1;
                    } else if (a.date.day < b.date.day) {
                        return 1;
                    }

                    return 0;
                });

                return this.template.getTemplate('home-template');
            })
            .then((template) => {
                $content.html(template(articles));
            });

    }
}