import axios from "axios";
const HOST = process.env.HOST;
const BASE_URL = "http://" + HOST + ":8000";

const authUser = (email, password) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/auth",
      method: "post",
      data: {
        email,
        password,
      },
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/usuarios",
      method: "get",
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const findUser = (cedula, name, area) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/usuarios/find",
      method: "post",
      data: {
        cedula,
        name,
        area,
      },
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const getUser = (usuario_id) => {
  return new Promise((resolve, reject) => {
    let config = {
      url: BASE_URL + "/api/usuarios/" + usuario_id,
      method: "get",
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const addUser = (data) => {
  return new Promise((resolve, reject) => {
    data["password"] = "NOPASSWORD";
    data["activo"] = 1;

    let config = {
      url: BASE_URL + "/api/usuarios",
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data,
    };

    console.log(config);

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const updateUser = (usuario_id, data) => {
  return new Promise((resolve, reject) => {
    let data2 = JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
      cedula: data.cedula,
      password: data.password,
      activo: data.activo,
      area: data.area,
      cargo: data.cargo,
      sueldo_basico: parseInt(data.sueldo_basico),
      condicion: data.condicion,
      estado: data.estado,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: BASE_URL + "/api/usuarios/" + usuario_id,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data2,
    };

    axios(config)
      .then((resp) => {
        resolve(resp.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const UsuariosApi = {
  authUser,
  getUsers,
  findUser,
  getUser,
  addUser,
  updateUser,
};

export default UsuariosApi;
