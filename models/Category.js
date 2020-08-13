const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    hooks: {
      // set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newCategotyData) {
        newCategotyData.password = await bcrypt.hash(newCategotyData.password, 10);
        return newCategotyData;
      },
      // set up beforeUpdate lifecycle "hook" functionality
      async beforeUpdate(updatedCategoryData) {
        updatedCategoryData.password = await bcrypt.hash(updatedCategoryData.password, 10);
        return updatedCategoryData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
