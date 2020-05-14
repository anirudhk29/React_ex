import React ,{ Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem , Modal, ModalBody, ModalHeader ,Button ,Label, Row } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Link } from 'react-router-dom';
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    }
    this.toggleModal=this.toggleModal.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  toggleModal () {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  handleSubmit (values) {
    this.props.postComment(this.props.dishId, values.rating, values.author ,values.comment);
    this.toggleModal();
  }
  render () {
    return(
      <>
      <Button outline onClick={this.toggleModal}>
        <span className="fa fa-pencil fa-lg"></span>Submit Comment
      </Button>
      <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
        <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
        <ModalBody>
          <LocalForm onSubmit={(values) => this.handleSubmit(values)} className="m-3">
            <Row className="form-group">
              <Label select> Rating</Label>
            </Row>
            <Row className="form-group">
              <Control.select model=".rating" name="rating" className="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Control.select>
            </Row>
            <Row className="form-group">
              <Label htmlFor="author" > Your Name</Label>
            </Row>
            <Row className="form-group">
              <Control.text model=".author" id="author" name="author" placeholder="Your Name"
                className="form-control" validators ={{
                  required, minLength: minLength(3) , maxLength: maxLength(15)
                }} />
              <Errors className="text-danger" model=".author" show="touched" messages={{
                    required: "Required ",
                    minLength: "Must have atleast 3 characters",
                    maxLength: "Must be less than 15 characters"
                }}
              />
            </Row>
            <Row className="form-group">
              <Label htmlFor="comment" > Comment</Label>
            </Row>
            <Row className="form-group">
              <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
            </Row>
            <Row className="form-group">
              <Button type="submit" color="primary">Submit</Button>
            </Row>
          </LocalForm>
        </ModalBody>
      </Modal>
      </>
    );
  }
}

function RenderDish ({dish}) {
  if(dish!=null)
  {
    return(
      <Card>
        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />
        <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  }
  else {
    return(
      <div></div>
    );
  }
}
function RenderComments ({dish, postComment, dishId}) {
  if(dish!=null)
  {
    const rate=dish.map((item) =>{
      return(
            <ul id={item.id} className="list-group">
              <li className="list-group-item">{item.comment}</li>
              <li className="list-group-item">--{item.author} , { new Intl.DateTimeFormat('en-US', {year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(item.date))) }</li>
            </ul>
      );
    });
    return(
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        {rate}
        <br />
        <CommentForm dishId={dishId} postComment={postComment}/>
      </div>
    );
  }
  else {
    return(
      <div></div>
    );
  }

}
const DishDetail = (props) => {
  if(props.isLoading) {
    return(
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  else if(props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  }
  else if(props.dish!=null)
  {
    return(
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={props.dish} />
        </div>
        <RenderComments dish={props.comments}
          postComment={props.postComment}
          dishId={props.dish.id} />
      </div>
      </div>

    );
  }
  else {
    return(
      <div></div>
    );
  }
}


export default DishDetail;
