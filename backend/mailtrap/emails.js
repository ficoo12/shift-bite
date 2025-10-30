const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplate");

const { mailTrapClient, sender } = require("./mailtrap.config");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });
  } catch (error) {
    console.error(error, "Something went wrong");
  }
};

const sendWelcomEmail = async (email, usersName) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "591c4fdb-d47e-4bd7-a03f-2f2c1e75b14b",
      template_variables: {
        name: usersName,
      },
    });
  } catch (error) {
    console.error(error, "Something went wrong");
  }
};

const sendResetPasswordEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password reset",
    });
  } catch (error) {
    console.error(error, "Something went wrong");
  }
};

const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];

  try {
    const response = await mailTrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password reset",
    });

    console.log("Password reset email sent successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomEmail,
  sendResetPasswordEmail,
  sendResetSuccessEmail,
};
