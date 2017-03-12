'use strict';

class Utils {
    constructor(requester) {
        this.requester = requester;
    }

    isUserLogged() {
        return this.requester.getJSON('/api/auth/getLoggedUser');
        // return !!localStorage.getItem('jwt-token');
    }

    toggleUserControlElements() {
        this.isUserLogged()
            .then((user) => {
                $('.nav-link-user-control').addClass('hidden');
                $('.nav-link-profile').removeClass('hidden');
                $('#logout').removeClass('hidden');

                if (user.roles.indexOf('admin') != -1) {
                    $('.nav-link-admin').removeClass('hidden');
                }
            })
            .catch(() => {
                $('.nav-link-user-control').removeClass('hidden');
                $('.nav-link-profile').addClass('hidden');
                $('#logout').addClass('hidden');
                $('.nav-link-admin').addClass('hidden');
            });

        // if (this.isUserLogged()) {
        //     $('.nav-link-user-control').addClass('hidden');
        //     $('#logout').removeClass('hidden');

        //     this.requester.getJSON('/api/auth/getLoggedUser')
        //         .then((user) => {
        //             if (user.roles.indexOf('admin') != -1) {
        //                 $('.nav-link-admin').removeClass('hidden');
        //             }
        //         })
        //         .catch((result) => {
        //             $('.nav-link-user-control').removeClass('hidden');
        //             $('#logout').addClass('hidden');
        //             $('.nav-link-admin').addClass('hidden');
        //         });
        // } else {
        //     $('.nav-link-user-control').removeClass('hidden');
        //     $('#logout').addClass('hidden');
        //     $('.nav-link-admin').addClass('hidden');
        // }
    }

    getUserRoles() {
        return this.requester.getJSON('/api/auth/getUserRoles');
    }
}