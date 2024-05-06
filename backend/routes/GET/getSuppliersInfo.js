const getSuppliersInfo = require('express').Router();
const modelSuppliers = require('../../models/supplierModel');


getSuppliersInfo.get("/get-supplier/:supplierId", (req, res) => {
    const supplierId = req.params.supplierId;
    modelSuppliers.findById(supplierId)
        .then(supplier => {
            if (!supplier) {
                return res.status(404).json({ msg: "Dodavatel nebyla nalezena." });
            }
            return res.json({
                msg: "Úspěšně se nám podařilo získat informace o dodavateli",
                documents: supplier
            });
        })
        .catch(err => {
            console.error("Chyba při získávání dodavatele:", err);
            return res.status(500).json({ msg: "Nastala chyba při získávání dodavatele." });
        });
});

module.exports = getSuppliersInfo;