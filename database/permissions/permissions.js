var Promise = require('bluebird');
var rq = require('../../rq.js');

var permissions = rq.functions().permissions;

module.exports = {
    returnAllPermissions: function () {
        return {
            "50": {
                permissionNumber: 50,
                permissionArray: [50],
                name: "Change post categories",
                description: "Can change a post's category from one to another",
                show: permissions.getFullPermissions(permissions.rootAdminsOnly())
            },

            "51": {
                permissionNumber: 51,
                permissionArray: [51],
                name: "Change post category name",
                description: "Can change a category name",
                show: permissions.getFullPermissions(permissions.rootAdminsOnly())
            },

            "65": {
                permissionNumber: 65,
                permissionArray: [65],
                name: "Contributor",
                description: "Can contribute articles to the site",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "66": {
                permissionNumber: 66,
                permissionArray: [66],
                name: "Staff Writer",
                description: "A recognized contributor of articles to the site. Can get paid",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "67": {
                permissionNumber: 67,
                permissionArray: [67],
                name: "Writer",
                description: "Can contribute articles to the site. Required on all authors",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "68": {
                permissionNumber: 68,
                permissionArray: [68],
                name: "Independent author",
                description: "Can publish their own articles",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "69": {
                permissionNumber: 69,
                permissionArray: [69],
                name: "Editor",
                description: "Can edit articles",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "70": {
                permissionNumber: 70,
                permissionArray: [70],
                name: "Trasher",
                description: "Can temporarily send articles to trash articles**",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "71": {
                permissionNumber: 71,
                permissionArray: [71],
                name: "Recoverer",
                description: "Can recover and restore articles from trash",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "72": {
                permissionNumber: 72,
                permissionArray: [72],
                name: "Deleter",
                description: "Can permanently delete articles",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "75": {
                permissionNumber: 75,
                permissionArray: [75],
                name: "User manager 1",
                description: "Can get information of the users registered on the site",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "76": {
                permissionNumber: 76,
                permissionArray: [76],
                name: "User manager 2",
                description: "Can manage user's on site except sensitive limited admin actions",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "77": {
                permissionNumber: 77,
                permissionArray: [77],
                name: "Root admin77",
                description: "Can do literally everything",
                show: permissions.getFullPermissions(permissions.rootAdminsOnly())
            },

            "100": {
                permissionNumber: 100,
                permissionArray: [100],
                name: "Admin",
                description: "Can do everything except sensitive limited admin actions",
                show: permissions.getFullPermissions(permissions.adminsOnly())
            },

            "101": {
                permissionNumber: 101,
                permissionArray: [101],
                name: "Root admin101",
                description: "Can do literally everything",
                show: permissions.getFullPermissions(permissions.rootAdminsOnly())
            }
        };
    }
};