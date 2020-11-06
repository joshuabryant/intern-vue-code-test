(() => {
  // Define components.
  Vue.component('resume-base', {
    props: ['resume'],
    template: '<pre>{{ resume }}</pre>',
  });

  // Instantiate the app.
  const app = new Vue({
    el: '#app',
    data: {
      resume: null,
      api: 'https://wip.journeygroup.com/intern-api/joshbryant.json',
    },
    async created() {
      this.resume = await fetch(this.api).then((response) => response.json());
    },
  });
})();
