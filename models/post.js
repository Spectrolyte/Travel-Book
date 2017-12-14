module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
    
    country: {type:DataTypes.STRING, allowNull:false},
    city: {type:DataTypes.STRING, allowNull:false},
    name: {type:DataTypes.STRING, allowNull:false},
    review: {type:DataTypes.TEXT, allowNull:false},
    categories: {type:DataTypes.STRING, allowNull:false},
    placeId: DataTypes.STRING,
    image: DataTypes.STRING,
    price: {type: DataTypes.INTEGER, defaultValue: 1, len: [1,5]},
    rating: {type: DataTypes.INTEGER, defaultValue: 3, len: [1,5]}
    
  });

post.associate = function(models) {
    post.belongsToMany(models.user, {
      through: "post2user"
    });
  };

  return post;
};
