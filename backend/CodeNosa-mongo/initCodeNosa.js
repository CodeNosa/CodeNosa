const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017/CodeNosa";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log("✅ Connexion à MongoDB réussie");

    // Nom de la base de données
    const db = client.db("CodeNosa");

    // Vérifier si la collection Admine existe
    const exists = await db.listCollections({ name: "Admine" }).hasNext();

    if (!exists) {
      await db.createCollection("Admine");
      console.log("📁 Collection 'Admine' créée");
    }


  } catch (error) {
    console.error("❌ Erreur :", error);
  } finally {
    await client.close();
  }
}

main();
