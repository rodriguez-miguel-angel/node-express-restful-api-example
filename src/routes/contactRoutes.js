import { addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact, 
    deleteContact } from '../controllers/contactController';

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
       */
       getContacts
    )
    // create contact
    .post(/*
           version-01:
           (req, res) =>
            res.send('POST request sucessful!') 
           */
          /*
          version-02:
          */
          addNewContact
    );

    app.route('/contacts/:contactId')
    // retrieve contact
    .get(getContactWithID)

    // update contact
    .put(
        /*
        version-01:
        (req, res) =>
        res.send('PUT request sucessful!')
        */
        updateContact
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
       */
       deleteContact
    );
};

export default routes;