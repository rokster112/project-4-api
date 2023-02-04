## **Project 4 - Backend and Front end application**

For project 4, I had to build a back end and front end application. Back end was built using Python and Django, while the front end was built using React. I chose to do this project solo, and the deadline was in 4 days. Functionalities of the website are, creating, editing, viewing, and deleting games. Furthermore, registering and logging in is also available. In the back end it is also possible to add, edit, view, and delete reviews under a game. This will be implemented in the front end in the future.

[Link to the website](https://the-gaming-nerd-zone.up.railway.app/ "Link to the website")

### **Overview**
I had to create my own API in the back end and database using Django and Python. Then, while using that, create a website in the frontend using React. It is a review based website, where you can review games. The deadline was 4 days.

### **Technologies**

#### **Back end**
- Python
- Django

#### **Front end**
- React
- SASS
- Bootstrap

### **Day to Day progress**

Day 1

I made a brief plan using Excalidraw. It consisted of how I wanted my data to be structured, and what pages I want to have on the front end. The structure of the data was: Name of the game, Publisher, Developer, Year it was released, Image and genres. The pages were: Home, All games, Single game, Create a game, Login, Register, and Not found.

Then I created a games folder and started working on `models.py`. 
Here I created a class called `Game` and described what the structure will have to be like. Then I also created a relationship with `genres` and `jwt_auth.User`. For genres, I selected many to many fields, because I wanted to allow the user to select and attach more than one genre to the game. `Owner` field allowed me to attach the owner to the game, once it was created. At the very bottom I stringified the title and year which would be displayed as a title for each game.

![Image1](./readme_images/Image1.png)

Then I created a `serializers` folder and created a `common.py` file. In there I created a class called `GameSerializer`. I did this for all of the fields, because I wanted to convert the data into a readable and understandable data type which was used in the front end.

![Image2](./readme_images/Image2.png)

Then inside that folder, I created a `populated.py` file. This is the same as above, but for multiple items.

![Image3](./readme_images/Image3.png)

Here I created `urls.py` and added two urls, one is to display all of the games, the other is to display a single game according to the personal key they possess.

![Image4](./readme_images/Image4.png)

Then I created the `genres` folder, and inside the `models.py` I created the Genre class and added a name to the data structure, then stringified it to make it readable.

![Image5](./readme_images/Image5.png)

Here I created a `serializer` folder and inside of it, I created `common.py`. There I created a GenreSerializer class with all of the fields that would be serialised and converted.

![Image6](./readme_images/Image6.png)

Then, I created a `populated.py` file to serialise multiple items. Since more than one game can share the same genre, that’s why I added `many=True`.

![Image7](./readme_images/Image7.png)

Here, I created a `jwt_auth` folder, and inside of it, I created a `User` class inside the `models.py` file.

![Image8](./readme_images/Image8.png)

I moved on to create a `serializers` folder and inside of it, I created a `common.py` file. There I created the `UserSerializer` class. The first two lines inside of that class have `write_only=True`, because I didn’t want to show the password and confirm password. Then I used the `pop()` method to remove and then return the value. Then I made an error handler that if password and confirm password do not match, return `ValidationErr` and a string value. Then I simply validate the password and store the password value in the data, and then return data.

![Image9](./readme_images/Image9.png)

Here I created a `urls.py` file and in there, I specified the url points for login and register.

![Image10](./readme_images/Image10.png)

Day 2

I moved on to work on the `views.py` file.
Firstly, I created a RegisterView class, and inside of it, I created a post request. In the try block, I am checking whether `create_user` is valid, if it is then, move on to the next line and save the user. Then, return `Response`. In the Except block I am returning errors.

![Image11](./readme_images/Image11.png)

Here, I created a LoginView class and inside of it, I created a post request. First, I am requesting username and password. Then, I'm simply checking whether the user with the username and password exists, if not raise an error. Then, I’m storing the `datetime.now` which is getting the current time and `timedelta(days=7)` which is expiry and storing it in the `dt` variable. Then I am encoding the token, `sub` will be the ID of the user, `exp` will be the `dt` turned into a string and then turned into a number. The number will be in seconds. The last part is `HS256` and that is a signature of the token, the value of that is the `SECRET_KEY` inside the settings.
Lastly, I am returning a response with a welcome message and a token.

![Image12](./readme_images/Image12.png)

Here I created an `authentication.py` file. This file will authenticate the token. Line 11 is requesting the token, while line 15 checks whether it starts with the `Bearer`, if it doesn’t, it will throw up an error. Line 19 replaces the `Bearer` with an empty string, which will be filled with the token value. Then in the try block, I am decoding the token and storing it in the `payload`, then I am checking whether the `sub` part of the token matches the user ID. If it does, then authentication is finished. There are two errors that could be thrown up: Invalid token and user not found.
Finally I am returning the user and the token.

![Image13](./readme_images/Image13.png)

At this point I moved on to create a `reviews` folder, then created a `Review` class in `models.py`. Here I also had to create a relationship with `game` and `owner`, in order to attach the review to the game, and owner to the review. I created a `Meta` class so I could order the reviews in created_at order. Then I stringified it, so the title of the review would be displayed.

![Image14](./readme_images/Image14.png)

Then I created a `serializers` folder and then a `common.py` file. Here I serialized all of the fields from `Reviews`.

![Image15](./readme_images/Image15.png)

Then I created `populated.py` in the same folder and serialized `owner` by using `UserSerializer`.

![Image16](./readme_images/Image16.png)

Then, inside the `reviews` folder I created a `urls.py` file, and in there created two urls, one was for all reviews, and one was for individual reviews, by using a specific personal key of the review.

![Image17](./readme_images/Image17.png)

Now, going back to the `games` folder, I began working on the `views.py` file. First I created a `GameListView` class which is used to `post` games and `get` all games. On line 13, I used Authenticate or Read only, because I needed to use authentication for posting games, and read only for getting all games. Authentication was used for posting games, in order to prevent users from posting that have not logged in. Then I created a `get` request in order to get all games, while using a serializer to convert the data into a readable type of data. Then I created a `post` request while attaching `owner` as the user's ID. Then, I am checking whether the game that is being added is valid, if it is, then save the game. If it isn’t valid, return an Exception error.

![Image18](./readme_images/Image18.png)

Here, I created a `GameDetailView` class for delete, put and get one game request. First I created a `get_game` function which gets individual games by using a personal key. Reason being, for all of these requests, I have to get games individually, so to avoid dry code, I created this function. Then, I created a `get` request to get an individual game. Then, I created a `delete` request and added a condition that if the user who is trying to delete the game isn’t the owner, raise `PermissionDenied` error, otherwise delete the game. Same functionality for `put` request.

![Image19](./readme_images/Image19.png)

Here, I moved on to the `reviews` folder, and started working on the `views.py` file. I created a `ReviewListView` class, and inside of it, I created `get` all reviews, and `post` a review request. Functionality of these is the same as `GameListView`.

![Image20](./readme_images/Image20.png)

Lastly, I created all of the urls inside the `urls.py` file which is located in the `project` folder.

![Image21](./readme_images/Image21.png)

Day 3 

I finished the back end, so at this point, I moved on to the front end. I started off with `App.js`. Here, I defined all of the paths for the pages and imported all of the components. I used `useEffect` but I wrote this piece of code further into the project, rather than at the very start. I used `useEffect` to render the token if it exists in the local storage, so the user can remain logged in, even if they reload or close the page. If a token exists, it will be added to the header.

![Image22](./readme_images/Image22.png)

I created an auth.js file, this was used to authenticate a token. `setToken` is used to set the token in the local storage. `getToken` is used to get the token from the local storage. `getPayload` is used to get the token, and check if it exists, if it does, split the token. If token length is exactly 3, move on to the next line and return index number 1 of the token, which in terms of length is 2. `authUser` is used to get the current time in seconds and then compare it to the expiry date of the token, if expiry is greater than current time, it means the token is still valid.

![Image23](./readme_images/Image23.png)

Here I moved on to the `CreateGamePage` component and created errors, genres, and createGame `useState`. `Errors` were used to store errors, and `genres` were used to get all of the genres. `createGame` has all fields empty, so that it has a pre-set value. I used the ‘handleChange’ function, this allowed me to display the input of a user on the screen in the `createGame` fields. Afterwards I created the `handleSubmit` function, which is used to submit the information to the database. First I check whether the token exists in the local storage, if it doesn’t, it will return an error, otherwise the code will continue to run. Inside the `try` block post request is used to submit the information from `createGame` useState. Once it is submitted the user will be navigated to the games page. If information is not submitted, an error message will appear.

![Image24](./readme_images/Image24.png)

Still inside the `CreateGamePage` component I used `useEffect` and stored the genre data in `setGenres`. Then, I created a function called `handleMultiSubmit` which was used in JSX to have a drop down menu for genres section and be able to select multiple genres.

![Image25](./readme_images/Image25.png)

Here in JSX I used react-select to be able to select multiple genres. Firstly I had to map through the genres, and use genre id for id and value, while using the name for the label. I had to do it this way because in the database the only way to validate genre information when submitting is when using genre id, rather than the name, so in this instance the value is the id but the label is the name so the user can tell what genre they are selecting. 

![Image26](./readme_images/Image26.png)

Here I moved on to the `GamesPage` component. I used `useEffect` to get the data to get all of the games from the database and store it inside the `getGames useState`. 

![Image27](./readme_images/Image27.png)

Inside the JSX, I had to map through `getGames` and then deconstruct the objects, so I can display it on the page.

![Image28](./readme_images/Image28.png)

I moved on to the `Login` component, I used ‘useState’ where I stored data for login data and error data. Also, I used navigate which took the user to the games page on a successful login. I used the ‘handleChange’ function, this allowed me to display the input of a user on the screen. Also, once a user tried to submit and there was an error, it would be displayed in the error field, so this function allowed me to remove the error box once the user starts typing, because errors would be set to false. Here I am making an ‘onSubmit’ function. This will be a function used when information is submitted, e.g when logging in, in or registering.
In the try block we are sending a post request and setting the token and username in the local storage while also setting the token in the header. Then we navigate to the home page.
In the catch block we are catching errors, and storing error messages in ‘errors useState’ which then we will be able to display it for the user.

![Image29](./readme_images/Image29.png)

Day 4 

On the last day, I moved on to the `Register` component and created a register page. Functionality is the same as a Login component, but without setting a token to the local storage. I use `navigate` here as well, if the post request is successful, the user will be taken to the login page.

![Image30](./readme_images/Image30.png)

Here, I created `SingleGamePage`, and used `useParams` to get the id of a game. Then I used `useEffect` to make a `get` request in order to render the data on the page of a specific game. I stored that information in `singleGame useState`. Then, I created a delete function to delete the game if the user is the owner of the game, by using `delete` request.

![Image31](./readme_images/Image31.png)

Here I moved on to create an `UpdateGame` component and used `useParams` in order to navigate and edit the right game. Also, I had to use a `put` request, other than that, functionality is the same as `CreateGamePage`.

![Image32](./readme_images/Image32.png)

I was done with the front end functionality, so I started working on styling. First component I completed was Navbar. I used Bootstrap to do the styling. I have the logo on the left, name in the middle, and links on the right.

![Image33](./readme_images/Image33.png)

Then, I did the footer. I included my LinkedIn and GitHub links in the footer. The styling on the rest of the website was done by simply using flex-box.

![Image34](./readme_images/Image34.png)

This is the Home page. I included a background and an introduction to the website.

![Image35](./readme_images/Image35.png)

This is all the games page. Each game is inside a box, and the release year, name, and picture are displayed. I had to use flex-box for all games as well the contents inside the box.

![Image36](./readme_images/Image36.png)

This is a single game page. Name, picture, year, publisher, and developer is displayed. Also, there are two buttons to edit and delete the game.

![Image37](./readme_images/Image37.png)

This is to update a game page. It is a form and it has 5 different fields and genres selection.

![Image38](./readme_images/Image38.png)

This is the login page.

![Image39](./readme_images/Image39.png)

This is the registration page.

![Image40](./readme_images/Image40.png)

This is to create a game page.

![Image41](./readme_images/Image41.png)

### **Key Learnings**
- How to build the back end by using Python and Django.
- How to work under pressure and on a tight deadline.
- Further improving on flex-box.
- How to use React-Select

### **Challenges**
- Due to a tight schedule and long hours, I started making spelling mistakes which made me spend a lot of time trying to find the error.
- I was finding it difficult to display genres in the single game page, because it was a complex JSON object.

### **Wins**
- Building a CRUD app in 4 days time, while also having additional functionality in the back end for reviews.
- I thought the design of the pages looked great, so I was happy with that.
- Apart from the navbar, all pages were styled by using flex-box.

### **Bugs**
- Mobile support for the website is quite poor.

### **Future Improvements**
- Implement review functionality in the front end.
- Add a drop down filter, to filter games by genre.
- Add a search bar.
- Add ratings for the games and/or reviews.
- Add a profile page.
- Significantly improve mobile functionality.