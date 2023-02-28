import { addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact, 
    deleteContact } from '../controllers/contactController';

import { loginRequired } from '../controllers/userController';

const routes = (app) => {
    app.route('/contacts')
    // retrieve contacts
    .get((req,res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`);
        console.log(`Request type: ${req.method}`);
        next();  
    }, /*
        version-01:
        (req, res, next) => { 
        res.send('GET request sucessful!');
        */
       /*
        version-02:
        getContacts
       */
      /*
        version-03:
      */
        loginRequired, getContacts
    )
    // create contact
    .post(/*
           version-01:
           (req, res) =>
            res.send('POST request sucessful!') 
           */
          /*
            version-02:
            addNewContact
          */
         /*
            version-03:
         */
        loginRequired, addNewContact
    );

    app.route('/contacts/:contactId')
    // retrieve contact
    /*
    version-01:
    .get(getContactWithID)
    */
    .get(loginRequired, getContactWithID)

    // update contact
    .put(
        /*
        version-01:
        (req, res) =>
        res.send('PUT request sucessful!')
        */
        /*
        version-02:
        updateContact
        */
        /*
        version-03:
        */
        loginRequired, updateContact
    )
    // delete contact
    .delete(
        /*
        version-01:
        (req, res) =>
        res.send('DELETE request sucessful!')
        */
        /*
        version-02:
        deleteContact 
        */
        /*
        version-03:
        */
        loginRequired, deleteContact
    );
};

export default routes;