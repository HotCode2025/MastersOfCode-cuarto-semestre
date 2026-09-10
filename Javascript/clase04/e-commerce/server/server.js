const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
// 1. Importamos las clases del nuevo SDK
const { MercadoPagoConfig, Preference } = require("mercadopago");

const PORT = 8080;

// 2. access token
const client = new MercadoPagoConfig({
    accessToken: "APP_USR-1023493291347940-090917-4da7b4edd8194afa34df52d054900117-3676080035",
});

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Servir estáticos de la carpeta client
app.use(express.static(path.join(__dirname, "../client")));

// Ruta principal para el HTML
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

// 3. Crear la preferencia con la nueva API
app.post("/create_preference", async (req, res) => {
    try {
        const body = {
            items: [
                {
                    title: req.body.description,
                    unit_price: Number(req.body.price),
                    quantity: Number(req.body.quantity),
                    currency_id: "ARS",
                },
            ],
            back_urls: {
                success: `localhost:8080`,
                failure: `localhost:8080`,
                pending: "",
            },
            auto_return: "approved",
        };

        // Instanciamos Preference pasándole el cliente configurado
        const preference = new Preference(client);
        const result = await preference.create({ body });

        res.json({
            id: result.id,
        });
    } catch (error) {
        console.error("Error al crear la preferencia:", error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
});

app.get("/feedback", (req, res) => {
    res.json({
        Payment: req.query.payment_id,
        Status: req.query.status,
        MerchantOrder: req.query.merchant_order_id,
    });
});

app.listen(PORT, () => {
    console.log(`El servidor está corriendo en http://localhost:${PORT}`);
});