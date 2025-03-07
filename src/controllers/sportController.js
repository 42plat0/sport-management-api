const {getSports, insertSport, fetchSport, updateSportDb, deleteSportDb } = require("../models/sportModel.js");
const AppError = require("../utilities/appError");

// Get all sports
exports.getSports = async (req, res, next) => {
    try {
        const sports = await getSports();

        if (!sports.length)
        {
            throw new AppError("No sports were found", 404);
        }

        res.status(200).json({
            status: "success",
            data: sports
        });
        
    } catch (error) {
       next(error); 
    }
}

// Add new sport
exports.addSport = async (req, res, next) => {
    try {

        const newSport = req.body;

        // Invalid input
        if (!newSport)
        {
            throw new AppError("Name or popularity rank was not provided", 400);
        }

        const sport = await insertSport(newSport);

        // Couldn't insert sport
        if (!sport)
        {
            throw new AppError("Unable to add sport", 500);
        }

        res.status(201).json({
            status: "success",
            data: sport
        });

    } catch (error) {
       next(error); 
    }
}

exports.getSportById = async (req, res, next) => {
    try { 
        const {sId} = req.params;
            
        const sport = await fetchSport(sId);
        
        // Sport not found
        if (!sport){
            throw new AppError("Sport by specified id not found", 404);
        }
        
        res.status(200).json({
            status: "success",
            data: sport
        });
    }
    catch (error) {
       next(error); 
    }

}

exports.updateSport = async (req, res, next) => {
    try {
        const newSport = req.body;
        const {sId} = req.params;

        const sport = await updateSportDb(sId, newSport);

        if (!sport){
            throw new AppError("Sport by specified id not found", 404);
        }

        res.status(200).json({
            status:"success",
            data: sport 
        })
        
    } catch (error) {
        next(error);
    }
}

exports.delSport = async (req, res, next) => {
    try {    
        const {sId} = req.params;
        
        const deleteSport = await deleteSportDb(sId); 
        
        if (!deleteSport)
            throw new Error("Sport by specified id not found", 404);

        res.status(200).json({
            status: "success",
            data: null
        });

    } catch (error) {
        next(error); 
    }
}
