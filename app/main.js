(() => {
  // Define components.
  Vue.component('resume-base', {
    props: ['resume'],
    template: `<div class="resume">
      <resume-header :resume="resume" />
      <resume-section heading="Education">
        <resume-education :resume="resume" />
      </resume-section>
      <resume-section heading="Work">
        <resume-work :resume="resume" />
      </resume-section>
    </div>`,
  });

  Vue.component('resume-header', {
    props: ['resume'],
    template: `<div v-if="resume" class="resume__header">
      <div v-if="resume.photo" class="resume__photo">
        <img :src="resume.photo" :alt="'Photo of ' + resume.name"/>
      </div>
      <h1>{{ resume.name }}</h1>

      <resume-contact-info :resume="resume" />
      <links-list :resume="resume" />
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
          <a :href="'tel:+1' + resume.phone.replace(/\\./g, '')">{{ resume.phone }}</a>
        </li>
      </ul>
    </div>`,
  });

  Vue.component('links-list', {
    props: ['resume', 'heading'],
    template: `<div v-if="resume" class="links-list">
      <h2 class="sr-only">{{ heading || 'Links' }}</h2>
      <ul class="links-list__list">
        <li v-for="(link, i) in resume.links" :key="'link-' + i">
          <a :href="link">{{ link.replace(/^https?:\\/\\//, '') }}</a>
        </li>
      </ul>
    </div>`,
  });

  Vue.component('resume-section', {
    props: ['heading'],
    template: `<section class="section">
      <h2 v-if="heading">{{ heading }}</h2>
      <slot />
    </section>`,
  });

  Vue.component('resume-education', {
    props: ['resume'],
    template: `<ul v-if="resume && resume.education" class="ed-list">
        <li v-for="(ed, j) in resume.education" :key="'edu-' + j" class="degree">
          <h3>{{ ed.school }}</h3>
          <div class="degree__name">{{ ed.degree }}</div>
          <div class="degree__year">{{ ed.year }}</div>
        </li>
      </ul>`,
  });

  Vue.component('resume-work', {
    props: ['resume'],
    template: `<ul v-if="resume && resume.work">
        <li v-for="(job, k) in resume.work" :key="'work-' + k" class="job">
          <h3>{{ job.jobtitle }}</h3>
          <div v-if="job.company && job.company.name" class="job__company">
            <img v-if="job.company.logo" :src="job.company.logo" :alt="job.company.name + ' logo'" />
            <h4>
              <a v-if="job.company.website" :href="job.company.website">{{ job.company.name }}</a>
              <span v-else>{{ job.company.name }}</span>
            </h4>
          </div>
          <div class="job__time">{{ job.time }}</div>
          <div class="job__description">{{ job.description }}</div>
        </li>
      </ul>`,
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
