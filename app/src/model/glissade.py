from app.src.db.init_db import db


class Glissade(db.Model):
    """
    Représentation d'une glissade.
    """
    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(200), nullable=False)
    ouvert = db.Column(db.String(5))
    deblaye = db.Column(db.String(5))
    cle = db.Column(db.String(10), nullable=False)
    date_maj = db.Column(db.String(30), nullable=False)
    nom_arr = db.Column(db.String(200), db.ForeignKey(
        "arrondissement.nom", ondelete="CASCADE"),
        nullable=True, default="N/A")

    def as_partial_list(self) -> list[str]:
        """
        Retourne une liste partielle des attributs de la glissade.
        """
        return [self.ouvert, self.deblaye, self.nom, self.cle, self.date_maj,
                self.nom_arr]

    def as_dict(self) -> dict:
        """
        Retourne tous les attributs de la glissade sous forme de dictionnaire.
        """
        return {
            "id": self.id,
            "nom": self.nom,
            "ouvert": self.ouvert,
            "deblaye": self.deblaye,
            "cle": self.cle,
            "date_maj": self.date_maj,
            "nom_arr": self.nom_arr
        }

    def __str__(self):
        return f"Glissade {self.nom} - Arrondissement {self.nom_arr}."
