'use strict';

class TestController {
    constructor(testData, template) {
        this.testData = testData;
        this.template = template;
    }

    aaa(content) {
        let $content = content;
        let _this = this;
        let data;

        _this.testData.test()
            .then(result => {
                data = result;
                console.log(data);

                return this.template.getTemplate('testTemplate');
            })
            .then(template => {

                $content.html(template(data));
            });
    }
}