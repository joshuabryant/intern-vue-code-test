(() => {
  // Define components.
  Vue.component('message-item', {
    props: ['message'],
    template: '<div>{{ message }}</div>',
  });

  // Instantiate the app.
  const app = new Vue({
    el: '#app',
    data: {
      message: 'Good luck!',
    },
  });
})();
