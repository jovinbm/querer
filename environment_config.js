module.exports = {
    //axpUsername
    //axpPassword
    //AWS_ACCESS_KEY_ID for jovinbm
    //AWS_SECRET_ACCESS_KEY for jovinbm
    //NODE_ENV

    axpUsername: function () {
        return process.env.axpUsername;
    },

    axpPassword: function () {
        return process.env.axpPassword;
    }
};