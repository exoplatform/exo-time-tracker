import activityManagementApp from './components/activityManagementApp.vue';
import './../css/main.less';
Vue.use(Vuetify);


const vuetify = new Vuetify({
  dark: true,
  iconfont: 'mdi',
});

console.log('timetracking init');
const lang = eXo && eXo.env && eXo.env.portal && eXo.env.portal.language;
const resourceBundleName = 'locale.portlet.TimeTracker';
const url = `${eXo.env.portal.context}/${eXo.env.portal.rest}/i18n/bundle/${resourceBundleName}-${lang}.json`;

exoi18n.loadLanguageAsync(lang, url).then(i18n => {
  new Vue({
    render: (h) => h(activityManagementApp),
    i18n,
    vuetify
  }).$mount('#activityManagementApp');
});
