// models/album.js
module.exports = (sequelize, DataTypes) => {
    const Album = sequelize.define('Album', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      artist: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
  
    Album.associate = (models) => {
      Album.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    };
  
    return Album;
  };
  