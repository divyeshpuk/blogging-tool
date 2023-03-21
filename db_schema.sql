
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS blog (
    blog_title TEXT NOT NULL,
    blog_subtitle TEXT NOT NULL,
    blog_author TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS articles (
    article_id INTEGER PRIMARY KEY AUTOINCREMENT,
    article_title TEXT NOT NULL,
    article_subtitle TEXT NOT NULL,
    article_text TEXT NOT NULL,
    date_created datetime default current_timestamp,
    date_published datetime default current_timestamp,
    date_modified datetime default current_timestamp,
    article_likes NUMERIC
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
    comment_text TEXT NOT NULL,
    date_created datetime default current_timestamp,
    article_id  INTEGER, --the article that the comment belongs to
    FOREIGN KEY (article_id) REFERENCES articles(article_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS testUsers (
    test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testUserRecords (
    test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_record_value TEXT NOT NULL,
    test_user_id  INT, --the user that the record belongs to
    FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
);

--insert default data (if necessary here)

INSERT INTO blog ("blog_title", "blog_subtitle", "blog_author") VALUES ("Thoughts on life hacks", "Stuff that really matters", "Divyesh Patel");

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Jelly-o sesame snaps halvah croissant", "Cheesecake bear claw to oat cake cookie", "Donut tart marzipan muffin dessert lollipop sesame snaps. Chocolate bar toffee tart bonbon powder chupa chups. Lemon drops jelly biscuit caramels sesame snaps bear claw jelly-o cheesecake cake. Topping tiramisu cupcake candy canes gummi bears pastry.

Tootsie roll gingerbread cotton candy toffee macaroon caramels shortbread. Halvah cupcake carrot cake gummi bears jelly powder tiramisu cake. Ice cream sugar plum oat cake lollipop lollipop cotton candy.

Candy ice cream cake pudding powder marshmallow ice cream gummi bears shortbread. Chocolate cake topping chocolate bar donut cake biscuit bonbon. Tart brownie cookie jelly beans cake gummi bears gummies bear claw. Caramels halvah icing gummi bears jujubes candy canes candy.", datetime(), null, datetime(), 0);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Efficiently unleash cross-media information", "Quickly maximize timely deliverables", "Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.

Bring to the table win-win survival strategies to ensure proactive domination. At the end of the day, going forward, a new normal that has evolved from generation X is on the runway heading towards a streamlined cloud solution. User generated content in real-time will have multiple touchpoints for offshoring.

Capitalize on low hanging fruit to identify a ballpark value added activity to beta test. Override the digital divide with additional clickthroughs from DevOps. Nanotechnology immersion along the information highway will close the loop on focusing solely on the bottom line.", datetime(), null, datetime(), 0);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Noble ultimate pinnacle war destroyed intention", "Everything that can be invented has been invented.", "This was one of the tasks we set forth at the beginning of this campaign - to continue the long march of those who came before us, a march for a more just, more equal, more free, more caring and more prosperous India. Indians are ready to join with citizens and governments; community organizations, religious leaders, and businesses in all communities around the world to help our people pursue a better life.

I learned that my sins could be redeemed. It was stained by this nation's original sin of slavery, a question that divided the colonies and brought the convention to a stalemate until the founders chose to allow the slave trade to continue for at least twenty more years, and to leave any final resolution to future generations. I suppose the politically safe thing would be to move on from this episode and just hope that it fades into the woodwork.", datetime(), datetime(), datetime(), 15);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Do you see any Teletubbies in here?", "Cosmic ocean, courage of our questions.", "Dispassionate extraterrestrial observer take root and flourish are creatures of the cosmos at the edge of forever vanquish the impossible how far away. Radio telescope billions upon billions the only home we've ever known rich in heavy atoms hundreds of thousands tingling of the spine.

    The only home we've ever known a mote of dust suspended in a sunbeam something incredible is waiting to be known invent the universe a mote of dust suspended in a sunbeam vastness is bearable only through love and billions upon billions upon billions upon billions upon billions upon billions upon billions.", datetime(), datetime(), datetime(), 17);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Your bones don't break, mine do.", "The path of the righteous man is beset on the tyranny of evil men.", "There are some corners of the universe which have bred the most terrible things. Things which act against everything we believe in. They must be fought. The trouble with computers, of course, is that they're very sophisticated idiots. They do exactly what you tell them at amazing speed. Even if you order them to kill you. So if you do happen to change your mind, it's very difficult to stop them from obeying the original order. But not impossible. Would you like a jelly baby? Death is always more frightening when it strikes invisibly.

Butterfingers. Goodbye, Clara. Frightened people. Give me a Dalek any day. I don't like it. So these are my replacements. A dandy and a clown. Overconfidence, this, and a small screwdriver. I’m absolutely sorted. You need to get yourself a better dictionary. When you do, look up 'genocide'. You'll find a little picture of me there, and the caption'll read 'Over my dead body'. There was a war. A Time War. The Last Great Time War. My people fought a race called the Daleks, for the sake of all creation. And they lost. We lost. Everyone lost. They're all gone now. My family. My friends. Even that sky.", datetime(), datetime(), datetime(), 13);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("I'm gonna build me an airport, put my name on it.", "The flavour gracefully dances across your palate.", "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters.

Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.

Trysail Sail ho Corsair red ensign hulk smartly boom jib rum gangway. Case shot Shiver me timbers gangplank crack Jennys tea cup ballast Blimey lee snow crow's nest rutters. Fluke jib scourge of the seven seas boatswain schooner gaff booty Jack Tar transom spirits.", datetime(), datetime(), datetime(), 23);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Oh my God! I didn't know Smarties made a cereal.", "They don't. It's just Smarties in a bowl with milk.", "And that man is John Kerry. The fundamentals we use to measure economic strength are whether we are living up to that fundamental promise that has made this country great - a promise that is the only reason I am standing here tonight.

They held vigils across this country when four little girls were killed in the 16th Street Baptist Church. That history helps explain the wealth and income gap between black and white, and the concentrated pockets of poverty that persists in so many of today's urban and rural communities.

The profound mistake of Reverend Wright's sermons is not that he spoke about racism in our society. Because I've lived it.

This time we want to talk about the fact that the real problem is not that someone who doesn't look like you might take your job; it's that the corporation you work for will ship it overseas for nothing more than a profit. India, we cannot turn back. It is a sign of neither courage nor power to shoot rockets at sleeping children, or to blow up old women on a bus.", datetime(), datetime(), datetime(), 34);

INSERT INTO articles ("article_title", "article_subtitle", "article_text", "date_created", "date_published", "date_modified", "article_likes") VALUES("Clearly, someone who believes he is above the law.", "Well, you've been warned, dude. Bring it on.", "Bitchin' You are such a nerd. No wonder you only hang out with boys. You’re going to take out the demigorgon with a slingshot? If we’re both going crazy, then we’ll go crazy together, right? You're an idiot, Steve Harrington. You're beautiful, Nancy Wheeler.

If we’re both going crazy, then we’ll go crazy together, right? Do you know anything about sensory deprivation tanks? Specifically how to build one? You’re right. You are a freak. Who would you rather be friends with: Bowie or Kenny Rogers? It’s finger-lickin’ good.

She shut one door! With her mind! You’re pretty cute, you know that? Hey kiddo, would you like a balloon? You're an idiot, Steve Harrington. You're beautiful, Nancy Wheeler. You’re right. You are a freak…. Who would you rather be friends with: Bowie or Kenny Rogers?", datetime(), datetime(), datetime(), 28);

INSERT INTO comments ("comment_text", "article_id", "date_created") VALUES ("Bugger bag egg's old boy willy jolly scrote munta skive pillock, bloody shambles nose rag blummin' scrote narky ever so, lass fork out flabbergasted sod's law penny-dreadful ever so lovely.", 4, datetime());
INSERT INTO comments ("comment_text", "article_id", "date_created") VALUES ("European minnow priapumfish mosshead warbonnet shrimpfish bigscale. Cutlassfish porbeagle shark ricefish walking catfish glassfish Black swallower.", 5, datetime());
INSERT INTO comments ("comment_text", "article_id", "date_created") VALUES ("Hand-crafted exclusive finest tote bag Ettinger, emerging joy Gaggenau. Melbourne liveable conversation, sophisticated Helsinki smart extraordinary delightful soft power.", 6, datetime());

COMMIT;

