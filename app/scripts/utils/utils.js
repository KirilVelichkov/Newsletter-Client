'use strict';

class Utils {
    constructor(requester) {
        this.requester = requester;
    }

    isUserLogged() {
        return !!localStorage.getItem('jwt-token');
    }

    toggleUserControlElements() {
        if (this.isUserLogged()) {
            $('.nav-link-user-control').addClass('hidden');
            $('#logout').removeClass('hidden');

            this.requester.getJSON('http://localhost:1337/api/auth/getLoggedUser')
                .then((user) => {

                    if (user.roles.indexOf('admin') != -1) {
                        $('.nav-link-admin').removeClass('hidden');
                    }
                });
        } else {

            $('.nav-link-user-control').removeClass('hidden');
            $('#logout').addClass('hidden');
            $('.nav-link-admin').addClass('hidden');
        }
    }
}