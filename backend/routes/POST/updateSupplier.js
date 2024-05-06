const updateSupplier = require('express').Router();
const modelSupplier = require('../../models/supplierModel');
const getCheckToken = require('../GET/getCheckToken');

updateSupplier.put("/update-supplier/:supplierId", getCheckToken, (req, res) => {
    const supplierId = req.params.supplierId;
    const { name, phone, email, description } = req.body;
    
  
    modelSupplier.findByIdAndUpdate(supplierId, { 
        name:name,
        phone:phone,
        email:email,
        description:description}, { new: true })
        .then(updatedSupplier => {
            if (!updatedSupplier) {
                return res.status(404).json({ msg: "Dodavatel nebyl nalezen." });
            }
            return res.json({ msg: `Dodavatel ${updatedStorage.name} byl úspěšně aktualizován.`, updatedStorage });
        })
        .catch(err => {
            console.error("Chyba při aktualizaci dodavatele:", err);
            return res.status(500).json({ msg: "Nastala chyba při aktualizaci dodavatele." });
        });
});

module.exports = updateSupplier;