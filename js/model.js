App.Action = Backbone.Model.extend({
  urlRoot: "./data/actions.php",
  defaults: {
    'amount': 0,
    'date': moment(),
    'section': '',
    'subsection': '',
    'detail': '',
    'account': '',
    'way': '',
    'isIncome': 0,
    'debitDay': '',
    'shop': ''
  },
  parse: function(attrs) {
    attrs.date = moment(attrs.date);
    attrs.debitDay = moment(attrs.debitDay);
    return attrs;
  },
  validate: function(attrs) {
    if (!attrs.amount) {
      return '金額は必須です';
    }
    if (!attrs.section) {
      return '費目は必須です';
    }
    if (!attrs.subsection) {
      return '内訳は必須です';
    }
    if (!attrs.date) {
      return '日付は必須です';
    }
    if (!moment.isMoment(attrs.date) || !attrs.date.isValid()) {
      return '日時の形式が不正です';
    }
  },
  formatAmount: function() {
    return App.formatAmount(this.get('amount'));
  },
  formatDate: function(f) {
    return this.get('date').format(f);
  },
  formatDebitDay: function(f) {
    var debitDay = this.get('debitDay');
    return (debitDay && debitDay.isValid())? debitDay.format(f): '';
  }
});

App.Actions = Backbone.Collection.extend({
  url: "./data/actions.php",
  model: App.Action,
  parse : function(resp) {
    return resp.data;
  },
  //localStorage: new Backbone.LocalStorage('ActionsBook'),
  findByDate: function(date) {
    var format = 'YYYY-MM-DD';
    var targetDate = moment(date).format(format);

    return this.select(function(model) {
      return model.formatDate(format) === targetDate;
    });
  },
  findActions: function(account, date, section, subsection, way, isIncome) {
    var actions = this.chain();
    if(date) {
      var format = 'YYYY-MM';
      var targetDate = moment(date).format(format);
      
      actions = actions.select(function(model) {
         return model.formatDate(format) === targetDate;
      });
    }
    if(account) {
      actions = actions.select(function(model) {
        return model.get('account') === account;
      });
    }
    if(section) {
      actions = actions.select(function(model) {
        return model.get('section') === section;
      });
    }
    if(subsection) {
      actions = actions.select(function(model) {
        return model.get('subsection') === subsection;
      });
    }
    if(subsection) {
      actions = actions.select(function(model) {
        return model.get('subsection') === subsection;
      });
    }
    if(!isIncome === null) {
      actions = actions.select(function(model) {
        return model.get('isIncome') === isIncome;
      });
    }

    return actions.sortBy(function(model) {
      return model.get('date');
    }).value();
  }
});

//App.Sections = Backbone.Collection.extend({
//  model: App.Section,
//  nextIndex: function(){
//    console.log(this)
//    if(this.length > 0)
//      return this[this.length - 1].get('id') + 1;
//    else return 0;
//  }
//});

App.Section = Backbone.Model.extend({
 　urlRoot: "./data/sections.php"
});

App.Subsection = Backbone.Model.extend({
 　urlRoot: "./data/subsections.php"
});

App.Account = Backbone.Model.extend({
 　urlRoot: "./data/accounts.php"
});

App.Way = Backbone.Model.extend({
 　urlRoot: "./data/ways.php"
});

App.Shop = Backbone.Model.extend({
 　urlRoot: "./data/shops.php"
});

App.List = Backbone.Collection.extend({
  parse : function(resp) {
    return resp.data;
  },
  createOnlyNames: function(names) {
    for(var i=0,length=names.length; length > i; i++) {
      if (names[i] && !this.checkOverlap(names[i])) {
        this.create({
          'name': names[i]
        })
      }
    }
  },
  checkOverlap:  function(name) {
    for(var i=0,length=this.length; length > i; i++) {
      if (this.models[i].get('name') === name)
        return true;
    }
    return false;
  },
});

App.SectionsList = App.List.extend({
  model: App.Section,
  url: "./data/sections.php",
//  localStorage: new Backbone.LocalStorage('sectionsList')
});

App.SubsectionsList = App.List.extend({
  model: App.Subsection,
  url: "./data/subsections.php",
//  localStorage: new Backbone.LocalStorage('subsectionsList')
});

App.AccountsList = App.List.extend({
  model: App.Account,
  url: "./data/accounts.php",
//  localStorage: new Backbone.LocalStorage('accountsList')
});

App.WaysList = App.List.extend({
  model: App.Way,
  url: "./data/ways.php",
//  localStorage: new Backbone.LocalStorage('waysList')
});

App.ShopsList = App.List.extend({
  model: App.Shop,
  url: "./data/shops.php",
//  localStorage: new Backbone.LocalStorage('shopList')
});