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

    sortArticles(unsortedArticles) {
        let months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        let articlesToSort = unsortedArticles.map((x) => {
            let date = new Date(x.date);

            x.date = {
                monthIndex: date.getMonth(),
                month: months[date.getMonth()],
                day: date.getDate(),
                hour: date.getHours(),
                minutes: date.getMinutes()
            };

            return x;
        });

        articlesToSort = articlesToSort.sort(function (a, b) {
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

            if (a.date.hour > b.date.hour) {
                return -1;
            } else if (a.date.hour < b.date.hour) {
                return 1;
            }

            if (a.date.minutes > b.date.minutes) {
                return -1;
            } else if (a.date.minutes < b.date.minutes) {
                return 1;
            }

            return 0;
        });

        return articlesToSort;
    }
}