<template>
  <exo-drawer
    ref="editActivityDrawer"
    right
    class="">
    <template slot="title">
      {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerTitle") }}
    </template>
    <template slot="content">
      <div class="ma-3">
        <v-form ref="form" v-model="valid">
          <div>
            <v-label for="type">
              {{ $t("exo.timeTracker.activityManagement.drawerLabelType") }}
            </v-label>
            <select
              v-model="activity.type"
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
          <div>
            <v-label for="subType">
              {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerLabelSubtype") }}
            </v-label>
            <select
              v-model="activity.subType"
              name="subType"
              :disabled="!activity.type.id"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in filtredSubTypes"
                :key="item.id"
                :value="item">
                {{ item.displayLabel }}
              </option>
            </select>
          </div>
          <div>
            <v-label for="activityCode">
              {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerLabelActivity") }}
            </v-label>
            <select
              v-model="activity.activityCode"
              name="activityCode"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in activityCodes"
                :key="item.id"
                :value="item">
                {{ item.displayLabel }}
              </option>
            </select>
          </div>
          <div>
            <v-label for="subActivityCode">
              {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerLabelSubactivity") }}
            </v-label>
            <select
              v-model="activity.subActivityCode"
              name="subActivityCode"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in subActivityCodes"
                :key="item.id"
                :value="item">
                {{ item.displayLabel }}
              </option>
            </select>
          </div>
          <div>
            <v-label for="label">
              {{ $t("exo.timeTracker.activityManagement.drawerLabelTextLabel") }}
            </v-label>
            <input
              ref="label"
              v-model="activity.label"
              type="text"
              name="label"
              class="input-block-level ignore-vuetify-classes my-3">
          </div>
          <div>
            <v-label for="project">
              {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerLabelProject") }}
            </v-label>
            <select
              v-model="activity.project"
              name="project"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in projects"
                :key="item.id"
                :value="item">
                {{ item.displayLabel }}
              </option>
            </select>
          </div>
          <div>
            <v-label for="feature">
              {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerLabelFeature") }}
            </v-label>
            <select
              v-model="activity.feature"
              name="feature"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in features"
                :key="item.id"
                :value="item">
                {{ item.displayLabel }}
              </option>
            </select>
          </div>
          <div 
            id="timeTrackerDivAutoCompleteTeamsListItems"
            class="position-relative contactAutoComplete">
            <v-label for="teams">
              {{ $t("exo.timeTracker.activities.editActivitiesDrawer.drawerLabelTeams") }}
            </v-label>
            <v-autocomplete
              ref="selectEdit"
              v-model="teamIds"
              :items="teams"
              outlined
              class="ma-0 pa-0"
              menu-props="{ closeOnClick: true}"
              attach="#timeTrackerDivAutoCompleteTeamsListItems"
              dense
              chips
              small-chips
              multiple
              item-text="name"
              item-value="id"
              @click.stop />
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
    activity: {
      type: Object,
      default: () => {
        return {
          code: '',
          type: '',
          subType: true,
          activity: '',
          subActivity: '',
          label: '',
          project: {
            id: '',
          },
          feature: {
            id: '',
          },
        };
      },
    },
    projects: {
      type: Array,
      default: () => null,
    },
    features: {
      type: Array,
      default: () => null,
    },
    activityCodes: {
      type: Array,
      default: () => null,
    },
    subActivityCodes: {
      type: Array,
      default: () => null,
    },
    types: {
      type: Array,
      default: () => null,
    },
    subTypes: {
      type: Array,
      default: () => null,
    },
    teams: {
      type: Array,
      default: () => null,
    },
    otherSettings: {
      type: Object,
      default: () => null,
    }
  },
  data: () => ({
    defaultItem: {
      type: '',
      subType: '',
      activity: '',
      subActivity: '',
      label: '',
      project: {
        id: '',
        label: ''
      },
      feature: {
        id: '',
        label: ''
      },
    },
    teamIds: []
  }),
  computed: {
    filtredSubTypes() {
      return this.subTypes.filter(subType => {
        return (
          this.activity.type.id && subType.type.id===this.activity.type.id
        );
      });
    }
  },
  methods: {
    save() {
      const teams = [];
      for (const team of this.teamIds) {
        const t_ = {
          id: team,
        };
        teams.push(t_);
      }
      this.activity.teams = teams;
      this.$emit('save', this.activity);
      this.$refs.editActivityDrawer.close();
    },
    cancel() {
      this.$refs.editActivityDrawer.close();
    },
    open() {
      setTimeout(() => {
        this.teamIds=[];
        if (this.activity.teams!== 'undefined' && this.activity.teams.length > 0) {
          this.teamIds = this.activity.teams.map(a => a.id);
        }
      }, 100);
      this.$refs.editActivityDrawer.open();
    },
  }
};
</script>
