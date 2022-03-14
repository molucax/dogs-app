const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Temperament', {
    temperament: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    }
  },
  {
    timestamps: false,
  });
};