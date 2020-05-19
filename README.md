# Project Decription

It is a small demo project to show how react hooks are working and how they can be implemented.
You can checkout the project [here](https://www.stellaloizou.eu/react-hooks-sample/)

The basic functionalities are:
- the user can store fruits and the amount of the fruits in database, 
- the user can remove the fruits from database
- the user can search and find the fruits that are stored in database

The hooks that the project is using are:
- useState()
- useEffect()
- useMemo()
- useReducer()
- useCallBack()
- useContext()

Also a custom hook is created which is responsible to handle the http requests and have the useEffect() to handle the response of the requests.

A good explanantion of how the hooks are implemented each time is described in the commits.

## To run the project

1. Clone the project 

2. In the project directory:
  - run npm install


3. Create the database
 I used [firebase](https://firebase.google.com/?gclid=EAIaIQobChMIpNfBiZqd6QIVlO7tCh3_xQDlEAAYASAAEgImxfD_BwE) to create a dummy database. You can do the same as it is really quick:
 
 Click on this [link](https://firebase.google.com/?gclid=EAIaIQobChMIpNfBiZqd6QIVlO7tCh3_xQDlEAAYASAAEgImxfD_BwE) and create a project. Then configure the database rules under the database tab by adding the following json:
 
 `{
  "rules": {
    ".read": true,
    ".write": true,
      "ingredients": {
	".indexOn" : ["title"]
	}
  }
}`

4. Conifigure **env.**
 
 Create a file .env to the root of the project directory and add this:
 
 `REACT_APP_FIREBASE_URL='your/firebase/url'`
 
 Get your firebase database url from your firebase project that you created, it is under the database tab.
 
5. In your project directory run `yarn start`

