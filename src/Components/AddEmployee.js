import React,{Component} from 'react';
import {Modal,Button,Row,Col,Form} from 'react-bootstrap';
const API = 'http://localhost:53650/api/employee';
const AcceptContenttype = 'application/json';

class AddEmployee extends Component {
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
        method:'POST', 
        headers:{
            'Accept':AcceptContenttype,
            'Content-Type':AcceptContenttype,
        },
        body:JSON.stringify({
            EmployeeID:null,
            EmployeeName:event.target.EmpName.value,
            Department:event.target.DeptName.value,
            MailId:event.target.EmpMailID.value,
            DOJ:event.target.DOJ.value
                })
            }).then(res=>res.json())
        .then((result)=>{
            alert(result);
        },(error)=>{alert('Failed')})
        
    }
    render() {
        return (    
<Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter"
     centered >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Add Employee
        </Modal.Title>
    </Modal.Header>
<Modal.Body>
    <div className='container'>
        <Row>
            <Col>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId='EmpName'>
                        <Form.Label >Employee Name</Form.Label>
                        <Form.Control type='text' name='Employee Name'
                            required placeholder='Employee Name'/>
                    </Form.Group>
                    <Form.Group controlId='DeptName'>
                        <Form.Label >Department</Form.Label>
                        <Form.Control as='Select' ty  name='Department Name'
                            required>
                                <option>Select Department</option>
                                 {this.state.deps.map(dep=>
                                    <option key={dep.DepartmentID
                                    }>{dep.DepartmentName}</option>)}   
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId='EmpMailID'>
                        <Form.Label >Mail ID</Form.Label>
                        <Form.Control type='text' name='Mail ID'
                            required placeholder='something@test.com'/>
                    </Form.Group>
                    <Form.Group controlId='DOJ'>
                        <Form.Label >DOJ</Form.Label>
                        <Form.Control type='date' name='Date of join'
                            required placeholder='MM/DD/YY'/>
                    </Form.Group>
                    <Form.Group >
                        <Button type='primary' type='submit'>Add Employee</Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </div>
</Modal.Body>
    <Modal.Footer>
        <Button variant='danger' onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>
</Modal>
         ); 
         }
        }
     
     export default AddEmployee;