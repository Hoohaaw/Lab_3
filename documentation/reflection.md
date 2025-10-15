## Chapter 2: Meaningful Names

## Chapter 3: Functions
Just to preface, the code snippet in the config/mongoose file is copied from a previous project. However I've re-written it with Chapter three from the book in mind. Which generally I've tried to do for the entire project but for the sake of the reflection I wanted to hightlight that file. What I tried to do with that code was to follow the directives, "Small" and "Do One Thing." The original code handled everything from the connection & disconnection to the mongoDB database, set mongoose options, signalevents and logging. Which according to the book is bad. So whilst following the books principle I broke the entire file down from one big do it all function into three smaller and more direct functions. Which in my opinion really does improve the readability of the code. *

One thing I do wonder about this way of writing code is, what if the code that im breaking down into smaller pieces are 200 - 300 lines long? The function chain that would be created would be immense. It would just be a long chain of functions calling eachother in a figuratively long line. And maybe thats good! I dont really know what I prefer in this moment. However I think there could be an argument for the loss of readability in the cases that this "function chain" becomes too long. 

## Chapter 4: Comments
I've tried to just minimize my comments in my codebase down to just JSDOC Comments and perhaps, if needed, a inline comment explaining a piece of hard to understand code. The book talks about Amplification aswell, That comments should amplify the importance of the code. This is a really good way to use inline comments in my opinion.


## Chapter 5: Formatting
During workshop one in the course we co-coded with another student. We shared repo and pushed/pulled to switch coder and switched screensharer. When I got to be the coder I immediatly installed Eslint and copied in an config. Formatting is important to me. It helps me alot with understanding the code. The code "looks" similiar if you follow set formatting rules. 

The book highlights the term conceptual Affinity. The description is that certain bits of code should be near eachother. like if statements. And i tottaly agree. At times when I have not had a formatter I still tried to put lines of code together that "should" be together. 

Formatting is also an incredible way to help with readability. A whiteline where it should be, where there should be code "touching" and so on. It also helps in a bigger project where multiple people will look at some code. Everyone knows the same rules so to speak. 


## Chapter 6: Objects and Data Structures
I have to admit that data structures as how they were explained during a seminar was confusing to me. I could not follow the concept between exposing the implementation and not. However the book gave an explaination that gave more clarity. The example was a fuel tank of a car, the measurement is how much actual fuel is in the car. However the way you show this information to the user should go through a layer of abstraction to make the data more digestible. Instead of showing how many gallons are left in the tank you should show the amount in percentages. A clearly better choice. And im guessing this concept is exactly what this course is trying to enforce. As with the L-2 assignment when we created our own libraries. My library has probably around 20 functions. However I just need the user to know about 1-2 of them. Abstraction is key!

And this thinking are great for both the user and the creator. Again, as our own developed libraries. I dont want my users to actually have the option to access all functions. I can assure that my library is being used in the way it should if a layer of abstraction is provided.

## Chapter 7: Error Handling
When creating the automatic test cases for the L-2 library assignment I stumbled upon a coding error that I made. I created most of my code to be returning true or false dependant on if a string contained what specific regex that function was testing. Which effectively made that my error handling was a false return statement. Which I now know is not enough off feedback from the code. Errors should be explaining what went wrong. In some way the return of the false statement did that, however there could be multiple reasons for that and the developer would never know what specifically caused it. The book states in the conclustion of chapter 7 that robust code shoud not see error handling as a seperate concern. Which I very clearly previously. My focus was on just making the code work not actually writing good code. Which is a difference. 

## Chapter 8: Boundries
## Chapter 9: Unit Tests
I like to write automatic tests. I like to see how my code fullfills the requirements put on i. And I like to have my ass covered with tests. However the book states that test code should be kept as clean as production code. And that test code requiers thought, design and care. Which I tend to agree too. However I might not agree to the extent that the book is stating. Reading the first few pages of chapter nine in the book the impression I get is that EVERYTHING is dependant on the tests and if your tests are not well thought out your project is kind off doomed to fail. And this might be my ignorance as a second year web development student but this is really not my experience. Again, I have not worked as a web developer. However I have worked as a UX designer for a media company for about two years. And with that role you get close to the developers and their ways of working. Actually a big part of my work was to make sure that the design team and developers had clear communication about the products to build. 

What I want to get to is that during that time I did not see a test being written, I did not hear about tests, and no one talk this serious way about it that the book does. 

My conclusion; Im excited to see which is right. As I stated in the beginning of this reflection for this chapter. I like to write tests and fullfill them. Therefore Im going to continue doing that In the way I see fit. And for what I know, that way might expand more into what the book suggests. 

## Chapter 10: Classes
I have a hard time with object oriented programming. I get the concept and how everything should fit together, but I cant escape feeling of being "locked" in some capacity. Therefore I prefer function based coding like with JS way more. However the way that the author of the book is describing the class structures and their Cohesion it sounds like the superior way. Especially when (again) the author screams about the length of functions and classes. I think I have been over complicating the OOP approach. I kind off see classes in Java like this huge beast that does an incredibly large amount of operations. However when reading the in the book it has become clearer to me that OOP contains the same principles as the functional coding. Just that they are seperated into classes. 

This whole explaination might seem redundant, which it might be honestly. But I truly have struggled with OOP and that way of thinking. There was a term coined not so long ago called "Vibe coding." Which if I understand it correctly is just coding without any structural limitation. And that is the way I do most of my coding. Just free flowing and going with it. Which leads me to clean it up at a later time. However coding for OOP is a bit trickier in that sense. You need to have a plan of how things are supposed to work together. 

I'll keep on working to excercise that way of thinking. And honestly this chapter is kind off easing my mind about this a little bit. 
## Chapter 11: Systems
