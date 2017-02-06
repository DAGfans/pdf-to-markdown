import React from 'react';
import Remarkable from 'remarkable';

import ButtonToolbar from 'react-bootstrap/lib/ButtonToolbar'
import ButtonGroup from 'react-bootstrap/lib/ButtonGroup'
import Button from 'react-bootstrap/lib/Button'

export default class MarkdownView extends React.Component {

    static propTypes = {
        page: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            preview: true,
            text: props.page.text
        };
    }

    switchToPreview() {
        this.setState({
            preview: true
        });
    }

    switchToEdit() {
        this.setState({
            preview: false
        });
    }

    handleChange(event) {
        this.setState({
            text: event.target.value
        });
    }

    render() {
        const remarkable = new Remarkable({
            breaks: true
        });
        const {preview, text} = this.state;

        var textComponent;
        if (preview) {
            const html = remarkable.render(text);
            textComponent = <div dangerouslySetInnerHTML={ { __html: html } } />
        } else {
            textComponent = <textarea
                                      rows="45"
                                      cols="150"
                                      value={ text }
                                      onChange={ this.handleChange.bind(this) } />
        }
        return (
            <div>
              <ButtonToolbar>
                <ButtonGroup bsSize="medium">
                  <Button onClick={ this.switchToEdit.bind(this) } className={ !preview ? 'active' : '' }>
                    Edit
                  </Button>
                  <Button onClick={ this.switchToPreview.bind(this) } className={ preview ? 'active' : '' }>
                    Preview
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
              <hr/>
              { textComponent }
            </div>
            );
    }

}