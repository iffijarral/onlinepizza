const Order = require('./Order').Order
const Product = require('./Product').Product

module.exports = (sequelize, DataTypes) => {

const Orderedproduct = sequelize.define("Orderedproduct", {

    OrderId: {
       type: DataTypes.INTEGER,
       references: {
         model: Order,
         key: 'id'
       }
     },
     ProductId: {
       type: DataTypes.INTEGER,
       references: {
         model: Product,
         key: 'id'
       }
     }
   });
}