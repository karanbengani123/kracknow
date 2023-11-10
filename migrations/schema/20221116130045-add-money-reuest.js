'use strict'
module.exports = {
    up: (queryInterface, DataTypes) => {
        return queryInterface.createTable('student_addmoney_request', {
            uuid: {
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                type: DataTypes.UUID
            },
            studentUUID: {
                allowNull: false,
                type: DataTypes.UUID
            },
            transactionId: {
                allowNull: false,
                type: DataTypes.STRING(100)
            },
            transactionImage: {
                allowNull: false,
                type: DataTypes.STRING(200)
            },
            status: {
                allowNull: false,
                type: DataTypes.STRING(100)
            },
            amount: {
                allowNull: false,
                type: DataTypes.NUMBER
            },
            
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE
            },
            deletedAt: {
                allowNull: true,
                type: DataTypes.DATE
            }
        })
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('student_addmoney_request')
    }
}
