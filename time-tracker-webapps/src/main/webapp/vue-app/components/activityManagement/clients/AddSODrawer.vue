<template>
  <exo-drawer
    ref="addSODrawer"
    right
    class="">
    <template slot="title">
      {{ $t("exo.timeTracker.clients.addSODrawer.drawerTitel") }}
    </template>
    <template slot="content">
      <div class="ma-3">
        <v-form ref="form" v-model="valid">
          <div>
            <v-label for="name">
              {{ $t("exo.timeTracker.clients.addSODrawer.drawerLabelName") }}
            </v-label>
            <input
              ref="name"
              v-model="so.name"
              type="text"
              name="name"
              class="input-block-level ignore-vuetify-classes my-3">
          </div>
          <div>
            <v-label for="description">
              {{ $t("exo.timeTracker.clients.addSODrawer.drawerLabelDescription") }}
            </v-label>
            <input
              ref="description"
              v-model="so.description"
              type="text"
              name="description"
              class="input-block-level ignore-vuetify-classes my-3">
          </div>
        </v-form>
      </div>
    </template>
    <template slot="footer">
      <div class="d-flex">
        <v-spacer />
        <v-btn class="btn mr-2" @click="cancel()">
          <template>
            {{ $t("exo.timeTracker.drawerButtonCancel") }}
          </template>
        </v-btn>
        <v-btn class="btn btn-primary" @click="save()">
          <template>
            {{ $t("exo.timeTracker.drawerButtonSave") }}
          </template>
        </v-btn>
      </div>
    </template>
  </exo-drawer>
</template>

<script>
export default {
  data: () => ({
    defaultItem: {
      name: '',
      description: '',
    },
    so: {
      name: '',
      description: '',
    },
  }),
  methods: {
    save() {
      this.$emit('save', this.so);
      this.resetForm();
      this.$refs.addSODrawer.close();
    },
    cancel() {
      this.resetForm();
      this.$refs.addSoDrawer.close();
    },
    open() {
      this.resetForm();
      this.$refs.addSODrawer.open();
    },
    resetForm(){
      this.so.name='';
      this.so.description='';
    }
  }
};
</script>
