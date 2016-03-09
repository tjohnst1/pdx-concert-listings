describe('event filter', function(){
  describe('the listings per page selector', function(){
    it("should update the listings per page", function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        element(by.cssContainingText('option', '50')).click();
        var eventNum = element.all(by.css('event-headline')).count();
        return expect(eventNum).toBe(50);
      });
    });
  });
  describe('the genres selector', function(){
    it("should only show listings of a particular music genre", function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        element(by.cssContainingText('option', 'experimental')).click();
        var firstEvent = element.all(by.css('event-headline')).get(0)
        firstEvent.click();
        return expect(element(by.css('.event-genres')).getInnerHtml()).toMatch('experimental');
      });
    });
  });
  describe('the venue selector', function(){
    it('should only show events that happen at a particular venue', function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        element(by.cssContainingText('option', 'Mississippi Studios')).click();
        var firstEventVenue = element.all(by.css('.event-headline-venue')).get(0).getInnerHtml()
        return expect(firstEventVenue).toBe('Mississippi Studios');
      });
    });
  });
  describe('the keyword input', function(){
    it('should filter events based on input band names', function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        element(by.model('eventFilterCtrl.query')).sendKeys('Ben Ottewell');
        var firstEventHeadline = element.all(by.css('.event-headline-artists')).get(0).getInnerHtml()
        return expect(firstEventHeadline).toBe('Ben Ottewell');
      });
    });
    it('should filter events based on input venue name', function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        element(by.model('eventFilterCtrl.query')).sendKeys('Doug Fir Lounge');
        var firstEventHeadline = element.all(by.css('.event-headline-venue')).get(0).getInnerHtml()
        return expect(firstEventHeadline).toBe('Doug Fir Lounge');
      });
    });
  });
  describe('the date selectors', function(){
    it("should update the listings based on input dates", function(){
      browser.get('/');
      browser.wait(function(){
        return element(by.css('event-headline')).isPresent();
      }, 10000).then(function(){
        element(by.model('eventFilterCtrl.startingDate')).sendKeys('03-10-2016');
        element(by.model('eventFilterCtrl.endingDate')).sendKeys('03-10-2016');
        var firstEventDate = element.all(by.css('event-headline-date')).first().innerHtml;
        var lastEventDate = element.all(by.css('event-headline-date')).last().innerHtml;
        return expect(firstEventDate).toEqual(lastEventDate);
      });
    });
  });
});
