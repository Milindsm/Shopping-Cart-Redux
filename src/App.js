import Cart from "./Components/Cart/Cart";
import Layout from "./Components/Layout/Layout";
import Products from "./Components/Shop/Products";
import { useSelector,useDispatch } from "react-redux";
import { Fragment } from "react";
import { useEffect } from "react";
import { uiActions } from "./Components/Store/uiSlice";
import Notification from "./Components/UI/Notification";

let initialVal = true;


function App() {
  const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    const notification = useSelector((state) => state.ui.notification);

    useEffect(() => {
        const sendCartData = async () => {
            dispatch(
                uiActions.showNotification({
                    status: "pending",
                    title: "sending",
                    message: "Sending data....",
                })
            );
            const response = await fetch(
                "https://cartredux-ff773-default-rtdb.firebaseio.com/cart.json",
                {
                    method: "PUT",
                    body: JSON.stringify(cart),
                }
            );
            if (!response.ok) {
                throw new Error("Sending cart data failed..");
            }
            dispatch(
                uiActions.showNotification({
                    status: "success",
                    title: "success",
                    message: "Cart data sent successfuly",
                })
            );
        };

        if (initialVal) {
            initialVal = false;
            return;
        }
        sendCartData().catch((err) => {
            dispatch(
                uiActions.showNotification({
                    status: "error",
                    title: "error",
                    message: "Error in sending data",
                })
            );
        });
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
