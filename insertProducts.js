const { MongoClient } = require('mongodb');

// Proveedores
const proveedores = ["tenstar", "wiisun", "artillery", "korad"];

// Canales de venta
const canalesVenta = [
    { nombre: "MercadoLibre", link: "https://mercadolibre.com/product/sku-{}" },
    { nombre: "Shopify", link: "https://shopify.com/product/sku-{}" },
    { nombre: "WooCommerce", link: "https://woocommerce.com/product/sku-{}" }
];

// Ubicaciones posibles para las bodegas
const ubicacionesBodega1 = ["L-b-10", "K-a-05", "J-c-09", "M-d-04", "N-e-07"];
const ubicacionesBodega2 = ["S2-B-A", "S1-D-03", "S3-F-02", "S4-C-08", "S5-E-11"];
const ubicacionesBodega3 = ["T1-10", "T2-05", "T3-07", "T4-02", "T5-08"];

// Descripciones de ejemplo
const descripciones = [
    "Este es un producto de alta calidad con diseño ergonómico y funcional.",
    "Producto ideal para mejorar tu experiencia en el trabajo o en el hogar.",
    "Este producto es duradero y confiable, con excelente rendimiento.",
    "Versátil y con una durabilidad comprobada, perfecto para el uso diario.",
    "Producto diseñado con los mejores materiales y pensado para los profesionales."
];

// Función para obtener un número aleatorio en un rango
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar 300 productos
const generarProductos = () => {
    const productos = [];
    for (let sku = 1000; sku < 1300; sku++) {
        const proveedor = proveedores[getRandomInt(0, proveedores.length - 1)];
        const descripcion = descripciones[getRandomInt(0, descripciones.length - 1)];

        const producto = {
            sku: sku.toString(),
            producto: `Producto SKU-${sku}`,
            costo: getRandomInt(5000, 30000),
            precio: getRandomInt(6000, 35000),
            proveedor: proveedor,
            canalVentaLink: `https://shopify.com/products/sku-${sku}`,
            variante: `Variante SKU-${sku}`,
            ubicacion: ubicacionesBodega1[getRandomInt(0, ubicacionesBodega1.length - 1)],
            ubicacion2: ubicacionesBodega2[getRandomInt(0, ubicacionesBodega2.length - 1)],
            ubicacion3: ubicacionesBodega3[getRandomInt(0, ubicacionesBodega3.length - 1)],
            descripcion: descripcion.slice(0, 400),
            imagenes: [
                { nombre: `imagen_${sku}_1.jpg`, url: `https://shopify.com/images/producto-${sku}-1.jpg` },
                { nombre: `imagen_${sku}_2.jpg`, url: `https://shopify.com/images/producto-${sku}-2.jpg` }
            ],
            cantidadCliente: getRandomInt(10, 50),
            stockReal: getRandomInt(20, 60),
            canalesVenta: canalesVenta.map(canal => ({
                nombre: canal.nombre,
                link: canal.link.replace("{}", sku.toString())
            }))
        };

        productos.push(producto);
    }
    return productos;
};

// Código para insertar en MongoDB
async function main() {
    // URI de conexión a MongoDB Atlas
    const uri = "mongodb+srv://arturo:arturito@cluster0.midev.mongodb.net/inventario?retryWrites=true&w=majority";
    
    // Crear un cliente de MongoDB
    const client = new MongoClient(uri);

    try {
        // Conectar al servidor de MongoDB
        await client.connect();

        // Crear la base de datos "inventario" y la colección "productos"
        const database = client.db('inventario');  // Base de datos 'inventario'
        const collection = database.collection('productos');  // Colección 'productos'

        // Generar 300 productos
        const productos = generarProductos();

        // Insertar los productos
        const result = await collection.insertMany(productos);
        console.log(`${result.insertedCount} productos insertados en la base de datos inventario`);
    } finally {
        // Cerrar la conexión
        await client.close();
    }
}

main().catch(console.error);
