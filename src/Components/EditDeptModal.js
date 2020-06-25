import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
const API = 'http://localhost:53650/api/department';
class EditDeptModal extends Component {
    constructor(props){
        super(props);
        
    }
    handleSubmit(event){
        event.preventDefault();
        fetch(API,{
        method:'PUT', 
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
        },
        body:JSON.stringify({
            DepartmentID:event.target.DepartmentID.value,
            DepartmentName:event.target.DepartmentName.value
                })
            }).then(res=>res.json())
        .then((result)=>{
            alert(result);
        },(error)=>{alert('Failed')})
        
    }
    render() {
        return (    
            <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Edit Department
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className='container'>

<Form onSubmit={this.handleSubmit} >
    <Form.Group controlId='DepartmentID' >
        <Form.Label >Department Name</Form.Label>
        <Form.Control type='text' name='DepartmentID'
            required
            disabled
            defaultValue={this.props.deptID}
            placeholder='DepartmentID'/>
        </Form.Group>
    <Form.Group controlId='DepartmentName'>
        <Form.Label >Department Name</Form.Label>
        <Form.Control type='text' name='DepartmentName'
            required
            defaultValue={this.props.deptName}
            placeholder='DepartmentName'/>
    </Form.Group>
    <Form.Group >
     <Button type='primary' type='submit'>Update Department</Button>
    </Form.Group>
</Form>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant='danger' onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
         ); 
         }
        }
     
     export default EditDeptModal;