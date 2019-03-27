import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import peopleData from './peopleData/people.json';
import Modal from 'react-responsive-modal';
import { Col, Row, Jumbotron, Button, Form, FormGroup, Label, Input, FormText, Card, CardTitle, CardText } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList : [],
      taskListToUpdate : [],
      taskName : '',
      taskDescription : '',
      taskTime : '',
      taskDate : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTaskDetails = this.addTaskDetails.bind(this);
    this.upcomingTask = this.upcomingTask.bind(this);
    this.allTask = this.allTask.bind(this);
  }
  componentDidMount() {

  }

  handleChange(evt){
    this.setState({ [evt.target.name]: evt.target.value });
  //  console.log(this.state);
  }

  addTaskDetails(){
    if(this.state.taskName != "" && this.state.taskDate != "" && this.state.taskTime != ""){
      var eachTask = this.state.taskList.concat({Task : this.state.taskName, Description : this.state.taskDescription, Date : this.state.taskDate, Time : this.state.taskTime});
      this.setState({ taskList: eachTask, taskListToUpdate : eachTask});
    }
    else {
      alert("Please Enter All Field Data...");
    }
  }

  upcomingTask(){
    var self = this;
    this.state.taskListToUpdate = [];
    var taskLength = 0;
    if(self.state.taskList.length > 3){
      taskLength = 3;
    }else if(self.state.taskList.length < 3 && self.state.taskList.length > 0){
      taskLength = self.state.taskList.length;
    }else{
      taskLength =0;
    }
    if(taskLength > 0){
      for(var i=0; i<3;i++){
        this.state.taskListToUpdate.push(self.state.taskList[i])
      }
      this.setState({ taskListToUpdate : this.state.taskListToUpdate});
    }
  }

  allTask(){
    var self = this;
    this.state.taskListToUpdate = [];
    for(var i=0; i<self.state.taskList.length;i++){
      this.state.taskListToUpdate.push(self.state.taskList[i])
    }
    this.setState({ taskListToUpdate : this.state.taskListToUpdate});
  }

  render() {
    return (
      <div className="App">
        <div className="col-lg-12" style={{marginTop:'20px'}}>

          <div className="col-lg-9" style={{paddingRight:'0px'}}>
              <div className="panel panel-default" style={{height:'500px'}}>
                  <h2 style={{padding:'15px'}}>
                    Task Creater
                  </h2>
                <div className="panel-body">
                <Row>
                  <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <Form>
                    <FormGroup>
                      <Label htmlFor="taskName"><h4>Task</h4></Label>
                      <Input type="text" name="taskName" id="taskName" size="lg" placeholder="with a placeholder" onChange={this.handleChange} value={this.state.taskName}/>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="taskDescription"><h4>Task Description</h4></Label>
                      <Input type="textarea" name="taskDescription" size="lg" id="taskDescription" onChange={this.handleChange} value={this.state.taskDescription}/>
                    </FormGroup>
                    <Row form>
                      <Col md={4}>
                        <FormGroup>
                          <Label htmlFor="taskDate"><h4>Date</h4></Label>
                          <Input
                            type="date"
                            name="taskDate"
                            id="taskDate"
                            size="lg"
                            placeholder="date placeholder"
                            onChange={this.handleChange}
                            value={this.state.taskDate}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup>
                          <Label htmlFor="taskTime"><h4>Time</h4></Label>
                          <Input
                            type="time"
                            name="taskTime"
                            id="taskTime"
                            size="lg"
                            placeholder="time placeholder"
                            onChange={this.handleChange}
                            value={this.state.taskTime}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4}>
                        <FormGroup style={{paddingTop:'25px'}}>
                          <Button outline color="secondary" size="lg" onClick={this.addTaskDetails}>Create Task</Button>{' '}
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  </Col>
                  </Row>
                </div>
              </div>
          </div>

          <div className="col-lg-3" style={{paddingLeft:'0px'}}>
            <div className="panel panel-default">
              <div className="panel-body" style={{height:'500px',maxHeight: '10', overflowY: "scroll"}}>
                <Row>
                  <Col md={6}>
                    <Button outline color="secondary" size="lg" style={{margin:'10px'}} onClick={this.upcomingTask}>Upcoming</Button>{' '}
                  </Col>
                  <Col md={6}>
                    <Button outline color="secondary" size="lg" style={{margin:'10px', float:'right'}}onClick={this.allTask}>All</Button>{' '}
                  </Col>
                </Row>
                  {
                    this.state.taskListToUpdate.map(eachTaskInList => (
                      <Row key={eachTaskInList.Time} style={{margin:'10px',marginBottom:'0px'}}>
                        <Card body>
                          <FormGroup>
                            <Label htmlFor={eachTaskInList.Task} style={{float:'left', padding:'10px'}}><h3>{eachTaskInList.Task}</h3></Label>
                            <Label htmlFor={eachTaskInList.Time} style={{float:'right', padding:'10px'}}><h3>{eachTaskInList.Time}</h3></Label>
                          </FormGroup>
                          <Button>Show Details</Button>
                        </Card>
                      </Row>
                    ))
                  }
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}
export default App;
