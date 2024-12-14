exports.AuthRoute = async (req, res) => {
    return res.json({
        documents: {
            message: "You are authenticated",
            role:req.user.roleId,
        }
    });
};