describe('index', function(){
  describe('event headline container', function(){
    it("should display events", function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        var eventNum = element.all(by.css('event-headline')).count();
        return expect(eventNum).toBeGreaterThan(0);
      });
    });
    it("should display no more than 20 events per page", function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        var eventNum = element.all(by.css('event-headline')).count();
        return expect(eventNum).toBeLessThan(21);
      });
    });
    it("should display the next page of events", function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        var firstPageEvent = element.all(by.css('event-headline')).get(0);
        element(by.cssContainingText('.pagination li a', '2')).click();
        var secondPageEvent = element.all(by.css('event-headline')).get(0);
        return expect(firstPageEvent).not.toBe(secondPageEvent);
      });
    })
  });
});
