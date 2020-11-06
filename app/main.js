(() => {
  // Define components.
  Vue.component('resume-base', {
    props: ['resume'],
    template: `<div class="resume">
      <resume-header :resume="resume" />
      <pre>{{ resume }}</pre>
    </div>`,
  });

  Vue.component('resume-header', {
    props: ['resume'],
    template: `<div v-if="resume" class="resume__header">
      <img v-if="resume.photo" :src="resume.photo" alt="resume.name"/>
      <h1>{{ resume.name }}</h1>
      <resume-contact-info :resume="resume" />
    </div>`,
  });

  Vue.component('resume-contact-info', {
    props: ['resume'],
    template: `<div v-if="resume" class="resume__contact-info">
      <h2 class="sr-only">Contact information</h2>
      <ul class="resume__contact">
        <li v-if="resume.email">
          <a :href="'mailto:' + resume.email">{{ resume.email }}</a>
        </li>
        <li v-if="resume.phone">
          <a :href="'tel:+1' + resume.phone.replace('.', '')">{{ resume.phone }}</a>
        </li>
      </ul>
    </div>`,
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
