const ghostBookshelf = require('./base');
const urlUtils = require('../../shared/url-utils');

const PostsMeta = ghostBookshelf.Model.extend({
    tableName: 'posts_meta',

    defaults: function defaults() {
        return {
            email_only: false,
            share_on_facebook: false,
            share_on_instagram: false,
            share_on_linkedin: false,
            share_on_twitter: false
        };
    },

    formatOnWrite(attrs) {
        [
            'og_image', 'twitter_image', 'social_share_image_1', 'social_share_image_2',
            'social_share_image_3', 'social_share_image_4'
        ].forEach((attr) => {
            if (attrs[attr]) {
                attrs[attr] = urlUtils.toTransformReady(attrs[attr]);
            }
        });

        return attrs;
    },

    parse() {
        const attrs = ghostBookshelf.Model.prototype.parse.apply(this, arguments);

        [
            'og_image', 'twitter_image', 'social_share_image_1', 'social_share_image_2',
            'social_share_image_3', 'social_share_image_4'
        ].forEach((attr) => {
            if (attrs[attr]) {
                attrs[attr] = urlUtils.transformReadyToAbsolute(attrs[attr]);
            }
        });

        return attrs;
    }
}, {
    post() {
        return this.belongsTo('Post');
    }
});

module.exports = {
    PostsMeta: ghostBookshelf.model('PostsMeta', PostsMeta)
};
