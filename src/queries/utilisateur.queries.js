const getAllUtilisateurs = "SELECT * FROM utilisateur"; 

const getUtilisateurById = "SELECT * FROM utilisateur WHERE id_utilisateur = $1 ";

const checkEmailExists = "SELECT * FROM utilisateur WHERE email = $1 ";

const addUtilisateur = "INSERT INTO utilisateur (nom, prenom , sexe, date_naissance, email, telephone, nationalite, password, id_type_utilisateur) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

const deleteUtilisateur = "DELETE FROM utilisateur WHERE id_utilisateur = $1";

const updateUtilisateur = "UPDATE utilisateur SET nom = $1, prenom = $2, date_naissance = $3, sexe = $4, email = $5, telephone = $6, nationalite = $7 WHERE id_utilisateur = $8";

const updatePass = "UPDATE utilisateur SET password = $1 WHERE email = $2";

const insertCodeConfirm = "UPDATE utilisateur SET code_confirmation = $1";

module.exports = {
    getAllUtilisateurs,
    getUtilisateurById,
    checkEmailExists,
    addUtilisateur,
    deleteUtilisateur,
    updateUtilisateur,
    updatePass,
    insertCodeConfirm
}