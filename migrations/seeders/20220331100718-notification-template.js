'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('notification_templates', [{
      communicationType: 'EMAIL',
      createdAt: '2022-03-31 12:47:00',
      deletedAt: null,
      identifier: 'FORGET_USER_PASSWORD',
      locale: 'en',
      renderer: 'EJS',
      subject: 'Reset Password - Task Manager',
      template: `
        <html>
          <body>
            <h2>Hi <%=name%>,</h2>

            <p>Your new password</p>
            <p>Password: <%=password%></p>
           

          </body>
        </html>`,
      updatedAt: '2022-03-31 07:47:00'
    }, {
      communicationType: 'EMAIL',
      createdAt: '2022-04-12 07:47:00',
      deletedAt: null,
      identifier: 'STUDENT_CREDENTIAL',
      locale: 'en',
      renderer: 'EJS',
      subject: 'STUDENT CREDENTIAL',
      template: `
      <html>
        <body>
          <h2>Hi <%=firstName%>,</h2>
      
          <p>please find the new login credentials below</p>
          <p>Email: <%=email%></p>
          <p>Password: <%=password%></p>
        </body>
      </html>`,
      updatedAt: '2022-04-12 07:47:00'
    },

    {
      communicationType: 'EMAIL',
      createdAt: '2022-04-12 07:47:00',
      deletedAt: null,
      identifier: 'STUDENT_UPDATE',
      locale: 'en',
      renderer: 'EJS',
      subject: 'STUDENT UPDATION',
      template: `
      <html>
        <body>
          <h2>Hi <%=firstName%>,</h2>
      
          <p>Your profile is updated.please find the new login credentials below</p>
          <p>Email: <%=email%></p>
          <p>Password: <%=password%></p>
          <p>Mobile No: <%=mobileNumber%></p>
        </body>
      </html>`,
      updatedAt: '2022-04-12 07:47:00'
    }], {})
  },

  down: (queryInterface, DataTypes) => {
    return queryInterface.bulkDelete('notification_templates', {
      identifier: {
        [DataTypes.Op.in]: [
          'FORGET_USER_PASSWORD',
          'STUDENT_CREDENTIAL',
          'STUDENT_UPDATE'
        ]
      }
    }, {})
  }
}
