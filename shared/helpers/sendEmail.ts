import { SES } from 'aws-sdk'
import { render } from 'ejs'
import { Transporter, createTransport } from 'nodemailer'
import { TEMPLATE_NOT_FOUND } from '../constants/httpErrorMessages'
import { NotificationTemplate } from '../database/models'
import { IEmailBody } from '../interfaces/IEmailBody'

export const sendEmail = async (
  to: string,
  identifier: string,
  data: IEmailBody
) => {
  // Create a node-mailer transport
  const mailerConfig = {
    SES: new SES({
      apiVersion: 'latest',
      region: process.env.AWS_REGION
    })
  }

  const transport: Transporter = createTransport(mailerConfig)

  // Find the template by the provided identifier
  const template: NotificationTemplate = await NotificationTemplate.findOne({
    where: {
      communicationType: 'EMAIL',
      identifier,
      renderer: 'EJS'
    }
  })

  if (!template) {
    throw new Error(TEMPLATE_NOT_FOUND)
  }
  // Render email body with the provided data
  const html: string = render(template.template, data.body)

  try {
    // Send the e-mail using the created transport
    await transport.sendMail({
      from: process.env.SMTP_USERNAME,
      html,
      subject: template.subject,
      to
    })
  } catch (e) {
    console.error(e)
  }
}
