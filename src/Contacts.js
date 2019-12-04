import React from 'react';
import Contact from './Contact.js';
import Alert from './Alert.js';
import NewContact from './NewContact.js';

class Contacts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorInfo: null,
            contacts: this.props.contacts
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleCloseError = this.handleCloseError.bind(this);
        this.addContact = this.addContact.bind(this);
    }

    handleEdit(contact) {
        this.setState({
            errorInfo: contact.name
        });    
    }

    handleCloseError() {
        this.setState({
            errorInfo: null
        });
    }

    addContact(contact) {        
        this.setState(prevState => {
            const contacts = prevState.contacts;
            if (! contacts.find(c => c.name === contact.name)) {
                return({
                    contacts: [...prevState.contacts, contact]
                });
            }

            return ({
                errorInfo: 'Contact already exists'
            });            
        });
    }

    render() {
        return(
            <div>
            <Alert message={this.state.errorInfo} onClose={this.handleCloseError} />
            <table class="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <NewContact onAddContact={this.addContact}/>
            {this.state.contacts.map((contact) =>
                <Contact contact={contact} onEdit={this.handleEdit}/>
            )}
            </table>
            </div>

        );
    }
}

export default Contacts;