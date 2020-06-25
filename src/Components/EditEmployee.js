import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';

const API = 'http://localhost:53650/api/employee';
class EditEmployee  extends Component {
    constructor(props){
        super(props);
        this.state={deps:[]};
    }
    componentDidMount(){
        this.refreshlist();
    }
    refreshlist(){
        fetch(API)
                .then(response=>response.json())
                .then(data=>{
                    this.setState({deps:data});
                });
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
            EmployeeID:event.target.control_EmployeeID.value,
            EmployeeName:event.target.control_EmpName.value,
            Department:event.target.control_DepName.value,
            MailId:event.target.control_mailid.value,
            DOJ:event.target.control_DOJ.value
                })
            }).then(res=>res.json())
        .then((result)=>{
            alert(result);
        },(error)=>{alert('Failed')})
        
    }
    render() {
        return (    
<Modal {...this.props}  size="lg" aria-labelledby="contained-modal-title-vcenter"
        centered>
          
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
             Edit Employee
         </Modal.Title>
     </Modal.Header>
    <Modal.Body>
    <div className='container'>
        <Form onSubmit={this.handleSubmit} >
            <Form.Group controlId='control_EmployeeID' >
                <Form.Label >Employee ID</Form.Label>
                <Form.Control type='text' name='DepartmentID'
                    required
                    disabled
                    defaultValue={this.props.empid}/>
                   
                </Form.Group>
            <Form.Group controlId='control_EmpName'>
                <Form.Label >Employee Name</Form.Label>
                <Form.Control type='text' name='name_EmpName'
                    required
                    defaultValue={this.props.empname}/>
            </Form.Group>
            <Form.Group controlId='control_DepName'>
                <Form.Label >Department </Form.Label>
                
                     {/* <Form.Control as='Select'  name='Department Name'>
                        <option>Select Department</option>
                        {this.state.deps.map(dep=>
                        <option  selected={this.props.dep==dep.DepartmentName} key={dep.DepartmentID
                        }>{dep.DepartmentName}</option>)}   
                        </Form.Control> */}
                    <Form.Control as='select' defaultValue ={this.props.dep}>
                        {this.state.deps.map(dep=>
                        <option   key={dep.DepartmentID
                        }>{dep.DepartmentName}</option>)}   
                    </Form.Control>
            </Form.Group>
            <Form.Group controlId='control_mailid'>
                <Form.Label >Mail ID </Form.Label>
                <Form.Control type='text' name='name_mailid'
                    required
                    defaultValue={this.props.mailid}
                    placeholder='Ex: something@test.com'/>
            </Form.Group>
            <Form.Group controlId='control_DOJ'>
                <Form.Label >Mail ID </Form.Label>
                <Form.Control type='date' name='name_DOJ'
                    required
                    defaultValue={this.props.doj}
                    placeholder='MM/DD/YYYY'/>
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
     
     export default EditEmployee;