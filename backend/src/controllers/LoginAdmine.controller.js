//C:\Users\henn5\Desktop\CodeNosa-main\backend\src\controllers\LoginAdmine.controller.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { generateToken } from "../../jwt/generetoken.js"; // <-- تأكد من اسم الملف وامتداده

dotenv.config();

const url = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);
const dbName = "CodeNosa";

export const authentification = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    console.log("⚠️ Email ou mot de passe manquant");
    return res.status(400).json({ success: false, message: "Email et mot de passe requis" });
  }

  try {
    await client.connect();
    const db = client.db(dbName);

    const admin = await db.collection("Admine").findOne({ email, password });

    if (admin) {
      const token = generateToken({ id: admin._id, email: admin.email });

      res.json({
        success: true,
        message: "Connexion réussie",
        token,
        admin: { email: admin.email } 
      });
    } else {
      console.log("❌ Admin non trouvé ou mot de passe incorrect");
      res.json({ success: false, message: "Email ou mot de passe incorrect" });
    }
  } catch (err) {
    console.error("💥 Erreur serveur:", err);
    res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  } finally {
    await client.close();
    console.log("🔒 Connexion MongoDB fermée");
  }
};
