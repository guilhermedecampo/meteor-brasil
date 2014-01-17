Template.sobre.rendered = function () {
  marked.setOptions({
      langPrefix: '',
      breaks: true,
      gfm: true,
      sanitize: true,
      highlight: function(code) {
          return hljs.highlightAuto(code).value;
      }
  });
};

Template.sobre.helpers({
  showCreateContent: function () {
    return Session.get('createContent');
  },
  firstName: function () {
    return Meteor.user().profile.first_name;
  },
  list: function () {
    return Posts.find({},{sort: {SortCreated: -1}, limit: 10});
  }
});
