import React from 'react';
import axios from 'axios';

import BackgroundDots from './BackgroundDots';

class Contact extends React.Component {
  state = {
    content: [],
    fields: [],
    errors: [],
    success: false,
    visible: false,
  };

  getPageContent() {
    axios.get('/wp-json/wp/v2/contact')
      .then(res => {
        this.setState({
          content: res.data.copy,
          visible: true,
        });
      })
  }

  componentDidMount() {
    this.getPageContent();
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;

    this.setState({fields});
  }

  handleValidation() {
    let fields = this.state.fields;
    let emailRegex = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
    let errors = {};
    let formIsValid = true;

    if (!fields['name']) {
      formIsValid = false;
      errors['name'] = 'Please enter your name.';
    }

    if (!fields['email']) {
      if (!emailRegex.test(fields['email'])) {
        formIsValid = false;
        errors['email'] = 'Please enter a valid email address.';
      }
    }

    if (!fields['message']) {
      formIsValid = false;
      errors['message'] = 'Please enter a message.';
    }

    this.setState({errors: errors});

    return formIsValid;
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.handleValidation()) {
      let formData = new FormData();

      formData.append('name', this.state.fields['name']);
      formData.append('email', this.state.fields['email']);
      formData.append('message', this.state.fields['message']);

      axios.post('/wp-json/wp/v2/contact_form_email', formData)
        .then(res => {
          if (res.status === 200) {
            this.setState({success: true});
          } else if (res.status === 400) {
            alert('Failed to submit form (400). Please reload the page and try again.');
          }
        }).catch(error => {
          console.log(error);
          alert('Failed to submit form. Please reload the page and try again.');
        });
    }
  }

  render() {
    return (
      <div className="contact">
        <BackgroundDots />

        <div className={ `padding-top ${this.state.visible ? 'visible' : 'hidden'}` }>
          <div className="contact__wrap">
            <h2 className="contact__section_title">Contact</h2>

            <div className="contact__content" dangerouslySetInnerHTML={{__html: this.state.content}}></div>

            <form className={ `${this.state.success ? 'contact__form--hidden' : 'contact__form--visible'}` } autoComplete="off" onSubmit={this.handleSubmit.bind(this)}>
              <div className="contact__form_group">
                <input type="text" id="name" placeholder="*Enter your name" onChange={this.handleChange.bind(this, 'name')} value={this.state.fields['name'] || ''} />
                <span className="contact__form_error">{this.state.errors['name']}</span>
              </div>

              <div className="contact__form_group">
                <input type="email" id="email" placeholder="*Enter your email" onChange={this.handleChange.bind(this, 'email')} value={this.state.fields['email'] || ''} />
                <span className="contact__form_error">{this.state.errors['email']}</span>
              </div>

              <div className="contact__form_group">
                <textarea id="message" cols="30" rows="5" placeholder="*Enter your message" onChange={this.handleChange.bind(this, 'message')} value={this.state.fields['message'] || ''}></textarea>
                <span className="contact__form_error">{this.state.errors['message']}</span>
              </div>

              <button type="submit" className="contact__form_submit">Submit</button>
            </form>

            <div className={ `contact__success ${this.state.success ? 'visible' : 'hidden'}` }>
              <p className="contact__success_copy">Successful form submission. Thank you!</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Contact;
