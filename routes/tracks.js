const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (req, res, next) => {
    try{
        const tracks = await prisma.track.findMany();
        res.json(tracks);
    } catch (error) {
        next(error)
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const track = await prisma.track.findUnique({
            where: { id: parseInt(req.params.id)},
        });
        if (!track) return res.status(404).json({ error: 'Track not found'})
            res.json(track);
    } catch (error) {
        next(error)
    }
});

module.exports= router;