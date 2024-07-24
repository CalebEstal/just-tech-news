const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//Create User Model
class User extends Model {
    //Set Up Method to Run on Instance Data (Per User) to Check Password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//Define table Columns and Config
User.init(
    {
        //Define an Id Column
        id: {
            //Use the Special Sequelize DataTypes Object Provide What Type of Data it is
            type: DataTypes.INTEGER,

            //This is the Equivalent of SQL's `NOT NULL` Option
            allowNull: false,

            //Instruct that this is the Primary Key
            primaryKey: true,

            //Turn on Auto Increment
            autoIncrement: true
        },

        //Define a Username Column
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },

        //Define an Email Column
        email: {
            type: DataTypes.STRING,
            allowNull: false,

            //There Cannot be any Duplicate Email Values in this Table
            unique: true,
            
            //If allowNull is Set to False, we can Run Our Data Through Validators Before Creating the Table Data
            validate: {
                isEmail: true
            }
        },
        
        //Define a Password Column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                //This Means the Password Must be at Least Four Characters Long
                len: [4]
            }
        }
    },
    {
        //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration)

        //Add Hooks to Hash Passwords Before Stored in DB
        hooks: {
            //Set Up beforeCreate Lifecycle "hook" Functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },

            //Set Up beforeUpdate Lifecycle "hook" Functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }

        },

        //Pass in Our Imported Sequelize Connection (the direct connection to our database)
        sequelize,
        
        //Don't Automatically Create createdAt/updatedAt timestamp fields
        timestamps: false,

        //Don't Pluralize Name of Database Table
        freezeTableName: true,

        //Use Underscores Instead of Camel-Casing (i.e. `comment_text` and not `commentText`)
        underscored: true,

        //Make it So Our Model Name Stays Lowercase in the Database
        modelName: 'user'
    }
);

module.exports = User;