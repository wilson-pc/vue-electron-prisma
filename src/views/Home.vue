<template>
  <div class="q-pa-md">
    <q-table
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="id"
      :filter="filter"
      :loading="loading"
    >
      <template v-slot:top>
        <q-btn
          color="primary"
          :disable="loading"
          label="Add row"
          @click="prompt = true"
        />

        <q-space />
        <q-input
          borderless
          dense
          debounce="300"
          color="primary"
          v-model="filter"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </template>
    </q-table>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">User data</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input placeholder="email" dense v-model="user.email" autofocus />
          <q-input placeholder="Name" dense v-model="user.name" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add user" @click="addUser()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
// @ is an alias to /src
import { prisma } from "../db";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      rows: [],
      columns: [
        {
          name: "name",
          label: "Name",
          align: "left",
          field: "name",
          sortable: true,
          filter: true,
        },
        {
          name: "email",
          label: "Email",
          align: "left",
          field: "email",
          sortable: true,
          filter: true,
        },
      ],
      filter: "",
      loading: false,
      prompt: false,
      user: {
        email: "",
        name: "",
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.loading = true;

      prisma.user.findMany().then((data) => {
        this.rows = data;
        this.loading = false;
      });
    },
    addUser() {
      prisma.user
        .create({
          data: {
            email: this.user.email,
            name: this.user.name,
          },
        })
        .then(() => {
          this.fetchData();
          this.prompt = false;
        });
    },
  },
};
</script>
