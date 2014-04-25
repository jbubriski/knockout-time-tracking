var TimeEntry = function(date, task, comment, time, status) {
  this.date = ko.observable(date);
  this.task = ko.observable(task);
  this.comment = ko.observable(comment);
  this.time = ko.observable(time);
  this.status = ko.observable(status);
};

var ViewModel = function() {
  var self = this;

  this.firstName = ko.observable();
  this.lastName = ko.observable();
  this.workDays = ko.observable(5);
  this.ptoDays = ko.observable(0);
  this.holidays = ko.observable(0);
  this.entries = ko.observableArray();

  this.addEntry = function() {
    this.entries.push(new TimeEntry('today', 'Whatever', '', 0.25, 'billable'));
  };

  this.removeEntry = function() {
    self.entries.remove(this);
  };

  this.hoursWorked = ko.computed(function() {
    var hours = 0;

    for (var i = 0; i < self.entries().length; i++) {
      hours += parseFloat(self.entries()[i].time());
    }

    return hours;
  });

  this.hoursBillable = ko.computed(function() {
    var hours = 0;

    for (var i = 0; i < self.entries().length; i++) {
      if (self.entries()[i].status() == 'billable') {
        hours += parseFloat(self.entries()[i].time());
      }
    }

    return hours;
  });

  this.tps = ko.computed(function() {
      // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
      return this.hoursBillable() / ((this.workDays() - this.ptoDays() - this.holidays()) * 8) * 8;
  }, this);

  this.fullName = ko.computed(function() {
      // Knockout tracks dependencies automatically. It knows that fullName depends on firstName and lastName, because these get called when evaluating fullName.
      return this.firstName() + " " + this.lastName();
  }, this);

  this.addEntry();
};

ko.applyBindings(new ViewModel()); // This makes Knockout get to work
