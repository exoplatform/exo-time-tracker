<template>
  <exo-drawer
    ref="addTeamMemberDrawer"
    right
    class="">
    <template slot="title">
      {{ $t("exo.timeTracker.teams.text.add.member") }}
    </template>
    <template slot="content">
      <div class="ma-3">
        <v-form ref="form" v-model="valid">
          <div>
            <v-label for="role">
              {{ $t("exo.timeTracker.teams.addTeamMember.drawerLabelRole") }}
            </v-label>
            <select
              v-model="role"
              name="role"
              class="input-block-level ignore-vuetify-classes my-3">
              <option
                v-for="item in roles"
                :key="item"
                :value="item">
                {{ item }}
              </option>
            </select>
          </div>
          <div>
            <v-label for="userName">
              {{ $t("exo.timeTracker.teams.addTeamMember.drawerLabelMembers") }}
            </v-label>
            <exo-identity-suggester
              ref="autoFocusInput3"
              v-model="suggestedMembers"
              :labels="suggesterLabels"
              name="inviteMembers"
              type-of-relations="member_of_space"
              :search-options="searchOptions"
              include-users
              multiple />
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
    roles: ['Member', 'InWard', 'OutWard'],
    defaultItem: {
      userName: '',
      role: '',
    },
    teamMember: {
      userName: '',
      role: '',
    },
    suggestedMembers: [],
    role: 'Member',
    searchOptions: {
      spaceURL: 'exo_employees',
      currentUser: ''
    }
  }),
  computed: {
    suggesterLabels() {
      return {
        placeholder: 'Invite Members',
        noDataLabel: 'No data',
      };
    }
  },
  methods: {
    save() {
      this.$emit('save', this.suggestedMembers, this.role);
      this.suggestedMembers = [];
      this.$refs.addTeamMemberDrawer.close();
    },
    cancel() {
      this.teamMember = this.defaultItem;
      this.$refs.addTeamMemberDrawer.close();
    },
    open() {
      this.teamMember = this.defaultItem;
      this.$refs.addTeamMemberDrawer.open();
    },
  }
};
</script>
