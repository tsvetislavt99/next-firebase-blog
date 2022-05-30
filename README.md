# Nextjs-Blog

A simple blog app using:
 - Next.js (client side)
 - Firebase (db)

## Public Part (Accessible without authentication) - access control

 - Home page
 - Blog post page
 - User profiles

## Private Part (Available for Registered Users) - access control

 - Home page
 - Blog post page (with reaction button)
 - User profiles
 - My profile
 - My posts
 - Create post page

## Technologies

- Next.js, TailwindCSS, Firebase

#### Collections

- Users

```javascript
{
   displayName: string,
   photoURL: string,
   uid: string //(unique firebase id),
   username: string
}
```

- Usernames

```javascript
{
   `${username}`: {
       uid: string //(unique firebase id of the user with this username)
   }
}
```

- Post
 Nested collection `/users/uid/posts/`
```javascript
{
    title: string,
    content: string, //(In markdown format)
    createdAt: Date,
    updatedAt: Date,
    published: boolean, //(If true, the post is visible for everyone, else it's private only for the created)
    slug: string, //Used as route name for the post: ex. my-awesome-post
    uid: string, //(unique firebase id of the user with this username)
    heartCount: Number, //Number of likes on the post

}
```

## Additional functionality

- Dynamic Form Validation
- Demonstrates use of programming concepts - React Hooks, Context API
- Fully responsive UI
- Authentication with google account
- Cool notificaiton using [react toastify](https://www.npmjs.com/package/react-toastify)

## Todos

- Add login/signup with email and password
