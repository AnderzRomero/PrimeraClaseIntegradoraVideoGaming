import { Router } from "express";
import VideoGamesManager from "../dao/mongo/managers/VideogamesManager.js";

const router = Router();
const videogamesService = new VideoGamesManager();

router.get('/', async(req,res) => {
    const videogames = await videogamesService.getVideogames();
    console.log(videogames);
    res.send({status:"seccess",payload:videogames})
})

export default router;