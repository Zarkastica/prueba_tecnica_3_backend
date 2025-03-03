const rouletteModel = require('../models/roulette.model.js');
const Roulette = require('../models/roulette.model.js');

const createRoulette = async (req, res) => {
    try {
        const roulette = new Roulette();
        await roulette.save();
        return res.status(200).json({id:roulette._id});
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getRoulettes = async (req, res) => {
    try {
        const roulettes = await Roulette.find();
        return res.status(200).json(roulettes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const openRoulette = async (req, res) => {
    try {
        const roulette = await Roulette.findById(req.params.id);
        if (!roulette) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        roulette.open = true;
        await roulette.save();
        return res.status(200).json({ message: "Ruleta abierta", roulette });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const betRoulette = async (req, res) => {
    const { user, amount, type, number, color } = req.body;
    try {
        const roulette = await Roulette.findById(req.params.id);
        if (!roulette) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        if (!roulette.abierta) {
            return res.status(400).json({ message: 'La ruleta no está abierta' });
        }
        roulette.bets.push({ user, amount, type, number, color });
        await roulette.save();
        return res.status(200).json(roulette);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const closeRoulette = async (req, res) => {
    try {
        const roulette = await Roulette.findById(req.params.id);
        if (!roulette) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        if (!roulette.open) {
            return res.status(400).json({ message: 'La ruleta no está abierta' });
        }
        const winningNumber = Math.floor(Math.random() * 36);
        let winningColor;
        if (winningNumber % 2 === 0) {
            winningColor = 'rojo';
        } else {
            winningColor = 'negro';
        }
        roulette.open = false;

        const Results = roulette.bets.map(bet => {
            let total = 0;
            if (bet.type === "number" && bet.number === winningNumber) {
                total = bet.amount * 5;
            } else if (bet.type === "color" && bet.color === winningColor) {
                total = bet.amount * 1.8;
            }

            if (bet.type === "number") {
                return {
                    user: bet.user,
                    bet: bet.amount,
                    wagered: bet.number,
                    total: total,
                };
            } else {
                return {
                    user: bet.user,
                    bet: bet.amount,
                    wagered: bet.color,
                    total: total,
                };
            }

        })

        await roulette.save();
        return res.status(200).json({ message: "Ruleta cerrada", winningNumber, winningColor, Results });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const removeRoulette = async (req, res) => {
    try {
        const roulette = await Roulette.findById(req.params.id);
        if (!roulette) {
            return res.status(404).json({ message: 'Ruleta no encontrada' });
        }
        await roulette.remove();
        return res.status(200).json({ message: "Ruleta eliminada" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = {
    createRoulette,
    getRoulettes,
    openRoulette,
    betRoulette,
    closeRoulette,
    removeRoulette
}
