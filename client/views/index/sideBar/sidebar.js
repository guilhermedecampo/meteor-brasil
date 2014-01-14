

Template.sideBar.events({
  'click .tagListing': function (event, template) {
    var content = this.tag;
    Meteor.Router.to('/application/search');
    Session.set("search_keywords", content);

  },

});

Template.sideBar.helpers({
  displayName: function(){
    var user = Meteor.user();
    return user;
  },
});

Template.sideBar.hotArticles = function () {
  hotArticles = Posts.find({category:"artigo"},{sort: {openCount: -1}, limit: 5});
  return hotArticles;
};

Template.sideBar.hotVideos = function () {
  hotVideos = Posts.find({category:"videoTutorial"},{sort: {openCount: -1}, limit: 5});
  return hotVideos;
};

