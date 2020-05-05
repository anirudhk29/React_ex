import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish ({dish}) {
  if(dish!=null)
  {
    return(
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
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
function RenderComments ({dish}) {
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
  if(props.dish!=null)
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
        <RenderComments dish={props.comments} />
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
