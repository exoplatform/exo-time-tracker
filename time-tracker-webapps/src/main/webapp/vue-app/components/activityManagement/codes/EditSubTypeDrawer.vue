<template>
  <exo-drawer
    ref="editSubTypeDrawer"
    right
    class="">
    <template slot="title">
      {{ $t("exo.timeTracker.codes.editSubTypeDrawer.toolbarTitle") }}
    </template>
    <template slot="content">
      <div class="ma-3">
        <v-form ref="form" v-model="valid">
          <div>
            <v-label for="code">
              {{ $t("exo.timeTracker.activityManagement.drawerLabelCode") }}
            </v-label>
            <input
              ref="code"
              v-model="subType.code"
              type="text"
              name="code"
              class="input-block-level ignore-vuetify-classes my-3">
          </div>
          <div>
            <v-label for="label">
              {{ $t("exo.timeTracker.activityManagement.drawerLabelTextLabel") }}
            </v-label>
            <input
              ref="label"
              v-model="subType.label"
              type="text"
              name="label"
              class="input-block-level ignore-vuetify-classes my-3">
          </div>
          <div>
            <v-label for="type">
              {{ $t("exo.timeTracker.activityManagement.drawerLabelType") }}
            </v-label>
            <select
              v-model="subType.type"
              name="type"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in types"
                :key="item.id"
                :value="item">
                {{ item.displayLabel }}
              </option>
            </select>
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
  props: {
    types: {
      type: Array,
      default: () => null,
    }
  },
  data: () => ({
    defaultItem: {
      code: '',
      label: '',
      spec: '',
      type: '',
    },
    subType: {
      code: '',
      label: '',
      type: ''
    },
  }),
  methods: {
    save() {
      this.$emit('save', this.subType);
      this.subType = this.defaultItem;
      this.$refs.editSubTypeDrawer.close();
    },
    cancel() {
      this.subType = this.defaultItem;
      this.$refs.editSubTypeDrawer.close();
    },
    open(subType) {
      this.subType = subType;
      this.$refs.editSubTypeDrawer.open();
    },
  }
};
</script>
