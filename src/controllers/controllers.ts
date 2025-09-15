import ProductController from './product';
import AuthController from './auth';
import ReservationController from './reservation';

export default class Controllers {
    static product = ProductController
    static auth = AuthController
    static reservation = ReservationController
}