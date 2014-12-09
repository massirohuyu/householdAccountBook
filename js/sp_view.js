// App.CalendarView = Backbone.View.extend({
//   initialize: function() {
//     this.listenTo(this.collection, 'add change remove', this.render);
//     this.listenTo(App.mediator, 'calendar:prev', this.toPrev);
//     this.listenTo(App.mediator, 'calendar:next', this.toNext);
//     this.listenTo(App.mediator, 'calendar:today', this.toToday);
//     this.listenTo(App.mediator, 'calendar:average', this.average);
//     this.listenTo(App.mediator, 'calendar:changeAccount', this.onChangeAccount);
//     this.listenTo(App.mediator, 'calendar:moveTo', this.moveTo);
//   },
//   render: function(model) {
//     if(!this.current) return true;
//     var changedModel = model || 0;

//     var $caption = this.$('caption');
//     var $tbody = this.$('tbody');
//     var currentDay = this.current.clone().startOf('month').startOf('week');
//     var endDay = this.current.clone().endOf('month');

//     $tbody.empty();
//     $caption.text( this.current.format('YYYY年MM月') );

//     var actions = this.collection.findActions(this.account, this.current);
//     var allActions = this.collection.findActions(this.account);
//     var totalIncome = 0;
//     var totalExpend = 0;
//     var total = 0;
//     var allTotal = 0;
//     var sign = '';

//     _.each(actions, function(model) {
//       var actionView = new App.ActionView({
//         model: model
//       });
//       actionView.$el.appendTo($tbody);
//       if ( model === changedModel ) {
//         actionView.$el.addClass('addorchanged');
//       }

//       var amount = Number(model.get('amount'));

//       if(model.get('isIncome')) {
//         totalIncome += amount;
//       } else {
//         totalExpend += amount;
//       }

//     });

//     total = totalIncome - totalExpend;
//     sign = total < 0 ? 'expendAmount' : 'incomeAmount';

//     $tbody.append('<tr><td>月収入</td><td class="incomeAmount">' + App.formatAmount(totalIncome) + '</td></tr>');

//     $tbody.append('<tr><td>月支出</td><td class="expendAmount">' + App.formatAmount(totalExpend) + '</td></tr>');

//     $tbody.append('<tr><td>月合計</td><td class="' + sign + '">' + App.formatAmount(total) + '</td></tr>');

//     _.each(allActions, function(model) {
//       allTotal += Number(model.get('isIncome')? model.get('amount'): 0-model.get('amount'));
//     });
//     sign = allTotal < 0 ? 'expendAmount' : 'incomeAmount';
//     $tbody.append('<tr><td>全合計</td><td class="' + sign + '">' + App.formatAmount(allTotal) + '</td></tr>');

// //    while (currentDay <= endDay) {
// //      var $tr = $('<tr>').appendTo($tbody);
// //      for (var i = 0; i < 7; i++) {
// //        var $td = $('<td>').text( currentDay.format('MM/DD') ).appendTo($tr);
// //        currentDay.add(1, 'day');
// //      }
// //    }
//   },
//   average: function(firstYear, firstMonth, finishYear, finishMonth) {
//     if(!(firstYear&&firstMonth&&finishYear&&finishMonth)) return true;

//     var $caption = this.$('caption');
//     var $tbody = this.$('tbody');

//     var firstDate = moment({y: firstYear, M: firstMonth-1});
//     var finishDate = moment({y: finishYear, M: finishMonth-1});

//     $tbody.empty();
//     $caption.text( firstDate.format('YYYY年MM月') + ' - ' + finishDate.format('YYYY年MM月') );

//     var actions = [];
//     var allActions = [];
//     for(var currentDate = firstDate,number = 0; currentDate <= finishDate; currentDate.add(1, 'month') ) {
//       console.log(moment(currentDate).format('YYYY-MM'));
//       //actions.push(this.collection.findActions(this.account, currentDate));
//       allActions = allActions.concat(this.collection.findActions(this.account, currentDate));
//       number++;
//     }
//     console.log(number);
//     actions = allActions;
//     var totalIncome = 0;
//     var totalExpend = 0;
//     var total = 0;
//     var aveIncome = 0;
//     var aveExpend = 0;
//     var aveTotal = 0;
//     var allTotal = 0;
//     var sign = '';

//     _.each(actions, function(model) {

//       var amount = Number(model.get('amount'));

//       if(model.get('isIncome')) {
//         totalIncome += amount;
//       } else {
//         totalExpend += amount;
//       }

//     });
//     total = totalIncome - totalExpend;

//     aveIncome = parseInt(totalIncome/number);
//     aveExpend = parseInt(totalExpend/number);
//     aveTotal = parseInt(total/number);

//     sign = total < 0 ? 'expendAmount' : 'incomeAmount';
//     $tbody.append('<tr><td>月平均残額</td><td class="' + sign + '">' + App.formatAmount(aveTotal) + '</td></tr>');

//     $tbody.append('<tr><td>月平均収入</td><td class="incomeAmount">' + App.formatAmount(aveIncome) + '</td></tr>');

//     $tbody.append('<tr><td>月平均支出</td><td class="expendAmount">' + App.formatAmount(aveExpend) + '</td></tr>');

//     _.each(allActions, function(model) {
//       allTotal += Number(model.get('isIncome')? model.get('amount'): 0-model.get('amount'));
//     });
//     sign = allTotal < 0 ? 'expendAmount' : 'incomeAmount';
//     $tbody.append('<tr><td>全合計</td><td class="' + sign + '">' + App.formatAmount(allTotal) + '</td></tr>');
//   },
//   toPrev: function() {
//     this.current.subtract(1, 'month');
//     this.render();
//     App.router.navigate(this.current.format('YYYY/MM'));
//   },
//   toNext: function() {
//     this.current.add(1, 'month');
//     this.render();
//     App.router.navigate(this.current.format('YYYY/MM'));
//   },
//   toToday: function() {
//     this.current = moment();
//     console.log(this.current);
//     this.render();
//     App.router.navigate('');
//   },
//   moveTo: function(year, month) {
//     console.log(year + ':' + month);
//     this.current = moment({ year: year, month: month - 1 });
//     this.render();
//   },
//   onChangeAccount: function(account) {
//     this.account = account;
//     this.collection.model.prototype.defaults.account = account;
//     this.render();
//   }
// });

// --------------------------------------------------------------------------

// App.SectionListView = Backbone.View.extend({
//   initialize: function() {
//     this.listenTo(this.collection, 'add change remove', this.render);
//     this.listenTo(App.mediator, 'calendar:prev', this.toPrev);
//     this.listenTo(App.mediator, 'calendar:next', this.toNext);
//     this.listenTo(App.mediator, 'calendar:today', this.toToday);
//     this.listenTo(App.mediator, 'calendar:average', this.average);
//     this.listenTo(App.mediator, 'calendar:changeAccount', this.onChangeAccount);
//     this.listenTo(App.mediator, 'calendar:moveTo', this.moveTo);
//   },
//   render: function() {
//     if(!this.current) return true;

//     var $tbody = this.$('tbody');
//     $tbody.empty();

//     var actions = this.collection.findActions(this.account, this.current);
//     var account = App.accounts.get(this.account);
//     var allActions = this.collection.findActions(this.account);
//     var defferenceTotal = 0;

//     App.sections.each(function(model) {
//       var actionView = new App.SectionActionView({
//         model: model,
//         actions: actions,
//         account: account
//       });

//       $tbody.append(actionView.$el);
//       defferenceTotal += actionView.defference;
//     });

//     var totalClassName = defferenceTotal > 0? "incomeAmount": "expendAmount";
//     $tbody.append('<tr><td>予算との差の合計</td><td></td><td></td><td class="' + totalClassName + '"><strong>' +
//       App.formatAmount(defferenceTotal) + '</strong></td></tr>');
//   },
//   average: function(firstYear, firstMonth, finishYear, finishMonth) {
//     if(!(firstYear&&firstMonth&&finishYear&&finishMonth)) return true;

//     var $tbody = this.$('tbody');

//     var firstDate = moment({y: firstYear, M: firstMonth-1});
//     var finishDate = moment({y: finishYear, M: finishMonth-1});

//     $tbody.empty();

//     var actions = [];
//     var allActions = [];
//     var account = App.accounts.get(this.account);
//     for(var currentDate = firstDate,number = 0; currentDate <= finishDate; currentDate.add(1, 'month') ) {
//       console.log(moment(currentDate).format('YYYY-MM'));
//       //actions.push(this.collection.findActions(this.account, currentDate));
//       allActions = allActions.concat(this.collection.findActions(this.account, currentDate));
//       number++;
//     }
//     // console.log(number);
//     // actions = allActions;
//     // var totalIncome = 0;
//     // var totalExpend = 0;
//     // var total = 0;
//     // var aveIncome = 0;
//     // var aveExpend = 0;
//     // var aveTotal = 0;
//     // var allTotal = 0;
//     // var sign = '';

//     // _.each(actions, function(model) {

//     //   var amount = Number(model.get('amount'));

//     //   if(model.get('isIncome')) {
//     //     totalIncome += amount;
//     //   } else {
//     //     totalExpend += amount;
//     //   }

//     // });
//     // total = totalIncome - totalExpend;

//     // aveIncome = parseInt(totalIncome/number);
//     // aveExpend = parseInt(totalExpend/number);
//     // aveTotal = parseInt(total/number);

//     // sign = total < 0 ? 'expendAmount' : 'incomeAmount';
//     // $tbody.append('<tr><td>月平均残額</td><td class="' + sign + '">' + App.formatAmount(aveTotal) + '</td></tr>');

//     // $tbody.append('<tr><td>月平均収入</td><td class="incomeAmount">' + App.formatAmount(aveIncome) + '</td></tr>');

//     // $tbody.append('<tr><td>月平均支出</td><td class="expendAmount">' + App.formatAmount(aveExpend) + '</td></tr>');

//     // _.each(allActions, function(model) {
//     //   allTotal += Number(model.get('isIncome')? model.get('amount'): 0-model.get('amount'));
//     // });
//     // sign = allTotal < 0 ? 'expendAmount' : 'incomeAmount';
//     // $tbody.append('<tr><td>全合計</td><td class="' + sign + '">' + App.formatAmount(allTotal) + '</td></tr>');
//   },
//   toPrev: function() {
//     this.current.subtract(1, 'month');
//     this.collection.model.prototype.defaults.date = this.current;
//     this.render();
//     App.router.navigate(this.current.format('YYYY/MM'));
//   },
//   toNext: function() {
//     this.current.add(1, 'month');
//     this.collection.model.prototype.defaults.date = this.current;
//     this.render();
//     App.router.navigate(this.current.format('YYYY/MM'));
//   },
//   toToday: function() {
//     this.current = moment();
//     this.collection.model.prototype.defaults.date = this.current;
//     this.render();
//     App.router.navigate('');
//   },
//   moveTo: function(year, month) {
//     this.current = moment({ year: year, month: month - 1 });
//     this.collection.model.prototype.defaults.date = this.current;
//     this.render();
//   },
//   onChangeAccount: function(account) {
//     this.account = account;
//     this.render();
//   }
// });

// App.ActionView = Backbone.View.extend({
//   tagName: 'tr',
//   template:
//     '<td class="date"><%= model.formatDate("YYYY/MM/DD") %> (<span class="<%= day %>"><%= day %></span>)</td>' +
//     '<td class="section"><%= section %></td>' +
//     '<td class="subsection"><%= subsection %></td>' +
//     '<td class="<%= isIncome? "incomeAmount": "expendAmount" %>"><%= model.formatAmount() %></td>' +
//     '<td class="detail"><%= model.get("detail") %></td>' +
//     '<td class="way"><%= way %></td>' +
//     '<td class="debitDay"><%= model.formatDebitDay("YYYY/MM/DD") %></td>' +
//     '<td class="shop"><%= model.get("shop") %></td>',

//   initialize: function() {
//     this.render();
//   },
//   events: {
//     'click': 'onClick'
//   },
//   render: function() {
//     var html = _.template(this.template, {
//       model: this.model,
//       day: this.model.formatDate("ddd"),
//       section: App.sections.get(this.model.get('section')).get('name'),
//       subsection: App.subsections.get(this.model.get('subsection')).get('name'),
//       way: App.ways.get(this.model.get('way')).get('name'),
//       isIncome: this.model.get('isIncome')
//     });

//     this.$el.html(html);
//   },
//   onClick: function(){
//     App.mediator.trigger('dialog:open', this.model);
//   }
// });

// App.SectionActionView = Backbone.View.extend({
//   tagName: 'tr',
//   initialize: function(options) {
//     this.actions = options.actions;
//     this.account = options.account;
//     this.render();
//   },
//   events: {
//     'click': 'onClick'
//   },
//   render: function(options) {
//     var section = this.model;
//     var sectionName = section.get('name');
//     var sectionClassName = section.get('isIncome')? "incomeAmount": "expendAmount";
//     var subsectionList = {};
//     var subsections = App.subsections.select(function(model) {
//       return model.get('parent') === section.id;
//     });
//     _.each(subsections, function(model) {
//       subsectionList[model.id] = 0;
//     });

//     var sum = 0;
//     _.each(this.actions, function(model){
//       if(model.get('section') === section.id) {
//         sum += Number(model.get('amount'));
//         subsectionList[model.get('subsection')] += Number(model.get('amount'));
//       }
//     });
//     //console.log(this.account);
//     var budgetAmount = this.account.get('budgetAmounts')[section.id];
//     this.defference = section.get('isIncome')? sum-budgetAmount: budgetAmount-sum;

//     var actionView = $(
//       '<td class="' + sectionClassName + '">' + section.get('name') + '</td>' +
//       '<td><strong>' + App.formatAmount(sum) + '</strong></td>' +
//       '<td>' + App.formatAmount(budgetAmount) + '</td>' +
//       '<td>' + App.formatAmount(this.defference) + '</td>');

//     var subsectionListView = $('<ul hidden>');
//     _.each(subsections, function(model){
//       var li =
//         '<li>' + model.get('name') + ':' + App.formatAmount(subsectionList[model.id]) + '</li>';
//       subsectionListView.append(li);
//     });
//     this.subsectionListView = subsectionListView;
//     actionView.filter('td:eq(1)').append(this.subsectionListView);
//     this.$el.append(actionView);
//   },
//   onClick: function(e){
//     e.stopPropagation();
//     console.log('m');
//     this.subsectionListView.toggle();
//   }
// });

// ----------------------------------------------------------------------------------------

// App.CalendarControlView = Backbone.View.extend({
//   events: {
//     'click .calendar-incomeBtn': 'onClickIncome',
//     'click .calendar-expendBtn': 'onClickExpend',
//     'click .calendar-prevBtn': 'onClickPrev',
//     'click .calendar-nextBtn': 'onClickNext',
//     'click .calendar-todayBtn': 'onClickToday',
//     'click .calendar-averageBtn': 'onClickAverage',
//     'click .calendar-sectionBtn': 'onClickSection',
//     'click .calendar-subsectionBtn': 'onClickSubsection',
//     'click .calendar-accountBtn': 'onClickAccount',
//     'click .calendar-wayBtn': 'onClickWay'
//   },
//   initialize: function() {
//     $(window).on('keyup', {that: this}, this.onKeyup);
//   },
//   onClickIncome: function() {
//     var model = new this.collection.model();
//     model.set('isIncome', 1);
//     App.mediator.trigger('dialog:open', model);
//   },
//   onClickExpend: function() {
//     var model = new this.collection.model();
//     App.mediator.trigger('dialog:open', model);
//   },
//   onClickPrev: function() {
//     App.mediator.trigger('calendar:prev');
//   },
//   onClickNext: function() {
//     App.mediator.trigger('calendar:next');
//   },
//   onClickToday: function() {
//     App.mediator.trigger('calendar:today');
//   },
//   onClickAverage: function() {
//     App.mediator.trigger('calendar:average',
//       this.$el.find('.calendar-average-first-year').val(),
//       this.$el.find('.calendar-average-first-month').val(),
//       this.$el.find('.calendar-average-finish-year').val(),
//       this.$el.find('.calendar-average-finish-month').val()
//     );
//   },
//   onKeyup: function(e) {
//     if(e.keyCode == 112){
//       e.data.that.onClickIncome();
//     } else if(e.keyCode == 113){
//       e.data.that.onClickExpend();
//     }
//   },
//   onClickSection: function() {
//     App.mediator.trigger('sectionDialog:open');
//   },
//   onClickSubsection: function() {
//     App.mediator.trigger('subsectionDialog:open');
//   },
//   onClickAccount: function() {
//     App.mediator.trigger('accountDialog:open');
//   },
//   onClickWay: function() {
//     App.mediator.trigger('wayDialog:open');
//   }
// });

// App.AccountControlView = Backbone.View.extend({
//   events: {
//     'click button': 'onClickBtn',
//   },
//   initialize: function() {
//     this.listenTo(this.collection, 'change remove', this.close);
//     this.listenTo(this.collection, 'invalid', this.onError);
//     this.listenTo(App.mediator, 'dialog:open', this.open);
//     this.render();
//   },
//   render: function() {
//     var buttonTags = '';
//     this.collection.each(function(model) {
//       buttonTags += '<button class="" value="' + model.id + '">' + model.get('name') +'</button>';
//     });
//     buttonTags += '<button class="" value="all">すべて</button>';
//     this.$el.html(buttonTags);
//   },
//   onClickBtn: function(e) {
//     this.changeAccount(e.target.value);
//   },
//   changeAccount: function(id) {
//     var account = this.collection.at(0)? this.collection.at(0).id: null;
//     this.account = id || account ;
//     var $buttons = this.$('button').removeClass('active');
//     $buttons.filter('[value="' + this.account + '"]').addClass('active');
//     this.account = (this.account === 'all')? null: this.account;
//     App.mediator.trigger('calendar:changeAccount', this.account);
//   }
// });

// ----------------------------------------------------------------------------------------

App.FormDialogView = Backbone.View.extend({
  events: {
    // 'click': 'onClickDialog',
    'submit': 'onSubmit',
    'click .dialog-close': 'close',
    'click .dialog-removeBtn': 'onRemove',
    'click .dialog-copyBtn': 'onCopy',
    'change select[name="section"]': 'onChangeSection',
    'change select[name="way"]': 'onChangeWay',
    'focus input[name="amount"]': 'onFocusAmount',
    'blur input[name="amount"]': 'onBlurAmount'
  },
  initialize: function(options) {
    $(window).on('keyup', {that: this}, this.onKeyup);
    this.listenTo(this.collection, 'remove', this.close);
    this.listenTo(this.collection, 'add', this.addModel);
    this.listenTo(this.collection, 'invalid', this.onError);
    this.listenTo(App.mediator, 'dialog:open', this.open);
    this.subsectionSelectTagView = new App.FormSelectTagView({
      el: options.el + ' select[name="subsection"]',
      collection: App.subsections
    });
    this.model = new this.collection.model();
    var account = $('#account').val();
    if(account) this.model.set('account', account);
    this.render();
  },
  render: function() {

    this.$('.title').text(this.model.get('isIncome')? '収入の入力': '支出の入力');
    this.$('input[name="amount"]').val(this.model.get('amount'));
    this.$('input[name="date"]').val(this.model.formatDate('YYYY-MM-DD'));
    this.$('input[name="detail"]').val(this.model.get('detail'));
    this.$('input[name="isIncome"]').val(this.model.get('isIncome'));
    this.$('input[name="debitDay"]').val(this.model.formatDebitDay('YYYY-MM-DD'));
    this.$('input[name="shop"]').val(this.model.get('shop'));

    this.$('select[name="section"]').val(this.model.get('section'));
    this.subsectionSelectTagView.changeParent(this.model.get('section'));
    this.$('select[name="subsection"]').val(this.model.get('subsection'));
    this.$('select[name="account"]').val(this.model.get('account'));
    this.$('select[name="way"]').val(this.model.get('way'));

    if (this.model.isNew()) {
      this.$('.dialog-removeBtn').hide();
      this.$('.dialog-copyBtn').hide();
    } else {
      this.$('.dialog-removeBtn').show();
      this.$('.dialog-copyBtn').show();
    }
    this.$el.show();
    this.$('.dialog-body').scrollTop(0);
  },
  open: function(model) {
    this.model = model;
    this.render();
  },
  close: function() {
    this.$el.hide();
  },
  addModel: function() {
    alert('登録しました。');
  },
  onSubmit: function(e) {
    console.log('kakunin');
    e.preventDefault();

    var amount = this.$('input[name="amount"]').val();
    var date = this.$('input[name="date"]').val();
    var section = this.$('select[name="section"]').val();
    var subsection = this.$('select[name="subsection"]').val();
    var detail = this.$('input[name="detail"]').val();
    var account = this.$('select[name="account"]').val();
    var way = this.$('select[name="way"]').val();
    var isIncome = this.$('input[name="isIncome"]').val();
    var debitDay = this.$('input[name="debitDay"]').val();
    var shop = this.$('input[name="shop"]').val();


    var params = {
      'amount': amount,
      'date': moment(date),
      'section': section,
      'subsection': subsection,
      'detail': detail,
      'account': account,
      'way': way,
      'isIncome': Number(isIncome),
      'debitDay': debitDay? moment(debitDay): null,
      'shop': shop
    };

    if (this.model.isNew()) {
      this.collection.create(params, { validate: true });
    } else {
      this.model.save(params, { validate: true });
      this.close();
    }

    App.mediator.trigger('shop:createShopName', shop);
  },
  onRemove: function(e) {
    e.preventDefault();

    if (window.confirm('削除しますか？')) {
      this.model.destroy();
    }
  },
  onCopy: function(e) {
    e.preventDefault();

    var amount = this.$('input[name="amount"]').val();
    var date = this.$('input[name="date"]').val();
    var section = this.$('select[name="section"]').val();
    var subsection = this.$('select[name="subsection"]').val();
    var detail = this.$('input[name="detail"]').val();
    var account = this.$('select[name="account"]').val();
    var way = this.$('select[name="way"]').val();
    var isIncome = this.$('input[name="isIncome"]').val();
    var debitDay = this.$('input[name="debitDay"]').val();
    var shop = this.$('input[name="shop"]').val();

    var params = {
      'amount': amount,
      'date': moment(date),
      'section': section,
      'subsection': subsection,
      'detail': detail,
      'account': account,
      'way': way,
      'isIncome': Number(isIncome),
      'debitDay': debitDay? moment(debitDay): null,
      'shop': shop
    };

    this.model = new this.collection.model(params);
    this.render();
  },
  onKeyup: function(e) {
    if(e.keyCode == 27){
      e.data.that.close();
    }
  },
  onError: function(model, message) {
    alert(message);
  },
  onChangeSection: function() {
    this.subsectionSelectTagView.changeParent(this.$('select[name="section"]').val());
  },
  onChangeWay: function() {
    var way = this.$('select[name="way"]').val();
    var debitDayNum = App.ways.get(way).get('debitDayNum');
    var debitDay = moment(this.$('input[name="date"]').val()).date(debitDayNum).add(1, 'month');

    this.$('input[name="debitDay"]').val(debitDay.format('YYYY-MM-DD'));
  },
  onFocusAmount: function(){
    App.mediator.trigger('calculator:open');
  },
  onBlurAmount: function(){
    //App.mediator.trigger('calculator:close');
  },
  onClickDialog: function(e){
    if(this.el === e.target) this.close();
  }
});

// ----------------------------------------------------------------------------------------

App.SectionDialogView = Backbone.View.extend({
  events: {
    'submit form': 'onSubmit',
    'click .dialog-close': 'close',
    'click .dialog-removeBtn': 'onRemove',
    'click .dialog-newBtn': 'onCreate',
    'change [name="section"]': 'onChange'
  },
  initialize: function(options) {
    this.model = null;
    $(window).on('keyup', {that: this}, this.onKeyup);
    this.listenTo(this.collection, 'invalid', this.onError);
    this.listenTo(App.mediator, 'sectionDialog:open', this.open);
    this.subsectionSelectTagView = new App.FormSelectTagView({
      el: options.el + ' select[name="subsection"]',
      collection: App.subsections
    });
  },
  render: function() {
    var $subsectionTag = this.$('select[name="subsection"]').val('0');
    if(this.model){
      var section = this.model;
      this.$('input[name="name"]').val(this.model.get('name'));
      this.$('select[name="isIncome"]').val(this.model.get('isIncome'));
      this.collection.child.each(function(model){
        if(model.get('parent') === section.id)
        $subsectionTag.find('[value="' + model.id + '"]').prop('selected', true);
      });
    }
  },
  open: function() {
    this.render();
    this.$el.show();
  },
  close: function() {
    this.$el.hide();
  },
  onChange: function(e) {
    var section = this.$('select[name="section"]').val();
    this.model = this.collection.get(section);
    this.render();
  },
  getParams: function() {
    var name = this.$('input[name="name"]').val();
    var isIncome = this.$('select[name="isIncome"]').val();

    return {
      'name': name,
      'isIncome': Number(isIncome)
    };
  },
  saveSubsections: function() {
    var subsections = this.collection.child;
    var section = this.model;
    var $subsections = this.$('select[name="subsection"] :selected');

    $subsections.each(function(){
      var thisId = $(this).val();
      subsections.get(thisId).save({'parent': section.id});
    });
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.model.save(this.getParams(), { validate: true });
    this.saveSubsections();
    this.close();
  },
  onCreate: function(e) {
    e.preventDefault();
    this.model = this.collection.create(this.getParams(), { validate: true });
    this.saveSubsections();
    this.close();
  },
  onRemove: function(e) {
    e.preventDefault();

    if (window.confirm('削除しますか？')) {
      this.model.destroy();
    }
  },
  onKeyup: function(e) {
    if(e.keyCode == 27){
      e.data.that.close();
    }
  },
  onError: function(model, message) {
    alert(message);
  }
});

// ----------------------------------------------------------------------------------------

App.SubsectionDialogView = Backbone.View.extend({
  events: {
    'submit form': 'onSubmit',
    'click .dialog-close': 'close',
    'click .dialog-removeBtn': 'onRemove',
    'click .dialog-newBtn': 'onCreate',
    'change select[name="section"]': 'onChangeSection',
    'change [name="subsection"]': 'onChange'
  },
  initialize: function(options) {
    this.model = null;
    $(window).on('keyup', {that: this}, this.onKeyup);
    this.listenTo(this.collection, 'invalid', this.onError);
    this.listenTo(App.mediator, 'subsectionDialog:open', this.open);
    this.subsectionSelectTagView = new App.FormSelectTagView({
      el: options.el + ' select[name="subsection"]',
      collection: App.subsections
    });
  },
  render: function() {
    if(this.model) {
      this.$('input[name="name"]').val(this.model.get('name'));
    }else{
      this.$('input[name="name"]').val('');
    }
  },
  open: function() {
    this.render();
    this.$el.show();
  },
  close: function() {
    this.$el.hide();
  },
  onChange: function(e) {
    var subsection = this.$('select[name="subsection"]').val();
    this.model = this.collection.get(subsection);
    this.render();
  },
  onChangeSection: function(e) {
    this.subsectionSelectTagView.changeParent(this.$('select[name="section"]').val());
    this.model = null;
    this.render();
  },
  getParams: function() {
    var name = this.$('input[name="name"]').val();
    var section = this.$('select[name="section"]').val();

    return {
      'name': name,
      'parent': section
    };
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.model.save(this.getParams(), { validate: true });
    this.close();
  },
  onCreate: function(e) {
    e.preventDefault();
    this.collection.create(this.getParams(), { validate: true });
    this.close();
  },
  onRemove: function(e) {
    e.preventDefault();

    if (window.confirm('削除しますか？')) {
      this.model.destroy();
    }
  },
  onKeyup: function(e) {
    if(e.keyCode == 27){
      e.data.that.close();
    }
  },
  onError: function(model, message) {
    alert(message);
  }
});

App.AccountDialogView = Backbone.View.extend({
  events: {
    'submit form': 'onSubmit',
    'click .dialog-close': 'close',
    'click .dialog-removeBtn': 'onRemove',
    'click .dialog-newBtn': 'onCreate',
    'change select[name="account"]': 'onChange'
  },
  budgetTemplate:
    '<h4><%= section.get("name") %></h4>' +
    '<p><input type="number" name="<%= section.id %>"></p>',
  initialize: function(options) {
    this.model = null;
    $(window).on('keyup', {that: this}, this.onKeyup);
    this.listenTo(this.collection, 'invalid', this.onError);
    this.listenTo(App.mediator, 'accountDialog:open', this.open);
  },
  render: function() {
    var $budgetAmounts = this.$('.budgetAmounts');
    var html = '';
    var template = this.budgetTemplate;
    App.sections.each(function(model) {
      html += _.template(template, {
        section: model
      });
    });
    $budgetAmounts.html(html);

    if(this.model) {
      var budgetAmounts = this.model.get('budgetAmounts');
      this.$('input[name="name"]').val(this.model.get('name'));
      if(budgetAmounts) {
        for(var i in budgetAmounts) {
          this.$('input[name="' + i + '"]').val(budgetAmounts[i]);
        }
      }
    }else{
      this.$('input[name="name"]').val('');
      $budgetAmounts.find('input').val(0);
    }
  },
  open: function() {
    this.render();
    this.$el.show();
  },
  close: function() {
    this.$el.hide();
  },
  onChange: function(e) {
    var account = this.$('select[name="account"]').val();
    this.model = this.collection.get(account);
    this.render();
  },
  getParams: function() {
    var name = this.$('input[name="name"]').val();
    var budgetAmounts = {};
    this.$('.budgetAmounts').find('input').each(function() {
      budgetAmounts[this.name] = Number(this.value);
    });

    return {
      'name': name,
      'budgetAmounts': budgetAmounts
    };
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.model.save(this.getParams(), { validate: true });
    this.close();
  },
  onCreate: function(e) {
    e.preventDefault();
    this.collection.create(this.getParams(), { validate: true });
    this.close();
  },
  onRemove: function(e) {
    e.preventDefault();

    if (window.confirm('削除しますか？')) {
      this.model.destroy();
    }
  },
  onKeyup: function(e) {
    if(e.keyCode == 27){
      e.data.that.close();
    }
  },
  onError: function(model, message) {
    alert(message);
  }
});

App.WayDialogView = Backbone.View.extend({
  events: {
    'submit form': 'onSubmit',
    'click .dialog-close': 'close',
    'click .dialog-removeBtn': 'onRemove',
    'click .dialog-newBtn': 'onCreate',
    'change select[name="way"]': 'onChange'
  },
  initialize: function(options) {
    this.model = null;
    $(window).on('keyup', {that: this}, this.onKeyup);
    this.listenTo(this.collection, 'invalid', this.onError);
    this.listenTo(App.mediator, 'wayDialog:open', this.open);
  },
  render: function() {
    if(this.model) {
      this.$('input[name="name"]').val(this.model.get('name'));
      this.$('input[name="debitDayNum"]').val(this.model.get('debitDayNum'));
    }else{
      this.$('input[name="name"]').val('');
      this.$('input[name="debitDayNum"]').val('');
    }
  },
  open: function() {
    this.render();
    this.$el.show();
  },
  close: function() {
    this.$el.hide();
  },
  onChange: function(e) {
    var way = this.$('select[name="way"]').val();
    this.model = this.collection.get(way);
    this.render();
  },
  getParams: function() {
    var name = this.$('input[name="name"]').val();
    var debitDayNum = this.$('input[name="debitDayNum"]').val();

    return {
      'name': name,
      'debitDayNum': debitDayNum
    };
  },
  onSubmit: function(e) {
    e.preventDefault();
    this.model.save(this.getParams(), { validate: true });
    this.close();
  },
  onCreate: function(e) {
    e.preventDefault();
    this.collection.create(this.getParams(), { validate: true });
    this.close();
  },
  onRemove: function(e) {
    e.preventDefault();

    if (window.confirm('削除しますか？')) {
      this.model.destroy();
    }
  },
  onKeyup: function(e) {
    if(e.keyCode == 27){
      e.data.that.close();
    }
  },
  onError: function(model, message) {
    alert(message);
  }
});

App.FormSelectTagView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'create change remove', this.render);
  },
  render: function() {
    var value = this.$el.val();
    var optionTags = '';
    var collection = this.collection.chain();
    if(this.parent) {
      var parent = this.parent;
      collection = collection.select(function(model){
        return model.get('parent') === parent;
      });
    }
    collection.each(function(model) {
      optionTags += '<option value="' + model.id + '">' + model.get('name') +'</option>';
    }).value();
    this.$el.html(optionTags);
    this.$el.val(value);

  },
  changeParent: function(parent) {
    this.parent = parent;
    this.render();
  }
});


App.ShopInputView = Backbone.View.extend({
  events: {
    'focus': 'onFocus',
    'blur': 'onBlur'
  },
  initialize: function() {
    this.listenTo(App.mediator, 'shop:inputName', this.inputName);
  },
  onFocus: function() {
    App.mediator.trigger('shop:open');
  },
  onBlur: function() {
    App.mediator.trigger('shop:close');
  },
  inputName: function(name) {
    this.$el.val(name);
  }

});

App.ShopButtonView = Backbone.View.extend({
  initialize: function() {
    this.render();
    this.listenTo(this.collection, 'create change remove', this.render);
    this.listenTo(App.mediator, 'shop:createShopName', this.createShopName);
    this.listenTo(App.mediator, 'shop:open', this.open);
    this.listenTo(App.mediator, 'shop:close', this.close);
  },
  render: function() {
    var buttonTags = '';
    this.collection.each(function(model) {
      buttonTags += '<button value="' + model.get('name') + '">' + model.get('name') + '</button>';
    });
    this.$el.html(buttonTags);
    this.$('button').on('mousedown', function(e) {
      App.mediator.trigger('shop:inputName', e.target.value);
    });
  },
  createShopName: function(name) {
    this.collection.createOnlyNames([name]);
  },
  open: function() {
    this.$el.show();
  },
  close: function() {
    this.$el.hide();
  }
});

App.Calculator = Backbone.View.extend({
  events: {
    'click .num': 'onClickNum',
    'click .op': 'onClickOp',
    'click .clear': 'onClickClear',
    'click .result': 'onClickResult'
  },
  initialize: function() {
    //値の初期化
    this.op = null;
    this.mem = null;
    this.$input = $('#input-dialog [name="amount"]');//今度書き直す

    //表示・非表示イベントのキャッチ
    this.listenTo(App.mediator, 'calculator:open', this.open);
    this.listenTo(App.mediator, 'calculator:close', this.close);
  },
  onClickNum: function(e) {
    var num = e.target.value; //押した数字
    var inputNum = this.$input.val(); //ディスプレイの数字
    if( this.mem === null && this.op !== null ) { //保存してる数字がなくて、かつopを押している
      if( this.op === 'result' ) { //そのopが'='なら
        this.op = null; //opをクリアする。
      } else { //'='以外のopなら
        this.mem = Number(inputNum); //ディスプレイの数字を保存
      }
      this.$input.val(num); //そして押した数字でディスプレイを差し替え
    } else {
      this.$input.val(Number(String(inputNum)+num));//ディスプレイの後ろにプラス
    }
  },
  onClickOp: function(e) {
    this.calculation();
    this.op = e.target.value;
    $(e.target).addClass('selected');
  },
  onClickClear: function() {
    if( this.mem === null) {
      this.allClear();
    } else {
      this.$input.val(this.mem);
      this.mem = null;
    }
  },
  allClear: function() {
      this.$input.val(0);
      this.mem = null;
      this.op = null;
      $('.op').removeClass('selected');
  },
  onClickResult: function() {
    this.calculation();
    this.op = 'result';
  },
  calculation: function() {
    var inputNum = Number(this.$input.val());
    $('.op').removeClass('selected');
    if( this.mem　=== null || !this.op ) {
      this.$input.val( inputNum );
      return true;
    }
    switch (this.op) {
      case 'add':
        this.$input.val( Number(this.mem) + inputNum );
        break;
      case 'subtract':
        this.$input.val( Number(this.mem) - inputNum );
        break;
      case 'multiple':
        this.$input.val( Number(this.mem) * inputNum );
        break;
      case 'divid':
        this.$input.val( Number(this.mem) / inputNum );
        break;
    }
    this.mem = null;
  },
  open: function() {
    console.log(this.$el);
    this.$el.insertAfter(this.$input).show();
  },
  close: function() {
    this.$el.hide();
  }
});