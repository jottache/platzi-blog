import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Menu from "./menu";
import Usuarios from "./usuarios";
import Tareas from "./tareas";
import TareasGuardar from "./guardar";
import Publicaciones from "../components/Publicaciones/publicaciones";

const App = () => (
  <BrowserRouter>
    <Menu />
    <Switch>
      <Route exact path="/" component={Usuarios} />
      <Route exact path="/tareas" component={Tareas} />
      <Route exact path="/tareas/guardar" component={TareasGuardar} />
      <Route
        exact
        path="/tareas/guardar/:usuario_id/:tarea_id"
        component={TareasGuardar}
      />
      <Route exact path="/publicaciones/:key" component={Publicaciones} />
    </Switch>
  </BrowserRouter>
);

export default App;

//importamos "BrowserRouter" que es en donde debemos encerrar la app para navegar sin recargar el navegador. "Route" para las distintas rutas a las que navegaremos, en esta van los componentes y debemos agregarle la ruta con exact path. "Switch" el switch nos ayudara a navegar entre las diferentes rutas

//creamos una Route que nos dirige a un componente llamado publicaciones, esta ruta posee :key que hace referencia al parametro que le llega al link que posee el componente tabla, este :key varia dependiendo del click al que se presiona en cada peril de la tabla
