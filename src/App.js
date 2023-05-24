import Cart from "./Components/Cart/Cart";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Shop/Products";
import { useSelector,useDispatch } from "react-redux";
import { sendCartData,fetchCartData } from "./Components/Store/cartFunction";
import { Fragment } from "react";
import { useEffect } from "react";
import Notification from "./Components/UI/Notification";

let initialVal = true;


function App() {
  const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        dispatch(fetchCartData());
    }, [dispatch]);


    useEffect(() => {
        if (initialVal) {
            initialVal = false;
            return;
        }
        if (cart.isChanged) {
            dispatch(sendCartData(cart));
        }
    }, [cart, dispatch]);
    return (
        <Fragment>
            {notification && (
                <Notification
                    status={notification.status}
                    title={notification.title}
                    message={notification.message}
                />
            )}
            <Layout>
                <Cart />
                <Products />
            </Layout>
        </Fragment>
    );
}

export default App;
