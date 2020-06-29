import React,{Component} from 'react';

import AddEmployee from './AddEmployee';
import {Button,ButtonToolbar} from 'react-bootstrap'
import EditEmployee from './EditEmployee';

import { withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paper from "@material-ui/core/Paper";

const API = 'http://localhost:53650/api/employee';
  const useStyles = theme => ({
    table: {
      minWidth: 650
    }
  });
  
class Employee extends Component {
 constructor(props){
     super(props);
     this.state ={lstemployee:[],
        addModalShow:false,
        editModalShow:false,
    page:0,rowsPerPage:5}
    
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
 handleChangePage = (event, newPage) => {
    //setPage(newPage);
    //alert(newPage);
    this.setState({page:newPage});
};

  handleChangeRowsPerPage = event => {
    //setRowsPerPage(parseInt(event.target.value, 10));
    //setPage(0);
    
    this.setState({rowsPerPage:parseInt(event.target.value, 10)});
    this.setState({page:0});

    
};

    render() {
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        const { classes } = this.props;
        let emptyRows =
            this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.lstemployee.length - this.state.page * this.state.rowsPerPage);
            //let classes = useStyles();
         return ( 
          <div>
            <TableContainer component={Paper}>
            <Table  size="small" aria-label="a dense table" className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell>Employee ID</TableCell>
                  <TableCell align="left">Employee Name</TableCell>
                  <TableCell align="left">Department</TableCell>
                  <TableCell align="left">Mail ID</TableCell>
                  <TableCell align="left">DOJ</TableCell>
                  <TableCell align="left">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.lstemployee
                  .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage)
                  .map((emp, index) => (
                    <TableRow key={emp.EmployeeID}>
                      <TableCell component="th" scope="row">
                        {emp.EmployeeID}
                      </TableCell>
                      <TableCell align="left">{emp.EmployeeName}</TableCell>
                      <TableCell align="left">{emp.DepartmentName}</TableCell>
                      <TableCell align="left">{emp.MailId}</TableCell>
                      <TableCell align="left">{emp.DOJ}</TableCell>
                     <TableCell align="left">
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
                        <Button variant='danger'btnDeptID={emp.EmployeeID}
                            onClick={()=>this.deleteClick(emp.EmployeeID)}          
                            >Delete
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
                     </TableCell>
                    </TableRow>
                  ))}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={this.state.lstemployee.length}
              rowsPerPage={this.state.rowsPerPage}
              page={this.state.page}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ></TablePagination>
          </TableContainer> 
          <ButtonToolbar>
          <Button onClick={()=>this.setState({addModalShow:true})}>          
              Add Employee
          </Button>
          <AddEmployee  show={this.state.addModalShow} onHide={addModalClose}/>
          </ButtonToolbar>
          </div>
      );  }}
  
  
  export default withStyles(useStyles)(Employee);