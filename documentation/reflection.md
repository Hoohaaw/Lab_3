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


## Chapter 8: Boundries
## Chapter 9: Unit Tests
## Chapter 10: Classes
## Chapter 11: Systems
