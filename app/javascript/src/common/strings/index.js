const strings = {
  edit: "Editar",
  delete: "Borrar",
  create: "Crear",
  cancel: "Cancelar",
  save: "Guardar",
  inviteUsers: "Invitar Usuarios",

  Home: {
    title: "¡Bienvenido a Club de Ciencia!",
    titleClub: "Bienvenido al Club de Ciencia",
    subtitle: "Aún no eres participante de ningún club.",
    shuffle: "Busca un club que te interese y envía una solicitud de participación utilizando",
    create: "También puedes crear un nuevo club presionando",
  },
  Actions: {
    create: "Crear",
    shuffle: "Shuffle",
  },
  Entries: {
    delete: {
      title: "¿Seguro que quieres borrar la entrada?",
      delete: "Borrar",
      cancel: "Cancelar",
    },
    edit: {
      title: "Editar entrada",
      save: "Guardar",
      cancel: "Cancelar",
      error: "Algo salió mal al editar la entrada",
    },
    new: {
      title: "Nueva entrada",
      create: "Crear",
      cancel: "Cancelar",
      error: "Algo salió mal al crear la entrada",
    },
  },
  Users: {
    edit: {
      success: "Perfil actualizado con éxito!",
    },
  },
  Invitations: {
    addUsers: {
      title: "Invitar usuarios",
      description:
        "Ingresa el mail o los mails, separados por coma o por espacio, de los usuarios que quieras invitar. En caso de que el usuario no exista, se le enviará un mail invitandolo a registrarse a Fustibus.",
      form: {
        emails: {
          placeholder: "jose@mail.com, maria@mail.com",
          required: "Debes ingresar al menos un mail.",
          invalid: "Verifica que todos los mails ingresados sean válidos.",
        },
      },
      success: "Se han enviado las solicitudes correctamente",
      error: "Ha ocurrrido un error, intente nuevamente más tarde.",
    },
  },
  Clubs: {
    delete: {
      confirmHeader: "¿Seguro que quieres borrar el club?",
    },
  },

  Poster: {
    sections: {
      title: "Título",
      abstract: "Abstract",
      introduction: "Introducción",
      methodology: "Metodología",
      results: "Resultados",
      conclusions: "Conclusiones",
      bibliography: "Bibliografía",
      acknowledgments: "Agredecimientos",
    },
  },
};

export default strings;
