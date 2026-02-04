import nodemailer from "nodemailer";
import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

/* 🧪 Test variables */
console.log("EMAIL_USER =", process.env.EMAIL_USER);
console.log("CLIENT_ID =", process.env.CLIENT_ID);

/* OAuth2 setup */
const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export const sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ msg: "Tous les champs sont obligatoires." });
  }

  try {
    console.log("Obtention du token d'accès...");
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL_USER,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_USER,
      subject: `Nouveau message depuis le formulaire de contact: ${subject}`,
      text: `
Nom: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <h2 style="color: #0d6efd;">📩 Nouveau message de contact</h2>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong></p>
          <div style="padding: 10px 15px; background-color: #f5f5f5; border-radius: 5px; border-left: 4px solid #0d6efd;">
            ${message.replace(/\n/g, "<br>")}
          </div>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 10px 0;">
          <p style="font-size: 0.9em; color: #666;">Ce message a été envoyé via le formulaire de contact de votre site web.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "Le message a été envoyé avec succès ✅" });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ msg: "Une erreur est survenue lors de l'envoi de l'email ❌" });
  }
};
