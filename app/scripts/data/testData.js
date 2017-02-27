'use strict';

class TestData {
    constructor(requester) {
        this.requester = requester;
    }

    test() {
        return Promise.resolve(['a', 'b', 'c', 'd']);
    }
}