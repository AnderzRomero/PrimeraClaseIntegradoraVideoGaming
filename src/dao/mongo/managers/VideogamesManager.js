import videogameModel from "../models/videogame.js";

export default class VideoGamesManager {

    getVideogames = () => {
        return videogameModel.find();
    }

    getVideogameBy = (params) => {
        return videogameModel.findOne(params)
    }

    creatVideogame = (videogame) => {
        return videogameModel.create(videogame);
    }

    updateVideogame = (id,videogame) => {
        return videogameModel.updateOne({_id:id},{$set:videogame})
    }

    deleteVideogame = (id) => {
        return videogameModel.deleteOne({_id:id});
    }

}