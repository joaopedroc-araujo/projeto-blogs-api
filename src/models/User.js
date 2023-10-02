
const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        displayName: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false,
        underscored: true,
    });

    User.associate = ({ BlogPost }) => {
        User.hasMany(BlogPost, {
            foreignKey: 'userId',
            as: 'blogPosts',
        });
    };

    return User;
};

module.exports = UserModel;
