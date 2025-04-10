import { Sequelize, DataTypes as DT } from 'sequelize';

module.exports = (sequelize: Sequelize, DataTypes: typeof DT) => {
  const Album = sequelize.define('Album', {
    album: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Add other fields like artist, merchant, etc.
  });

  (Album as any).associate = (_models: any) => {
    // define associations here
  };
  return Album;
};
