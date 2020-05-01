import React , { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component {

  renderDish(dish){
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
  renderComments(dish) {
    if(dish!=null)
    {
      const rate=dish.comments.map((item) =>{
        return(
              <ul  className="list-group">
                <li className="list-group-item">{item.comment}</li>
                <li className="list-group-item">--{item.author} , {item.date}</li>
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

  render () {
    var dish=this.props.selectedDish;
    if(dish!=null)
    {
      return(
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(dish)}
          </div>
          {this.renderComments(dish)}
        </div>

      );
    }
    else {
      return(
        <div></div>
      );
    }
  }
}

export default DishDetail;
