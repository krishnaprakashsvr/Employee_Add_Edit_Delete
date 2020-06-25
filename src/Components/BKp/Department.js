import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap'
import AddDeptModal from './AddDeptModal';
import EditDeptModal from './EditDeptModal'
const API = 'http://localhost:53650/api/department';
class Department extends Component {
    constructor(props){
        super(props);
        this.state ={deps:[],
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
    //    this.setState({lstDept:[
    //        {"DepartmentID":1,"Department":"Finance"},
    //        {"DepartmentID":2,"Department":"IT"}]});
    fetch(API)
            .then(response=>response.json())
            .then(data=>{
                this.setState({deps:data});
            });
   }
   deleteClick(deptid){
       //alert(deptid);
    if(window.confirm('Are you sure?'))
    {
        fetch(API+'/'+ deptid,{
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
    <Table striped boarder hover size="sm">
        <thead>
            <tr>
                <th>Department ID</th>
                <th>Department Name</th>
                <th>Options</th>
            </tr>
        </thead>
          <tbody>
            {this.state.deps.map(dept=>
               <tr key={dept.DepartmentID}>
                   <td>{dept.DepartmentID}</td>
                   <td>{dept.DepartmentName}</td>
                   <td>
                   <ButtonToolbar>
                        <Button 
                            onClick={()=>this.setState({addModalShow:true})}          
                            >Edit
                        </Button>
                    <AddDeptModal deptID={this.state.depid} deptName={this.state.depname}
                      IsAdd={false}  show={this.state.addModalShow} 
                        onHide={editModalClose} />
                    </ButtonToolbar>
                   </td>
                   <td>
                   <ButtonToolbar>
                        <Button variant='danger'btnDeptID={dept.DepartmentID}
                            onClick={()=>this.deleteClick(dept.DepartmentID)}          
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
            Add Department
        </Button>
        <AddDeptModal IsAdd={true} show={this.state.addModalShow} onHide={addModalClose}/>
    </ButtonToolbar>
 </div> 
      );  }}
  
  
  export default Department;