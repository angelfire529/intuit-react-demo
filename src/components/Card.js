import React, {Component} from 'react';
import 'bootstrap-scss';
import { Collapse, Button, Label, Input } from 'reactstrap';

import './card.scss';

class Card extends Component{
    
    constructor(props) {
        super(props);
        this.props = props;
        
        this.state = {
            collapse: false
        }
    }

    toggle() {
        this.setState(prevState => {
            return {
                collapse: !prevState.collapse
            }
        })
    }

    show () {
        if(!this.state.collapse) {
            return 'hidden';
        }
        else {
            return 'show'
        }
    }


        
    render() {
        return (
            <div className="col-lg-3 col-md-4 col-sm-6 col-xs-12 portfolio-item">
                <div className="card h-100">
                <button type="button" className="close close-right-top" aria-label="Close" onClick={this.props.remove}><span aria-hidden="true">&times;</span></button>
                <img className="card-img-top" src="http://placehold.it/700x400" alt="" />
                <div className="card-body card-body--toggle">
                    <h4 className="card-title" onClick={this.toggle.bind(this)}>
                    {this.props.contact.firstName} {this.props.contact.lastName}
                    </h4>
                   <Collapse isOpen={this.state.collapse}>
                   <div>
                    <Label>Email</Label>
                    <p></p>
                    </div>
                    <div>
                    <Label>Email</Label>
                    <p></p>
                    </div>
                   </Collapse>
                    <div className="card-text">
                        <p>{this.props.contact.phone}</p>
                    </div> 
                </div>
                </div>
            </div>
        );
    }
    
}



export default Card;