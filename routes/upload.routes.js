const router = require("express").Router();

const uploader = require("../middlewares/uploader.js")

// POST "/upload/movie-cover/:id" => ruta que sube una imagen de caratula de pelicula
router.post("/movie-cover/:id", uploader.single("cover"), (req, res, next) => {
    // "cover" tiene que ser igual al name del input donde se sube la imagen

    console.log("intentando enviar imagen")
    console.log("el archivo recibido de cloudinary", req.file)
    //aqui es donde vamos a usar el paquete de cloudinary


})

module.exports = router;