const PostCategoriesModel = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory', {
    postId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'post_id',
      references: {
        model: 'blog_posts',
        key: 'id',
      },
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'category_id',
      references: {
        model: 'categories',
        key: 'id',
      },
    },
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'posts_categories',
  });

  return PostCategory;
};

module.exports = PostCategoriesModel;