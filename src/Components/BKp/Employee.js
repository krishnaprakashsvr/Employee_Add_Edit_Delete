import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

class Employee extends Component {
 constructor(props){
     super(props);
     this.state ={lstemployee:[]}
 }
 componentDidMount(){
     this.refreshlist();
 }
 refreshlist(){
    //   this.setState({lstemployee:[
    //       {"EmployeeID":1,"EmployeeName":"Something","Department":"Finance"}
    //     ,{"EmployeeID":2,"EmployeeName":"Something","Department":"Finance"}]})
    fetch('http://localhost:53650/api/employee')
    .then(response=>response.json())
    .then(data=>{
        this.setState({lstemployee:data});
    });
  }
    render() {
         return (    
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
                </tr>
                )}
           </tbody>
       </Table>
  
  
      );  }}
  
  
  export default Employee;