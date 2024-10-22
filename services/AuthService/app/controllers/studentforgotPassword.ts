/* eslint-disable no-unused-vars */
import { IControllerParams } from '../../../../shared/interfaces/IControllerParams'
import { Student } from '../../../../shared/database/models'
import { HttpNotFound } from '../../../../shared/exceptions/HttpNotFound'
import { IForgotPassword } from '../interfaces/IForgetPassword'
import { NOT_FOUND } from '../../../../shared/constants/httpStatusCodes'
import { sendEmail } from '../../../../shared/helpers/sendEmail'
import { generateSha256Password, makeRandomString } from '../../../../shared/helpers/generateSha256Password'

export const studentforgetPassword = async (params: IControllerParams<IForgotPassword>) => {
    const inputs = params.input
    const transaction = params.transaction

    const user = await Student.findOne({
      where: {
        email: inputs.email
      }
    })

    if (!user) {
      throw new HttpNotFound('Student' + NOT_FOUND)
    }

    const password = makeRandomString(8)

    await user.update({
      password: generateSha256Password(password)
    }, { transaction })

    await sendEmail(inputs.email, 'FORGET_USER_PASSWORD', {
      body: {
        name: user.name,
        password: password
      },
      subject: {}
    })

    await transaction.commit()

    return {
      message: 'Email has been sent'
    }
}

export const sendOtp = async (params: IControllerParams<IForgotPassword>) => {
  const inputs = params.input;

  try {
      const user = await Student.findOne({
          where: {
              email: inputs.email
          }
      });

      if (!user) {
          throw new HttpNotFound('Student not found');
      }

      const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

      await user.update({
          forgotPasswordOtp: otp,
          otpExpiresAt: expiresAt.toISOString(),
      });

      await sendEmail(inputs.email, 'FORGET_USER_PASSWORD', {
        body: {
           name: user.firstName,
           password: otp
        },
        subject: {}
      })

      return {
          message: 'OTP has been sent to your email'
      };
  } catch (error) {
      throw new Error('Unable to send OTP. Please try again later.');
  }
};

export const verifyOtp = async (params: IControllerParams<IVerifyOtp>) => {
  const inputs = params.input;
    const user = await Student.findOne({
        where: {
            email: inputs.email
        }
    });

    if (!user) {
        throw new HttpNotFound('Student not found');
    }

    const isOtpValid = user.forgotPasswordOtp === inputs.otp;
    const isOtpExpired = new Date(user.otpExpiresAt) < new Date();

    if (!isOtpValid || isOtpExpired) {
        throw new Error('Invalid or expired OTP');
    }

    await user.update({
        forgotPasswordOtp: null,
        otpExpiresAt: null,
    },);


    return {
        message: 'OTP verified successfully'
    };
 
};

export const studentresetPassword = async (params: IControllerParams<IForgotPassword>) => {
  const { email, newPassword, confirmPassword } = params.input;

  if (newPassword !== confirmPassword) {
      throw new Error('New password and confirmation password do not match');
  }

  const user = await Student.findOne({
      where: {
          email: email
      }
  });

  if (!user) {
    throw new HttpNotFound('Student' + NOT_FOUND)
  }

  await user.update({
      password: generateSha256Password(newPassword), // Hash the new password
      forgotPasswordOtp: null, // Clear the OTP
      otpExpiresAt: null, // Clear the expiration
  });

  return {
      message: 'Password has been reset successfully'
  };
}




