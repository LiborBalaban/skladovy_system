const express = require('express');
const deleteSupplier = express.Router();
const modelSupplier = require('../../models/supplierModel');
const modelStockIn = require('../../models/stockinModel');
const getCheckToken = require('../GET/getCheckToken');

deleteSupplier.delete("/delete-supplier/:supplierId", getCheckToken, async (req, res) => {
    try {
        const supplierId = req.params.supplierId;

        const deletedSupplier = await modelSupplier.findByIdAndDelete(supplierId);
        if (!deletedSupplier) {
            return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
        }

        await modelStockIn.updateMany(
            { supplier: supplierId },
            { $unset: { supplier: "" } }
        );

        // Odpověď s úspěšnou zprávou
        return res.json({ msg: `Dodavatel ${deletedSupplier.name} byl úspěšně smazán.` });
    } catch (err) {
        // Zachycení a zpracování chyby
        console.error("Chyba při mazání dodavatele:", err);
        return res.status(500).json({ msg: "Nastala chyba při mazání dodavatele." });
    }
});

module.exports = deleteSupplier;