<template>
  <div class="container">
    <h1>Presupuesto</h1>
    <form>
      <div class="row g-3">
        <div class="col-md">
          <div class="form-floating">
            <select
              v-model.number="idTipo"
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-on:change="filtrarPre()"
            >
              <option
                name="tipo"
                v-for="(val, key) in tipoPresupuesto"
                :key="key"
                :value="val.id"
              >
                {{ val.descripcion }}
              </option>
            </select>
            <label for="floatingSelect">Tipo de presupuesto</label>
          </div>
        </div>
        <div class="col-md">
          <div class="form-floating">
            <select
              v-model.number="idPre"
              class="form-select"
              id="floatingSelect2"
              aria-label="Floating label select example"
            >
              <option
                name="presupuesto"
                v-for="(val, key) in cabPresupuestoFiltrado"
                :key="key"
                :value="val.id"
              >
                {{ val.descripcion }}
              </option>
            </select>
            <label for="floatingSelect2">Presupuesto</label>
          </div>
        </div>
        <div class="col-md">
          <button @click="cargar()">Buscar</button>
        </div>
      </div>
    </form>
    <div>
      <table class="table table-striped table-hover table-responsive">
        <thead>
          <tr>
            <th>id</th>
            <th>Cuenta</th>
            <th>Descripción</th>
            <th>Importe</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(val, key) in detPresupuesto" :key="key">
            <td class="text-start">{{ val.id }}</td>
            <td class="text-start">{{ val.cuenta }}</td>
            <td class="text-start">{{ val.descripcion }}</td>
            <td v-if="val.hijo == 1">
              <input
                class="text-end sm"
                type="number"
                name=""
                id=""
                :value="val.monto"
                v-on:change="ver(val, $event)"
              />
            </td>
            <td v-else class="text-end">
              {{ val.monto }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <button @click="volverAtras">volver</button>
  </div>
</template>

<script>
export default {
  name: "BasePresupuesto",
  data() {
    return {
      URL: "http://localhost:3000/api/entity/",
      tipoPresupuesto: [],
      cabPresupuesto: [],
      detPresupuesto: [],
      idPre: 0,
      idTipo: 0,
      cargando: false,
      cabPresupuestoFiltrado: [],
      isActive: false,
      cambios: [],
    };
  },
  created: async function () {
    this.tipoPresupuesto = await this.cargarDatos("tipoPresupuesto");
    this.cabPresupuesto = await this.cargarDatos("cabPresupuesto");
  },
  methods: {
    volverAtras() {
      this.$router.go(-1);
    },
    async cargarDatos(entity, params = "") {
      this.cargando = true;
      return await fetch(this.URL + entity + params)
        .then((res) => res.json())
        .catch((err) => console.log(`${err}`))
        .finally(() => {
          this.cargando = false;
          console.log("Finalizo la peticion de datos");
        });
    },
    async actualizarDatos(entity, obj) {
      const encabezado = {
        method: "PUT",
        mode: "no-cors",             
        headers: {
          Accept: '*/*',
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        body: obj,
      };

      this.cargando = true;
      return await fetch(this.URL + entity, encabezado)
        .then((res) => res.json())
        .catch((err) => console.log(`${err}`))
        .finally(() => {
          this.cargando = false;
          console.log("Finalizo la actualización de datos");
        });
    },
    async cargarPre() {
      this.detPresupuesto = await this.cargarDatos(
        "cabPresupuesto",
        "?idtipopre=" + this.idTipo
      );
    },
    async cargar() {
      this.detPresupuesto = await this.cargarDatos(
        "detPresupuesto",
        "?idcab=" + this.idPre
      );
    },
    filtrarPre() {
      this.cabPresupuestoFiltrado = this.cabPresupuesto.filter(
        (el) => el.idtipopre === this.idTipo
      );
      console.log(this.cabPresupuestoFiltrado);
    },
    actualizarImporte(el) {
      console.log(el);
    },
    ver(obj, event) {
      const objUpdate = {
        id: obj.id,
        monto: event.target.value,
      };
      console.log(objUpdate);
      this.actualizarDatos("detPresupuesto", objUpdate);
    },
  },
};
</script>

<style>
</style>