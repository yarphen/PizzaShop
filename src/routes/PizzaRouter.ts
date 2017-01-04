import {Router, Request, Response, NextFunction} from 'express';
//const Pizzas = require('../pizza');

const LiqPay = require('liqpay');
export class PizzaRouter {
  router: Router;
  private static public_key: string = '';
  private static private_key: string = '';
  /**
   * Initialize the PizzaRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }
 /**
   * GET pay page for pizzas
   
  */
  public getPay(req: Request, res: Response, next: NextFunction) {
    console.log(this);
    var liqpay = new LiqPay(PizzaRouter.public_key, PizzaRouter.private_key);
    var html = liqpay.cnb_form({
      'action'         : 'pay',
      'amount'         : '1',
      'currency'       : 'UAH',
      'description'    : 'description text',
      'order_id'       : 'order_id_1',
      'version'        : '3'
    });
    res.send(html);
  }
  /**
   * GET all Pizzas.
   
  public getAll(req: Request, res: Response, next: NextFunction) {
    res.send(Pizzas);
  }
  */
/**
 * GET one pizza by id
 
public getOne(req: Request, res: Response, next: NextFunction) {
  let query = parseInt(req.params.id);
  let pizza = Pizzas.find(pizza => pizza.id === query);
  if (pizza) {
    res.status(200)
      .send({
        message: 'Success',
        status: res.status,
        pizza
      });
  }
  else {
    res.status(404)
      .send({
        message: 'No pizza found with the given id.',
        status: res.status
      });
  }
}
*/
/**
 * Take each handler, and attach to one of the Express.Router's
 * endpoints.
 */
init() {
  this.router.get('/pay', this.getPay);
  //this.router.get('/', this.getAll);
  //this.router.get('/:id', this.getOne);
}

}

// Create the PizzaRouter, and export its configured Express.Router
const pizzaRoutes = new PizzaRouter();
pizzaRoutes.init();

export default pizzaRoutes.router;

