import { Router } from "express";
import VideoGamesManager from "../dao/mongo/managers/VideogamesManager.js";
import uploader from "../services/uploadService.js";

const router = Router();
const videogamesService = new VideoGamesManager();

router.get('/', async (req, res) => {
    const videogames = await videogamesService.getVideogames();
    res.send({ status: "success", payload: videogames })
})

router.post('/', uploader.array('images'), async (req, res) => {
    const {
        title,
        description,
        price,
        categories
    } = req.body;
    // las imagenes van a estar en req.files
    // el resto de datos, en req.body
    if (!title || !description || !price) return res.status(400).send({ status: "error", error: "Valores incompletos" });

    // construyo el objeto videojuego

    const newVideogame = {
        title,
        description,
        price,
        categories
    }
    const images = req.files.map(file => `${req.protocol}://${req.hostname}:${process.env.PORT || 8080}/img/${file.filename}`)
    newVideogame.images = images
    // ya cree el objeto, ya mapee las imagenes, ahora si, inserto en la Base de datos
    const result = await videogamesService.creatVideogame(newVideogame);
    res.send({ status: "success", payload: result._id });
})

router.put('/:vid', async (req, res) => {
    const { vid } = req.params;

    const {
        title,
        description,
        price,
        categories
    } = req.body;

    const updateVideogame = {
        title,
        description,
        price,
        categories
    }
    // hay que validar si el videojuego existe?
    const videogame = await videogamesService.getVideogameBy({ _id: vid });
    if (!videogame) return res.status(400).send({ status: "error", error: "Videojuego no encontrado" });

    await videogamesService.updateVideogame(vid, updateVideogame);
    res.send({ status: "success", message: "Videojuego Actualizado" });
})


router.delete('/:vid', async (req, res) => {
    const { vid } = req.params;
    const result = await videogamesService.deleteVideogame(vid);
    res.send({statuts:"success", message:"Video Juego Borrado"});
})

export default router;