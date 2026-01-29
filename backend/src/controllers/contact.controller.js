import nodemailer from "nodemailer";

export const sendContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ msg: "جميع الحقول مطلوبة" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USER,
      subject: `Contact Form: ${subject}`,
      text: `الاسم: ${name}\nالإيميل: ${email}\nالرسالة: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: "تم إرسال الرسالة بنجاح!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "حدث خطأ، لم يتم إرسال الرسالة" });
  }
};
