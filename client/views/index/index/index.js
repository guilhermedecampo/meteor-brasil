// TODO in more than one project
Handlebars.registerHelper('ifAny', function(data, options) {
  if (!data || (_.isArray(data) && !data.length) || (_.isFunction(data.fetch) && !data.count()))
    return options.inverse(this);
  else
    return options.fn(this);
});

Handlebars.registerHelper('dotdotdot', function(str) {
  if (str !== undefined) {
  str=str.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 (Link->$1) ");
  str=str.replace(/<(?:.|\s)*?>/g, "");
  if (str.length > 200)
    return str.substring(0,200) + '...';
  return str;
}
});

Template.index.rendered = function () {
  Session.set("showSedisList", true);
};

Template.index.helpers({
  /*
  list: function () {
    keyArray = Session.get("search_keywords").split(" ");
    console.log(keyArray);
    keywords = [];
    for (var i = 0; i < keyArray.length; i++) {
      keywords.push(new RegExp(keyArray[i],"i"));
      console.log(keywords);
    }
      console.log(keywords);
      sedis = Sedis.find({$or:
        [
        {$match:{title:{$in: keywords}}},
        {$match:{description:{$in: keywords}}},
        {$match:{content:{$in: keywords}}},
        {$match:{tags:{$in: keywords}}},
        {$match:{links:{$in: keywords}}},
        {$match:{comments:{$in: keywords}}}
        ]
      }, {sort: {SortCreated: -1}}).fetch();
      console.log(sedis);
      sedisSliced = sedis.slice(0,Session.get('slice'));
      return sedisSliced;
  },*/
  allSedis: function() {
      if (this.sedis.length > 0) {
        if (this.sedis.length == this.sedisSliced.length){
          return false;
        } else {
          return true;
        }
      } else {
        this.stop();
      }
  },

});






x = 3;

Template.index.events({
  'click #submit': function () {
    x = x + 3;
    Session.set('slice', x);
  },

});
