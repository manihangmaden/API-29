# Architecture
## MVC pattern
- Model
     - data mapping
     - data store
     -defination of the data
- View
    - Presentation
- Controller
    -9.8m/s2 => acc due to g => 9.8m/s2

## Server
- client-server Architecture

client --> server
Request generator ===> responder

## Client request
- url
- protocol      http    https
- domain.tld
- port number    80       443
- path            /path/path
- query          /path?querystring
- method         post, get, put, patch, delete (if we catagorize these operations there are four operations we can use that is CRUD(create, read, update, delete) operation)

## Ecommerce Project
-> Login
-> Add to Cart
-> Payment
-> Search
-> Product
-> Relate Product
-> Category

a. Authentication and Authorization
  - login
  - signup
  - activation
  - forget password
  - reset password
  - logout
  - dashboard
  - RBAC ( roll based access control)

b. Product
   - CRUD operation
   - product list
      - search
      -category
      - brand
   - add to cart
   - wishlist
   - order

c. Category
   - CRUD operation
   - category
   - category detail (Product list - category)

d. Brand
   - CRUD operation
   - brand list
   - brand detail (Product list - brand)

// adons

e. Payment Gateway
   - COD (cash on delivery)

f. Review and Rating

g. Offers and coupons

h. Logistic

## CRUD Operation
-> Methods
C = create =>post methods
R = read => get method
U = update => put/patch method
D = delete => delete method

## Auth and Authorization
=> Register
   -> Data entry => FORM (React view)
       -> Submit
           --> back end /API caller
=> Login
    -> login view (FORM login, react)
        -> Data entry(form action, react)
            -> API call( back end call)
                -> post method


## multer
 -> for only text data use ==> .none() 
 -> for single file upload use ==> .single("key")
 -> for multiple file upload use ==> .array("key")


 ## mongodb
      host => localhost, 127.0.0.1
      port => 27017,
      user => not required
      pass => not required
      mongo pass => &amgDB4YWa.yJ3%

mongosh "mongodb+srv://cluster0.vr2pcyu.mongodb.net/" --apiVersion 1 --username manihang
username => manihang
password => b0zVmQqUI5a2xAFw

MONGODB_URL=mongodb+srv://manihang:b0zVmQqUI5a2xAFw@cluster0.vr2pcyu.mongodb.net/


## mongosh commands
    a. Insert
      => <activeDB>.<collectionName/tableName>.insertOne(<valid json object>)
      => <activeDB>.<collectionName/tableName>.insertMany(<valid json array of objects>)
 
    b. Find/select
      => <activeDB>.<collectionName/tableName>.find(filter,project)
      filter => {key: value, key:value....}
                 => ~SELECT * FROM table WHERE key = value AND key = value

            => { $operation: [] or {} }
               => {$or: [{key1: value}, {key2: value}]} => ~ WHERE (key1 = value or key2 = value)

            => { $or: [], $or: []} => AND operation between two OR operation. it can also be written as => {$and: [ 
                                    {$or: []}, 
                                    {$or: []} 
                                 ] 
                           }          
               
            => {
                 key: {
                       $gt: value
                 }
              }

              $gt, $gte, $lt, $lte, $eq, $ne, $in, $nin

   project => {name: 0 or 1, email: 0 or 1 and so-on} => if you want name set value to 1 else set to 0. Same for email

   c.Update
      => <activeDB>.<collectionName/tableName>.updateOne({_id: value //selects id to be updated}, {$set: {key:value},{key:value}..soon //updates key:value of selected id with this key:value}, {upsert: 1 or nothing(without this argument)})
        
        eg:  db.users.updateOne({_id: ObjectId("928746383727868273")}, {$set: {email: "mani.hang1234@gmail.com}})  => updates email of selected id with this email

        => upsert use => if the filter _id is found it will normally update, if not found it will insert the key:value in database. It is optional if not used update will work normally

      => updateMany()


   d.Delete
      => db.users.deleteOne({_id: ObjectId("12443523")})
      => db.users.deleteMany({}) //if filter is null it will delete all data



## mongodb can be used in our project in two ways:
 -> Core development
 -> ORM/ODM implementation
      -> Based on database we use, the packages that gives structure to your data is ORM/ODM

      -> ORM: Object relational mapping. If we work with SQL than we say that as ORM.

      ->ODM: Object Document Mapping. If we work with NoSQL than we say that as ODM. mongodb is NoSQL
      

  ->ORM/ODM architect the Model part of the MVC pattern which is done by working based on pre-defined rules set.

   Rules:
      -> Collection/table naming convention:
         ->table name plural then Model name should be singular  
          for e.g 
           users => table/collection name
           User => User model

      -> {key: value}
          collection/table's keys are the properties of model
          for e.g
              if users collection has data: {name: "mani"} it is the property of User model
               
      -> Every object of a model class is a row/document of a collection/table