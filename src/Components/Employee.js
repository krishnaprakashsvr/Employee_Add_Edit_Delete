import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import AddEmployee from './AddEmployee';
import {Button,ButtonToolbar} from 'react-bootstrap'
import EditEmployee from './EditEmployee';
import ReactTable from "react-table";  

const API = 'http://localhost:53650/api/employee';

class Employee extends Component {
 constructor(props){
     super(props);
     this.state ={lstemployee:[],
        addModalShow:false,
        editModalShow:false}
 }
 componentDidMount(){
     this.refreshlist();
 }
 componentDidUpdate(){
    this.refreshlist();
}
 refreshlist(){
    //   this.setState({lstemployee:[
    //       {"EmployeeID":1,"EmployeeName":"Something","Department":"Finance"}
    //     ,{"EmployeeID":2,"EmployeeName":"Something","Department":"Finance"}]})
    fetch(API)
    .then(response=>response.json())
    .then(data=>{
        this.setState({lstemployee:data});
    });
  }
  deleteClick(empID){
    //alert(deptid);
 if(window.confirm('Are you sure?'))
 {
     fetch(API+'/'+ empID,{
         method:'DELETE', 
         headers:{
             'Accept':'application/json',
             'Content-Type':'application/json',
                 }
             }).then(res=>res.json())
         .then((result)=>{
             alert(result);
         },(error)=>{alert('Failed')})
 }
};
    render() {
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        
         return ( 
             <div> 

<Table  striped boarder hover size="sm">
    <thead>
        <tr>
            <th>Employee ID</th>
            <th>Employee Name</th>
            <th>Department</th>
            <th>Mail ID</th>
            <th>DOJ</th>
        </tr>
    </thead>
    <tbody>
        {this.state.lstemployee.map(emp=>
            <tr key={emp.EmployeeID}>
                <td>{emp.EmployeeID}</td>
                <td>{emp.EmployeeName}</td>
                <td>{emp.DepartmentName}</td>
                <td>{emp.MailId}</td>
                <td>{emp.DOJ}</td>
                <td>
                   <ButtonToolbar>
                        <Button 
                            onClick={()=>this.setState({editModalShow:true,
                                empid:emp.EmployeeID,
                                empdept:emp.DepartmentName,
                                empmailid:emp.MailId,
                                empdoj:emp.DOJ,
                                empName:emp.EmployeeName})}          
                            >Edit
                        </Button>
                    <EditEmployee 
                        empid={this.state.empid} 
                        empname={this.state.empName}
                        dep={this.state.empdept}
                        mailid={this.state.empmailid} 
                        doj={this.state.empdoj}
                        show={this.state.editModalShow} 
                        onHide={editModalClose} />
                    </ButtonToolbar>
                   </td>
                   <td>
                   <ButtonToolbar>
                        <Button variant='danger'btnDeptID={emp.EmployeeID}
                            onClick={()=>this.deleteClick(emp.EmployeeID)}          
                            >Delete
                        </Button>  
                    </ButtonToolbar>                 
                </td>
            </tr>
        )}
    </tbody>
</Table>

<ButtonToolbar>
    <Button onClick={()=>this.setState({addModalShow:true})}>          
        Add Employee
    </Button>
    <AddEmployee  show={this.state.addModalShow} onHide={addModalClose}/>
</ButtonToolbar>
    </div>  
      );  }}
  
  
  export default Employee;