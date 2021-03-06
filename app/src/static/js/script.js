const btn = document.querySelector("#btn-soumettre");
const input = document.querySelector("#input-arr");
const select = document.querySelector("#select-arr");
const paragraphe = document.querySelector(".msg-erreur");
const aff_glissades = document.querySelector(".glissades-tbl");
const aff_patinoires = document.querySelector(".patinoires-tbl");
const aff_piscines = document.querySelector(".piscines-tbl");

btn.addEventListener("click", async (event) => {
  try {
    event.preventDefault();
    const body = await send(input.value);
    afficher_installations(body);
  } catch (erreur) {
    afficher_erreur(erreur);
  }
});

select.addEventListener("change", async (event) => {
  try {
    const body = await send_nom(event);
    afficher_installations(body);
  } catch (erreur) {
    afficher_erreur(erreur);
  }
});

async function send_nom(event) {
  let query_string = new URLSearchParams({
    installation: event.target.value,
  });
  const response = await fetch("/api/installation?" + query_string.toString(), {
    method: "GET",
    header: {
      "Content-Type": "application/son",
    },
  });

  if (!response.ok) {
    return response.json().then((msg) => {
      throw new Error(msg);
    });
  }
  return response.json();
}

async function send(input) {
  let query_string = new URLSearchParams({
    arrondissement: input,
  });
  const response = await fetch(
    "/api/installations?" + query_string.toString(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    return response.json().then((msg) => {
      throw new Error(msg);
    });
  }
  return response.json();
}

const afficher_installations = (dict_installations) => {
  reset_erreur();
  former_glissades(dict_installations["glissades"]);
  former_piscines(dict_installations["piscines"]);
  former_patinoires(dict_installations["patinoires"]);
};

const afficher_erreur = (erreur) => {
  former_glissades([]);
  former_piscines([]);
  former_patinoires([]);
  paragraphe.innerHTML =
    "Une erreur s'est produite lors de votre requ??te : " + erreur.message;
  paragraphe.classList.remove("cache");
};

const former_glissades = (glissades) => {
  table = "";
  if (glissades !== undefined && glissades !== null && glissades.length > 0) {
    header =
      "<h3>Glissades</h3>" +
      "<table class='table'>" +
      "<thead>" +
      "<tr>" +
      "<th scope='col'>Id</th>" +
      "<th scope='col'>Nom</th>" +
      "<th scope='col'>Cle</th>" +
      "<th scope='col'>Derni??re mise ?? jour</th>" +
      "<th scope='col'>Deblay??e</th>" +
      "<th scope='col'>Ouverte</th>" +
      "</tr>" +
      "</thead>";
    body = "<tbody>";
    for (let i = 0; i < glissades.length; i++) {
      glissade = glissades[i];

      body +=
        "<tr>" +
        "<th scope=row>" +
        glissade.id +
        "</th>" +
        "<td >" +
        glissade.nom +
        "</td>" +
        "<td>" +
        glissade.cle +
        "</td>" +
        "<td>" +
        glissade.date_maj +
        "</td>" +
        "<td>" +
        (glissade.deblaye === "0" ? "Non" : "Oui") +
        "</td>" +
        "<td>" +
        (glissade.ouvert === "0" ? "Non" : "Oui") +
        "</td>" +
        "</tr>";
    }
    body += "</tbody>";
    table = header + body + "</table>";
  }
  aff_glissades.innerHTML = table;
};

const former_patinoires = (patinoires) => {
  table = "";
  if (
    patinoires !== undefined &&
    patinoires !== null &&
    patinoires.length > 0
  ) {
    header =
      "<h3>Patinoires</h3>" +
      "<table class='table'>" +
      "<thead>" +
      "<tr>" +
      "<th scope='col'>Id</th>" +
      "<th scope='col'>Nom</th>" +
      "<th scope='col'>Derni??re mise ?? jour</th>" +
      "<th scope='col'>Deblay??e</th>" +
      "<th scope='col'>Resurface</th>" +
      "<th scope='col'>Arros??e</th>" +
      "</tr>" +
      "</thead>";
    body = "<tbody>";
    for (let i = 0; i < patinoires.length; i++) {
      patinoire = patinoires[i];

      body +=
        "<tr>" +
        "<th scope=row>" +
        patinoire.id +
        "</th>" +
        "<td >" +
        patinoire.nom +
        "</td>" +
        "<td>" +
        patinoire.date_maj +
        "</td>" +
        "<td>" +
        (patinoire.deblaye === "0" ? "Non" : "Oui") +
        "</td>" +
        "<td>" +
        (patinoire.resurface === "0" ? "Non" : "Oui") +
        "</td>" +
        "<td>" +
        (patinoire.arrose === "0" ? "Non" : "Oui") +
        "</td>" +
        "</tr>";
    }
    body += "</tbody>";
    table = header + body + "</table>";
  }
  aff_patinoires.innerHTML = table;
};

const former_piscines = (piscines) => {
  table = "";
  if (piscines !== undefined && piscines !== null && piscines.length > 0) {
    header =
      "<h3>Piscines</h3>" +
      "<table class='table'>" +
      "<thead>" +
      "<tr>" +
      "<th scope='col'>Id</th>" +
      "<th scope='col'>Id uev</th>" +
      "<th scope='col'>Nom</th>" +
      "<th scope='col'>Adresse</th>" +
      "<th scope='col'>Type</th>" +
      "<th scope='col'>Propriete</th>" +
      "<th scope='col'>Gestion</th>" +
      "<th scope='col'>Equipement</th>" +
      "<th scope='col'>Latitude</th>" +
      "<th scope='col'>Longitude</th>" +
      "<th scope='col'>Point X</th>" +
      "<th scope='col'>Point Y</th>" +
      "</tr>" +
      "</thead>";
    body = "<tbody>";
    for (let i = 0; i < piscines.length; i++) {
      piscine = piscines[i];

      body +=
        "<tr>" +
        "<th scope=row>" +
        piscine.id +
        "</th>" +
        "<td >" +
        piscine.id_uev +
        "</td>" +
        "<td >" +
        piscine.nom +
        "</td>" +
        "<td>" +
        piscine.adresse +
        "</td>" +
        "<td>" +
        piscine.type +
        "</td>" +
        "<td>" +
        piscine.propriete +
        "</td>" +
        "<td>" +
        piscine.gestion +
        "</td>" +
        "<td>" +
        piscine.equipement +
        "</td>" +
        "<td>" +
        piscine.latitude +
        "</td>" +
        "<td>" +
        piscine.longitude +
        "</td>" +
        "<td>" +
        piscine.point_x +
        "</td>" +
        "<td>" +
        piscine.point_y +
        "</td>" +
        "</tr>";
    }
    body += "</tbody>";
    table = header + body + "</table>";
  }
  aff_piscines.innerHTML = table;
};

const reset_erreur = () => {
  paragraphe.innerHTML = "&nbsp;";
  paragraphe.classList.add("cache");
};
