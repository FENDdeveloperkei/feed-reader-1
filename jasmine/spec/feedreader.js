/* feedreader.js
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.*/

/* Tests are within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready. This is 
 * our first test suite [TS:] - a test suite just contains
 * a related set of tests.*/

$(function() {
    
    // TS: RSS Feeds
    describe('RSS Feeds', () => {
        
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        
        
        it('url defined', () => {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
         });
        
        it('name defined', () => {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
         });
    });
// TS: Menu
    describe('The Menu', () => {

         it('is hidden', () => {
            const body = document.querySelector('body');
            expect(body.classList.contains('menu-hidden')).toBe(true);

         });

        it('toggles on and off', () => {
            const body = document.querySelector('body');
            const menu = document.querySelector('.menu-icon-link');
            
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(false);
            
            menu.click();
            expect(body.classList.contains('menu-hidden')).toBe(true);

         });

    });
       

    // TS: Initial Entries
    describe('Initial Entries', () => {

         beforeEach( (done) => {
            loadFeed(0, done)
         });

         it('completes work', () => {
            expect($('.feed .entry').length > 0).toBe(true);
         });
    });
    // TS: New Feed Selection
    describe('New Feed Selection', () => {
            const feed = document.querySelector('.feed');
            const firstFeed = [];

        beforeEach( (done) => {
            // First feed
            loadFeed(0, function() {
                // Values stored of the first feed
                Array.from(feed.children).forEach( (entry) => {
                    firstFeed.push(entry.innerText);
                });
                // Second feed
                loadFeed(1, done);
             });

        });

         it('content changes', () => {
            Array.from(feed.children).forEach( (entry, index) => {
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
         });  
    });

}());
