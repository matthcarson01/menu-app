import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Modal } from "semantic-ui-react";
import { editSection } from "../../ducks/reducer";

class SectionEdit extends Component {
    constructor(props){
        super(props);
        this.state = { 
            open: false,
            size:"small",
            name:""
             
        };
        this.show=this.show.bind(this);
        this.close=this.close.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange=this.handleChange.bind(this);
    }
    

    show = size => () => this.setState({ size, open: true });
    close = () => this.setState({ open: false });
    handleSubmit = e => {
        e.preventDefault();
        this.props
            .editSection({ section_id:this.props.id, section_name:this.state.name })
            .then(()=>this.setState({open:false}));
    };
    handleChange = e =>{
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
    const { open, size } = this.state;

    return <div style={{ display: "inline-block" }}>
        <Button onClick={this.show("small")} icon="wrench" size="massive" />

        <Modal size={size} open={open} onClose={this.close}>
          <Form onSubmit={this.handleSubmit}>
            <Modal.Header>Change Your Section Name</Modal.Header>
            <Modal.Content>
              <label>Section Name</label>
              <input placeholder={this.props.name} name="name" value={this.state.name} onChange={this.handleChange} />
            </Modal.Content>
            <Modal.Actions>
              <Button type="submit">Submit</Button>
            </Modal.Actions>
          </Form>
        </Modal>
      </div>;
    }
}
function mapStateToProps(state){
  return {
    sections: state.sections,
  }
}

export default connect(mapStateToProps, { editSection })(SectionEdit);
