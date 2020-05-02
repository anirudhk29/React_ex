import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

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
    const rate=dish.comments.map((item) =>{
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
  var dish=props.dish;
  if(dish!=null)
  {
    return(
      <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish dish={dish} />
        </div>
        <RenderComments dish={dish} />
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
